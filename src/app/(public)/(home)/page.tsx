import type { Metadata } from "next";

import CityCareCTA from "@/components/home/city-care-cta";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works";
import PopularServicesSection from "@/components/home/popular-services";
import WhyChooseCityCare from "@/components/home/why-choose-city-care";

export const metadata: Metadata = {
  title: "Home",
  description:
    "City Service is a digital platform for submitting city complaints, requesting public services, and tracking service progress.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <PopularServicesSection />
      <WhyChooseCityCare />
      <CityCareCTA />
    </main>
  );
}
