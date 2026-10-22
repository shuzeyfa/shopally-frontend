import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Demo } from "@/components/landing/Demo";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";

/**
 * Public marketing landing page matching the deployed ShopAlly experience.
 *
 * Showcases the hero banner, core feature grid, interactive live action demo,
 * 3-step walkthrough, Ethiopian user testimonials, and bottom call to action.
 */
export default function LandingPage() {
  return (
    <div className="flex w-full flex-col bg-surface">
      <Hero />
      <Features />
      <HowItWorks />
      <Demo />
      <Testimonials />
      <CTA />
    </div>
  );
}
