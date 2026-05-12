'use client';

import React from 'react';
import styles from './style.module.scss';
import SplitText from '@/components/ui/splittext';
import Rounded from '@/components/ui/roundedbutton';
import Magnetic from '@/components/ui/magnetic';
import { ContactProvider, useContactContext } from './context';
import { ContactFormData } from '@/lib/contact-schema';

const SECTOR_OPTIONS = ['Retail', 'Manufacturing', 'Finance', 'Technology', 'Healthcare', 'Hospitality', 'Media', 'Other'];
const BUDGET_OPTIONS = ['Under 10k', '10k - 50k', '50k - 150k', '150k+'];

function ContactFrame({ children }: { children: React.ReactNode }) {
  const { actions, meta: { formRef } } = useContactContext();
  return (
    <form ref={formRef} className={styles.form} onSubmit={actions.submitForm} noValidate>
      <ContactHoneypot />
      {children}
    </form>
  );
}

function ContactHoneypot() {
  const { state, actions } = useContactContext();
  return (
    <input
      type="text"
      name="honeypot"
      className={styles.visuallyHidden}
      tabIndex={-1}
      autoComplete="off"
      value={state.formData.honeypot || ''}
      onChange={(e) => actions.updateField('honeypot', e.target.value)}
    />
  );
}

interface ContactFieldProps {
  name: keyof ContactFormData;
  label: React.ReactNode;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  placeholder?: string;
}

function ContactField({ name, label, type = 'text', placeholder }: ContactFieldProps) {
  const { state, actions } = useContactContext();
  
  const value = state.formData[name] || '';
  const error = state.errors[name];
  const isInvalid = !!error;
  const errorId = isInvalid ? `${name}-error` : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    actions.updateField(name, e.target.value);
  };

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={name}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          aria-invalid={isInvalid}
          aria-describedby={errorId}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          aria-invalid={isInvalid}
          aria-describedby={errorId}
        />
      )}
      {isInvalid && (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

interface ContactChipGroupProps {
  name: keyof ContactFormData;
  label: React.ReactNode;
  options: string[];
}

function ContactChipGroup({ name, label, options }: ContactChipGroupProps) {
  const { state, actions } = useContactContext();
  
  const value = state.formData[name];
  const error = state.errors[name];
  const isInvalid = !!error;
  const errorId = isInvalid ? `${name}-error` : undefined;
  const labelId = `${name}-label`;

  return (
    <div className={styles.fieldGroup}>
      <label id={labelId}>{label}</label>
      <div className={styles.chips} role="radiogroup" aria-labelledby={labelId}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={value === opt}
            className={value === opt ? styles.active : ''}
            onClick={() => actions.updateField(name, opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      {isInvalid && (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function ContactSubmit() {
  const { state, meta: { formRef } } = useContactContext();
  const { isSubmitting, status } = state;
  
  return (
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
          Message sent successfully. We&apos;ll be in touch soon.
        </p>
      )}
      {status === 'error' && (
        <p className={`${styles.statusMessage} ${styles.error}`}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}

const Contact = {
  Provider: ContactProvider,
  Frame: ContactFrame,
  Field: ContactField,
  ChipGroup: ContactChipGroup,
  Submit: ContactSubmit,
};

export default function ContactSection() {
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

          <Contact.Provider>
            <Contact.Frame>
              <div className={styles.row}>
                <Contact.Field name="name" label="Name" placeholder="John Doe" />
                <Contact.Field name="email" label="Email" type="email" placeholder="john@example.com" />
              </div>

              <div className={styles.row}>
                <Contact.Field 
                  name="company" 
                  label={<>Company <span className={styles.optional}>(Optional)</span></>} 
                  placeholder="Your Organization" 
                />
                <Contact.Field 
                  name="phone" 
                  label={<>Phone <span className={styles.optional}>(Optional)</span></>} 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                />
              </div>

              <Contact.ChipGroup name="sector" label="Sector" options={SECTOR_OPTIONS} />
              
              <Contact.ChipGroup 
                name="budget" 
                label={<>Budget Range <span className={styles.optional}>(Optional)</span></>} 
                options={BUDGET_OPTIONS} 
              />

              <Contact.Field 
                name="message" 
                label="Message" 
                type="textarea" 
                placeholder="Tell us about your project..." 
              />

              <Contact.Submit />
            </Contact.Frame>
          </Contact.Provider>
        </div>
      </div>
    </section>
  );
}
