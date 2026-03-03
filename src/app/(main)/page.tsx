import { HeroSection } from "@/components/hero-section";
import { ChatDemo } from "@/components/chat-demo";
import { ServicesSection } from "@/components/services-section";
import { HowItWorksSection } from "@/components/how-it-works";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ChatDemo />
      <ServicesSection />
      <HowItWorksSection />
    </>
  );
}

