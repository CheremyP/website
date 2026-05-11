'use client';

import { useState, useRef } from 'react';
import styles from './style.module.scss';
import SplitText from '@/components/ui/splittext';
import Rounded from '@/components/ui/roundedbutton';
import Magnetic from '@/components/ui/magnetic';
import { contactSchema, type ContactFormData } from '@/lib/contact-schema';
import { z } from 'zod';

const SECTOR_OPTIONS = ['Retail', 'Manufacturing', 'Finance', 'Technology', 'Healthcare', 'Hospitality', 'Media', 'Other'];
const BUDGET_OPTIONS = ['Under 10k', '10k - 50k', '50k - 150k', '150k+'];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleChipSelect = (field: 'sector' | 'budget', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          const newErrors: any = {};
          result.details.forEach((err: any) => {
            if (err.path) newErrors[err.path.split('.')[0]] = err.message;
          });
          setErrors(newErrors);
          return;
        }
        throw new Error(result.error || 'Failed to submit form');
      }

      setStatus('success');
      // Reset form on success
      setFormData({
        name: '', email: '', phone: '', company: '', sector: '',
        budget: '', message: '', honeypot: ''
      });
      
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const newErrors: any = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) newErrors[issue.path[0]] = issue.message;
        });
        setErrors(newErrors);
      } else {
        setStatus('error');
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.content}>
        <SplitText text="Let's talk." className={styles.heading} />
        
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div className={styles.sticky}>
              <Magnetic>
                <div className={styles.emailWrapper}>
                  <a href="mailto:info@artfcl.com">info@artfcl.com</a>
                </div>
              </Magnetic>
              <p className={styles.subtext}>
                Based in Amsterdam, working globally.
              </p>
            </div>
          </div>

          <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="honeypot"
              className={styles.visuallyHidden}
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot || ''}
              onChange={handleChange}
            />

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name || ''}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <span id="name-error" className={styles.errorText} role="alert">{errors.name}</span>}
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email || ''}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <span id="email-error" className={styles.errorText} role="alert">{errors.email}</span>}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label htmlFor="company">Company <span className={styles.optional}>(Optional)</span></label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Your Organization"
                  value={formData.company || ''}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="phone">Phone <span className={styles.optional}>(Optional)</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label id="sector-label">Sector</label>
              <div className={styles.chips} role="radiogroup" aria-labelledby="sector-label">
                {SECTOR_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={formData.sector === opt}
                    className={formData.sector === opt ? styles.active : ''}
                    onClick={() => handleChipSelect('sector', opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {errors.sector && <span id="sector-error" className={styles.errorText} role="alert">{errors.sector}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label id="budget-label">Budget Range <span className={styles.optional}>(Optional)</span></label>
              <div className={styles.chips} role="radiogroup" aria-labelledby="budget-label">
                {BUDGET_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={formData.budget === opt}
                    className={formData.budget === opt ? styles.active : ''}
                    onClick={() => handleChipSelect('budget', opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your project..."
                value={formData.message || ''}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && <span id="message-error" className={styles.errorText} role="alert">{errors.message}</span>}
            </div>

            <div className={styles.submitArea}>
              <Rounded
                backgroundColor="#000000"
                onClick={isSubmitting ? undefined : () => {
                  formRef.current?.requestSubmit();
                }}
                style={{
                  opacity: isSubmitting ? 0.6 : 1,
                  pointerEvents: isSubmitting ? 'none' : 'auto',
                }}
              >
                <p style={{ textTransform: 'none' }}>
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </p>
              </Rounded>

              {status === 'success' && (
                <p className={`${styles.statusMessage} ${styles.success}`}>
                  Message sent successfully. We'll be in touch soon.
                </p>
              )}
              {status === 'error' && (
                <p className={`${styles.statusMessage} ${styles.error}`}>
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
