import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Layout,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding Prerequisites | Storrs",
  description:
    "Learn how to set up your Meta Business Portfolio, Ad Accounts, and WhatsApp Billing for a seamless Storrs onboarding experience.",
};

export default function OnboardingPrerequisitesPage() {
  const prerequisites = [
    { title: "Meta Business Portfolio", icon: ShieldCheck },
    { title: "Facebook Page", icon: Layout },
    { title: "Ad Account", icon: PlusCircle },
  ];

  const postOnboarding = [{ title: "WhatsApp Billing", icon: CreditCard }];

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 mb-16 text-center">
          <Badge variant="secondary" className="mb-4 animate-fade-in">
            Prerequisites Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 animate-fade-in-up">
            Setting Up Your <span className="text-gradient">Meta Assets</span>
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in-up animation-delay-200">
            Before you can start using Storrs to automate your WhatsApp sales,
            you'll need to have your Meta Business infrastructure ready. Follow
            this guide to set everything up in minutes.
          </p>
        </section>

        {/* Quick Summary Card */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <Card className="glass-card glow-green animate-fade-in-up animation-delay-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                Quick Summary of Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
                  Step 1: Before Connecting to Storrs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {prerequisites.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">
                          Step {index + 1}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {step.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
                  Step 2: After Onboarding to Storrs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {postOnboarding.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Final Step</p>
                        <p className="text-sm text-muted-foreground">
                          {step.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Detailed Content */}
        <section className="max-w-3xl mx-auto px-6 space-y-24">
          {/* Step 1: Business Portfolio */}
          <div id="portfolio" className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                1
              </span>
              <h2 className="text-2xl font-bold">
                Create a Meta Business Portfolio
              </h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-muted-foreground">
              <p>
                A Meta Business Portfolio (formerly Business Manager) is the
                central hub for managing all your business assets across
                Facebook and Instagram. It keeps your business activities
                separate from your personal profile.
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Go to{" "}
                  <a
                    href="https://business.facebook.com/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    business.facebook.com/overview{" "}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  Click <strong>Create Account</strong>.
                </li>
                <li>
                  Enter your business name, your name, and your business email
                  address.
                </li>
                <li>Verify your email to complete the setup.</li>
              </ul>
              <div className="pt-4">
                <Link
                  href="https://www.facebook.com/business/help/1710077379203657"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all underline decoration-primary/30 underline-offset-4"
                >
                  Meta Documentation: Creating a Business Portfolio{" "}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Step 2: Facebook Page */}
          <div id="page" className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                2
              </span>
              <h2 className="text-2xl font-bold">Add Your Facebook Page</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-muted-foreground">
              <p>
                Once you have a portfolio, you must add the Facebook Page you
                want to use for your business. This page will be linked to your
                WhatsApp Business account.
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  In Business Settings, go to{" "}
                  <strong>Accounts &gt; Pages</strong>.
                </li>
                <li>
                  Click <strong>Add</strong> and choose "Add a Page" if you
                  already own one, or "Create a New Page".
                </li>
                <li>Search for your page name or paste the URL.</li>
              </ul>
              <div className="pt-4">
                <Link
                  href="https://www.facebook.com/business/help/720478807965744"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all underline decoration-primary/30 underline-offset-4"
                >
                  Meta Documentation: Adding a Page to Business Portfolio{" "}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Step 3: Ad Account */}
          <div id="ad-account" className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                3
              </span>
              <h2 className="text-2xl font-bold">Create an Ad Account</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-muted-foreground">
              <p>
                An Ad Account is required for Meta to process the messaging fees
                associated with the WhatsApp Business Platform. Even if you
                don't plan to run ads, this is a technical requirement.
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  In Business Settings, select{" "}
                  <strong>Accounts &gt; Ad Accounts</strong>.
                </li>
                <li>
                  Click <strong>Add</strong> and select{" "}
                  <strong>Create a new ad account</strong>.
                </li>
                <li>
                  Enter your business name, time zone, and the currency you use
                  for billing.
                </li>
                <li>Select "My Business" when asked who the account is for.</li>
              </ul>
              <div className="pt-4">
                <Link
                  href="https://www.facebook.com/business/help/407323696966570"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all underline decoration-primary/30 underline-offset-4"
                >
                  Meta Documentation: Creating an Ad Account{" "}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Step 4: WhatsApp Billing */}
          <div id="billing" className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="text-primary border-primary/30"
              >
                Post-Onboarding
              </Badge>
              <h2 className="text-2xl font-bold">Add Billing for WhatsApp</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-muted-foreground">
              <p>
                To enable WhatsApp Business Messaging, you must attach a valid
                payment method.{" "}
                <strong>
                  This step is completed after you have successfully connected
                  your assets to Storrs.
                </strong>{" "}
                Meta uses this to bill for conversation-based charges.
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Navigate to <strong>Billing & Payments</strong> in your
                  Business Manager.
                </li>
                <li>
                  Ensure you are in the correct{" "}
                  <strong>WhatsApp Business Account</strong> context.
                </li>
                <li>
                  Click <strong>Add Payment Method</strong> and enter your card
                  details.
                </li>
                <li>
                  Ensure your card has international transactions enabled.
                </li>
                <li>
                  Set this card as your <strong>Default</strong> payment method
                  for messaging.
                </li>
              </ul>
              <div className="pt-4">
                <Link
                  href="https://www.facebook.com/business/help/2225184664363779"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all underline decoration-primary/30 underline-offset-4"
                >
                  Meta Documentation: Setting up WhatsApp Billing{" "}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

