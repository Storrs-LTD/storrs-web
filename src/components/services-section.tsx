import { Megaphone, ShoppingBag, Truck } from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Marketing via WhatsApp",
    description:
      "Reach customers where they actually read messages — not where they ignore ads.",
    features: [
      "Targeted broadcast campaigns",
      "Customer segments & smart tags",
      "Automated follow-ups & reminders",
    ],
    gradient: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: ShoppingBag,
    title: "Sales via WhatsApp",
    description:
      "Turn chats into orders with tools built for high-intent conversations.",
    features: [
      "Shared inbox for your sales team",
      "Quick replies & saved templates",
      "Product catalogs & order links",
    ],
    gradient: "from-green-500/10 to-emerald-500/10",
    iconBg: "bg-green-500/10 text-green-500",
  },
  {
    icon: Truck,
    title: "Delivery via WhatsApp",
    description:
      "Keep customers informed from confirmation to doorstep — all in a single thread.",
    features: [
      "Real-time order notifications",
      "Live delivery status updates",
      "Feedback & re-order prompts",
    ],
    gradient: "from-teal-500/10 to-cyan-500/10",
    iconBg: "bg-teal-500/10 text-teal-500",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-muted/50 text-xs font-medium text-muted-foreground mb-6">
            Our services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Three ways Storrs boosts your{" "}
            <span className="text-gradient">WhatsApp sales</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Marketing, sales, and delivery connected in one WhatsApp-first
            workflow — so nothing slips through the cracks.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border bg-card p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}
                >
                  <service.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <svg
                        className="w-5 h-5 text-primary shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

