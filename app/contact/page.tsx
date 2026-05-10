import Header from "@/components/blocks/header";
import Contact from "@/components/blocks/contact";
import Footer from "@/components/blocks/footer/footer";

export const metadata = {
  title: 'Contact | Artfcl',
  description: 'Get in touch with us to start a conversation.',
};

export default function ContactPage() {
  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Header />
      <Contact />
      <Footer />
    </main>
  );
}
