import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works";
import PopularServicesSection from "@/components/home/popular-services";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <PopularServicesSection />
    </main>
  );
}
