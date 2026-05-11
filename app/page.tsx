import Header from "@/components/blocks/header";
import Landing from "@/components/blocks/landing/landing";
import Logos from "@/components/blocks/logos/logos";
import dynamic from 'next/dynamic';

const Studio = dynamic(() => import('@/components/blocks/studio/studio'));
const Cards = dynamic(() => import('@/components/blocks/cards'));
const Testimonials = dynamic(() => import('@/components/blocks/testimonials/testimonials'));
const Footer = dynamic(() => import('@/components/blocks/footer/footer'));

export default function Home() {
  return (
    <main>
      <Header />
      <Landing />
      <Logos />
      <Studio />
      <Cards />
      <Testimonials />
      <Footer />  
    </main>
  );
}