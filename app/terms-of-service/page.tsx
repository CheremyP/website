import React from 'react';
import Header from '@/components/blocks/header';
import Footer from '@/components/blocks/footer/footer';
import SplitText from '@/components/ui/splittext';
import styles from '@/components/blocks/legal/style.module.css';

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.title}>
          <SplitText text="Terms of Service" />
        </div>
        
        <div className={styles.content}>
          <p className={styles.paragraph}>
            Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <h2 className={styles.sectionTitle}>1. Agreement to Terms</h2>
          <p className={styles.paragraph}>
            By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>

          <h2 className={styles.sectionTitle}>2. Intellectual Property</h2>
          <p className={styles.paragraph}>
            The Service and its original content, features, and functionality are and will remain the exclusive property of ARTEFCL and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ARTEFCL.
          </p>
          
          <h2 className={styles.sectionTitle}>3. Limitation of Liability</h2>
          <p className={styles.paragraph}>
            In no event shall ARTEFCL, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2 className={styles.sectionTitle}>4. Changes to Terms</h2>
          <p className={styles.paragraph}>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

