import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer/footer";
import WorkIndex from "@/components/blocks/work";

export const metadata = {
  title: 'Work | Artfcl',
  description: 'Selected work and case studies.',
};

export default function WorkPage() {
  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Header />
      <WorkIndex />
      <Footer />
    </main>
  );
}
