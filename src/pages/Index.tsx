import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CompanyOverview } from "@/components/CompanyOverview";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Founder } from "@/components/Founder";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CompanyOverview />
      <Services />
      <Portfolio />
      <Founder />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
