import styles from './style.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <>
            <div className={styles.footer}>
                <a>Awwwards</a>
                <a>Instagram</a>
                <a>Dribble</a>
                <a>LinkedIn</a>
            </div>
            <div className={styles.legal}>
                <Link href="/privacy-policy" prefetch={false}>Privacy Policy</Link>
                <Link href="/terms-of-service" prefetch={false}>Terms & Conditions</Link>
            </div>
        </>
    )
}