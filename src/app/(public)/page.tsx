import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works";
import PopularServicesSection from "@/components/home/popular-services";
import WhyChooseCityCare from "@/components/home/why-choose-city-care";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <PopularServicesSection />
      <WhyChooseCityCare />
    </main>
  );
}
