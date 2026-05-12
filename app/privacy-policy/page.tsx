import React from 'react';
import Header from '@/components/blocks/header';
import Footer from '@/components/blocks/footer/footer';
import SplitText from '@/components/ui/splittext';
import styles from '@/components/blocks/legal/style.module.scss';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.title}>
          <SplitText text="Privacy Policy" />
        </div>
        
        <div className={styles.content}>
          <p className={styles.paragraph}>
            Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <h2 className={styles.sectionTitle}>1. Introduction</h2>
          <p className={styles.paragraph}>
            At ARTEFCL, we value your privacy and are committed to protecting your personal data. This privacy policy informs you about how we look after your personal data when you visit our website and tells you about your privacy rights and how the law protects you.
          </p>

          <h2 className={styles.sectionTitle}>2. Data We Collect</h2>
          <p className={styles.paragraph}>
            We may collect, use, store and transfer different kinds of personal data about you, including identity data (first name, last name), contact data (email address, telephone numbers), and technical data (internet protocol (IP) address, browser type and version).
          </p>
          
          <h2 className={styles.sectionTitle}>3. How We Use Your Data</h2>
          <p className={styles.paragraph}>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: where we need to perform the contract we are about to enter into or have entered into with you; where it is necessary for our legitimate interests; or where we need to comply with a legal obligation.
          </p>

          <h2 className={styles.sectionTitle}>4. Contact Us</h2>
          <p className={styles.paragraph}>
            If you have any questions about this privacy policy or our privacy practices, please contact us via our contact form or at the email address provided in our Imprint.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
