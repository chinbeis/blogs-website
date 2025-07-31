import Image from "next/image";
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { FeaturedContent } from "@/components/FeaturedContent"
import { NewsSection } from "@/components/NewsSection"
import ContactSection from "@/components/ContactSection"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header />
      <Hero />
      <FeaturedContent />
      <NewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
