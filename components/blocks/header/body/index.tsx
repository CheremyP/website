import { m } from 'framer-motion';
import Link from 'next/link';
import styles from './style.module.scss';
import { blur, translate } from '../anim';
import { type Dispatch, type SetStateAction } from 'react';
import type React from 'react';

type NavLink = { title: string; href: string };
type SelectedLink = { isActive: boolean; index: number };

type BodyProps = {
  links: NavLink[];
  selectedLink: SelectedLink;
  setSelectedLink: Dispatch<SetStateAction<SelectedLink>>;
};

export default function Body({ links, selectedLink, setSelectedLink }: BodyProps) {

    const getChars = (word: string) => {
        const chars: React.ReactElement[] = [];
        word.split("").forEach( (char, i) => {
          chars.push(
            <m.span 
                custom={[i * 0.02, (word.length - i) * 0.01]} 
                variants={translate} initial="initial" 
                animate="enter" 
                exit="exit" 
                key={char + i}>
                {char}
            </m.span>
            )
        })
        return chars;
    }
    
    return (
        <div className={styles.body}>
        {
            links.map( (link: NavLink, index: number) => {
                const { title, href } = link;
                return <Link key={`l_${index}`} href={href}>
                <m.p 
                    onMouseOver={() => {setSelectedLink({isActive: true, index})}} 
                    onMouseLeave={() => {setSelectedLink({isActive: false, index})}} 
                    variants={blur} 
                    animate={selectedLink.isActive && selectedLink.index !== index ? "open" : "closed"}>
                    {getChars(title)}
                </m.p>
                </Link>
            })
        }
        </div>
    )
}