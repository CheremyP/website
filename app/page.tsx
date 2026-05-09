import Header from "@/components/blocks/header";
import Landing from "@/components/blocks/landing/landing";
import Logos from "@/components/blocks/logos/logos";
import Cards from "@/components/blocks/cards";
import Testimonials from "@/components/blocks/testimonials/testimonials";
import Footer from "@/components/blocks/footer/footer";
import Studio from "@/components/blocks/studio/studio";

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