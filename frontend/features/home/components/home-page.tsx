import { Hero } from "@/features/home/components/hero";
import { PopularDestinations } from "@/features/home/components/popular-destinations";
import { FeaturedPackages } from "@/features/home/components/featured-packages";
import { WhyChooseUs, ServicesSection } from "@/features/home/components/why-choose-us";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { StatsSection } from "@/features/home/components/stats-section";
import { CTASection } from "@/features/home/components/cta-section";

export function HomePage() {
  return (
    <>
      <Hero />
      <PopularDestinations />
      <FeaturedPackages />
      <WhyChooseUs />
      <ServicesSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
