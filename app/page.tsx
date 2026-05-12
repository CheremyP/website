import { Suspense } from 'react';
import Header from "@/components/blocks/header";
import Landing from "@/components/blocks/landing/landing";
import Logos from "@/components/blocks/logos/logos";
import dynamic from 'next/dynamic';

const Studio = dynamic(() => import('@/components/blocks/studio/studio'), { ssr: true });
const Cards = dynamic(() => import('@/components/blocks/cards'), { ssr: true });
const Testimonials = dynamic(() => import('@/components/blocks/testimonials/testimonials'), { ssr: true });
const Footer = dynamic(() => import('@/components/blocks/footer/footer'), { ssr: true });

const LoadingFallback = () => (
  <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '24px', height: '24px', border: '2px solid #e6e5df', borderTopColor: '#141516', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
  </div>
);

export default function Home() {
  return (
    <main>
      <Header />
      <Landing />
      <Logos />
      <Suspense fallback={<LoadingFallback />}>
        <Studio />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Cards />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
}