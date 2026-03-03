"use client";

import { useEffect, useState } from "react";

const messages = [
  {
    type: "received" as const,
    text: "Hi, can I see today's offers? 👀",
    time: "10:30 AM",
  },
  {
    type: "sent" as const,
    text: "Absolutely! I just sent you our WhatsApp catalog. Reply with the items you'd like and we'll handle the rest 🛒",
    time: "10:31 AM",
  },
  {
    type: "received" as const,
    text: "Added 3 items — ready to check out ✅",
    time: "10:33 AM",
  },
  {
    type: "sent" as const,
    text: "Order confirmed 🎉 Delivery in 30 min. You can track everything right here.",
    time: "10:33 AM",
  },
];

export function ChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < messages.length) {
      const timer = setTimeout(
        () => setVisibleCount((c) => c + 1),
        visibleCount === 0 ? 800 : 1200,
      );
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              See it in action
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              From first message to confirmed delivery — watch how Storrs turns
              a casual inquiry into a completed sale, all inside WhatsApp.
            </p>
          </div>

          {/* Chat Mockup */}
          <div className="flex-1 max-w-sm w-full">
            <div className="rounded-3xl overflow-hidden border shadow-2xl shadow-primary/5 bg-card">
              {/* Chat Header */}
              <div className="bg-primary px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    Storrs Business
                  </p>
                  <p className="text-white/70 text-xs">Online</p>
                </div>
                <div className="ml-auto flex items-center gap-3 text-white/70">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
              </div>

              {/* Chat Body */}
              <div
                className="px-4 py-5 space-y-3 min-h-[320px]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c564' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"} ${
                      i < visibleCount ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: "0ms" }}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                        msg.type === "sent"
                          ? "bg-primary/15 text-foreground rounded-br-md"
                          : "bg-card border rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p
                        className={`text-[10px] mt-1 text-right ${
                          msg.type === "sent"
                            ? "text-primary/60"
                            : "text-muted-foreground/60"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

