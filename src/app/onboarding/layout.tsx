import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding - Storrs",
  description: "Connect your Facebook Business account to Storrs.",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

