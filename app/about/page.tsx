import { Suspense } from 'react';
import Header from "@/components/blocks/header";
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/blocks/about/about'), { ssr: true });
const Footer = dynamic(() => import('@/components/blocks/footer/footer'), { ssr: true });

export const metadata = {
  title: 'About | ARTEFCL',
  description: 'Learn about Studio 28, a technology company rooted in real connection.',
};

const LoadingFallback = () => (
  <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '24px', height: '24px', border: '2px solid #e6e5df', borderTopColor: '#141516', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
  </div>
);

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
}
