'use client';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';

const casesData = [
  {
    id: 1,
    quote: "Full service, co-creation, and customer orientation at the highest level. The AI infrastructure implementation was flawless.",
    name: "Tobias Schaller",
    role: "Managing Director",
    clientName: "Beton",
    image: "/works/construction.jpg",
    logo: "/logos/beton.svg"
  },
  {
    id: 2,
    quote: "State-of-the-art AI systems that seamlessly integrated into our healthcare operations.",
    name: "Marcus van der Berg",
    role: "Operations Director",
    clientName: "PMC",
    image: "/works/hospital.jpg",
    logo: "/logos/pmc_logo.svg"
  },
  {
    id: 3,
    quote: "Very professional agency: clearly structured, reliable, and the generative AI agents have exceeded our expectations.",
    name: "Albert Gruber",
    role: "Co-Founder",
    clientName: "KPN",
    image: "/works/kpn.jpg",
    logo: "/logos/kpn_logo.svg"
  },
  {
    id: 4,
    quote: "We have successfully implemented complex predictive models together. The collaboration was always productive and pleasant.",
    name: "Nikolaus Serner",
    role: "Managing Partner",
    clientName: "Tata Steel",
    image: "/works/steel.jpg",
    logo: "/logos/tata_logo.svg"
  },
  {
    id: 5,
    quote: "Their computer vision solutions revolutionized our quality control pipeline. A highly recommended AI partner.",
    name: "Sarah Visser",
    role: "Head of Innovation",
    clientName: "LVNL",
    image: "/works/aviation.jpg",
    logo: "/logos/lvnl_logo.svg"
  },
  {
    id: 6,
    quote: "Outstanding AI automations that accelerated our digital transformation journey.",
    name: "Elena Rostova",
    role: "Chief Technology Officer",
    clientName: "VZ",
    image: "/works/vz.jpg",
    logo: "/logos/vz.svg"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, casesData.length - visibleCards);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  }, [maxIndex]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className={styles.worksSection}>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}> 
          Works
        </h1>

        <div className={styles.carouselContainer}>
          <div 
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {casesData.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.cardInner}>
                  <Image 
                    src={item.image} 
                    alt={item.clientName} 
                    fill 
                    className={styles.backgroundImage}
                  />
                  
                  <div className={styles.content}>
                    <div className={styles.logoContainer}>
                      <img 
                        src={item.logo} 
                        alt={item.clientName} 
                        className={styles.clientLogo}
                      />
                    </div>
                    
                    <p className={styles.quote}>"{item.quote}"</p>
                    
                    <div className={styles.authorInfo}>
                      <h4 className={styles.authorName}>{item.name}</h4>
                      <p className={styles.authorRole}>{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
