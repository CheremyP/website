'use client';

import { createContext, use, useState, useRef } from 'react';
import posthog from 'posthog-js';
import { contactSchema, type ContactFormData } from '@/lib/contact-schema';
import { z } from 'zod';

export interface ContactState {
  formData: Partial<ContactFormData>;
  errors: Partial<Record<keyof ContactFormData, string>>;
  isSubmitting: boolean;
  status: 'idle' | 'success' | 'error';
}

export interface ContactActions {
  updateField: (name: keyof ContactFormData, value: string) => void;
  submitForm: (e?: React.FormEvent) => Promise<void>;
}

export interface ContactMeta {
  formRef: React.RefObject<HTMLFormElement | null>;
}

export interface ContactContextValue {
  state: ContactState;
  actions: ContactActions;
  meta: ContactMeta;
}

export const ContactContext = createContext<ContactContextValue | null>(null);

export function useContactContext() {
  const context = use(ContactContext);
  if (!context) {
    throw new Error('useContactContext must be used within a ContactProvider');
  }
  return context;
}

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const formRef = useRef<HTMLFormElement>(null);
  const hasStartedRef = useRef(false);
  
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    sector: '',
    budget: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const updateField = (name: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Analytics
    if (name === 'sector') {
      posthog.capture('sector_selected', { sector: value });
    } else if (name === 'budget') {
      posthog.capture('budget_selected', { budget: value });
    } else if (!hasStartedRef.current && name !== 'honeypot') {
      hasStartedRef.current = true;
      posthog.capture('contact_form_started');
    }
  };

  const submitForm = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setIsSubmitting(true);
    setStatus('idle');
    setErrors({});

    try {
      // Client-side validation
      const validData = contactSchema.parse(formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details && Array.isArray(result.details)) {
          const newErrors: Record<string, string> = {};
          result.details.forEach((err: { path: string; message: string }) => {
            if (err.path) newErrors[err.path.split('.')[0]] = err.message;
          });
          setErrors(newErrors);
          return;
        }
        throw new Error(result.error || 'Failed to submit form');
      }

      setStatus('success');
      posthog.capture('contact_form_submitted', {
        sector: formData.sector,
        budget: formData.budget,
        has_company: !!formData.company,
        has_phone: !!formData.phone,
      });
      
      // Reset form on success
      setFormData({
        name: '', email: '', phone: '', company: '', sector: '',
        budget: '', message: '', honeypot: ''
      });
      hasStartedRef.current = false;

    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) newErrors[String(issue.path[0])] = issue.message;
        });
        setErrors(newErrors);
      } else {
        setStatus('error');
        posthog.capture('contact_form_error');
        posthog.captureException(error);
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContext value={{
      state: { formData, errors, isSubmitting, status },
      actions: { updateField, submitForm },
      meta: { formRef }
    }}>
      {children}
    </ContactContext>
  );
}
