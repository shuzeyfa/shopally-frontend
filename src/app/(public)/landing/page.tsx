import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";

/**
 * Public marketing landing page.
 *
 * Showcases the hero banner, core feature grid, 3-step walkthrough,
 * and bottom call to action. Fully internationalized and themed.
 */
export default function LandingPage() {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </div>
  );
}
