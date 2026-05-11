import styles from './style.module.css';
import { translate } from '../anim';
import { m } from 'framer-motion';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <ul>
                <m.li 
                    custom={[0.3, 0]} 
                    variants={translate} initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <span>Made by:</span> ARTEFCL
                </m.li>
            </ul>
            <ul>
                <m.li  
                    custom={[0.3, 0]} 
                    variants={translate} initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <span>Typography:</span> Inter Mono
                </m.li>
            </ul>
            <ul>
                <m.li
                    custom={[0.3, 0]} 
                    variants={translate} initial="initial" 
                    animate="enter" 
                    exit="exit">
                    Privacy Policy
                </m.li>
                    <m.li 
                    custom={[0.3, 0]} 
                    variants={translate} initial="initial" 
                    animate="enter" 
                    exit="exit">
                    Terms & Conditions
                </m.li>
            </ul>
            <ul>

            </ul>
        </div>
    )
}