import { Plug, Send, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Plug,
    title: "Connect your WhatsApp",
    description:
      "Plug in your existing WhatsApp Business number in minutes. No new tools for your team to learn — just connect and go.",
  },
  {
    number: "02",
    icon: Send,
    title: "Launch campaigns & offers",
    description:
      "Send targeted campaigns and respond to inbound leads from one shared inbox. Automate follow-ups so no opportunity is missed.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Track orders & delivery",
    description:
      "See every order, status update, and customer conversation in one clean timeline. From checkout to doorstep.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative">
      {/* Subtle BG */}
      <div className="absolute inset-0 bg-muted/30" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-background text-xs font-medium text-muted-foreground mb-6">
            How it works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Up and running in <span className="text-gradient">three steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Getting started with Storrs is as easy as sending a message.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              {/* Step Number Circle */}
              <div className="relative mx-auto mb-6 w-32 h-32 rounded-full border-2 border-primary/20 flex items-center justify-center transition-all group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="https://wa.me/2349013535205"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-95"
          >
            Start growing on WhatsApp
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

