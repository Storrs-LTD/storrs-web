import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – Storrs",
  description:
    "Learn how Storrs collects, uses, and protects your data. Read our full privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last Updated: November 24, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose-content space-y-10">
          <p className="text-muted-foreground leading-relaxed">
            We collect information that you provide directly to us and
            information automatically collected when you use our Service.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-lg font-medium mb-3 text-foreground/90">
              Information You Provide
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-6">
              <li>
                <strong className="text-foreground">
                  Account Information:
                </strong>{" "}
                When you register for Storrs, we collect your name, business
                name, email address, phone number, and WhatsApp Business number.
              </li>
              <li>
                <strong className="text-foreground">Communications:</strong> If
                you contact us directly, we may receive additional information
                about you such as the contents of the message and/or attachments
                you may send us, and any other information you may choose to
                provide.
              </li>
            </ul>

            <h3 className="text-lg font-medium mb-3 text-foreground/90">
              Information from Meta Platforms
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When you connect your WhatsApp Business account to Storrs, we
              receive certain information from Meta Platforms, Inc.
              (&quot;Meta&quot;) in accordance with their policies and your
              permissions. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>Your WhatsApp Business profile information.</li>
              <li>
                Phone numbers and display names of your customers who message
                you.
              </li>
              <li>
                Message content and media to facilitate your conversations
                through our dashboard.
              </li>
              <li>Status of messages (sent, delivered, read).</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>Provide, operate, and maintain our Service.</li>
              <li>
                Facilitate your marketing campaigns, sales conversations, and
                delivery updates via WhatsApp.
              </li>
              <li>Improve, personalize, and expand our Service.</li>
              <li>Understand and analyze how you use our Service.</li>
              <li>
                Communicate with you, either directly or through one of our
                partners, including for customer service, updates, and marketing
                purposes.
              </li>
              <li>Find and prevent fraud.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Data Sharing and Disclosure
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We do not sell your personal data. We may share your information
              in the following situations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <strong className="text-foreground">Service Providers:</strong>{" "}
                We may share data with third-party vendors, service providers,
                contractors, or agents who perform services for us or on our
                behalf and require access to such information to do that work
                (e.g., hosting, data analysis).
              </li>
              <li>
                <strong className="text-foreground">Legal Requirements:</strong>{" "}
                We may disclose your information where we are legally required
                to do so in order to comply with applicable law, governmental
                requests, a judicial proceeding, court order, or legal process.
              </li>
              <li>
                <strong className="text-foreground">Business Transfers:</strong>{" "}
                We may share or transfer your information in connection with, or
                during negotiations of, any merger, sale of company assets,
                financing, or acquisition of all or a portion of our business to
                another company.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Meta Platform Data
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We strictly adhere to Meta&apos;s Platform Terms and Developer
              Policies. Specifically regarding data obtained from Meta
              Platforms:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                We do not use data obtained from Meta to retarget users on or
                off Meta platforms.
              </li>
              <li>
                We do not use data obtained from Meta to build or augment user
                profiles for third parties.
              </li>
              <li>
                We do not sell, license, or purchase any data obtained from
                Meta.
              </li>
              <li>
                We do not transfer data obtained from Meta to any ad network, ad
                exchange, data broker, or other advertising or monetization
                related service.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Data Retention and Deletion
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We retain your personal information only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use your information to the extent necessary to comply
              with our legal obligations, resolve disputes, and enforce our
              policies.
            </p>
            <div className="rounded-xl border bg-card p-6">
              <p className="font-medium mb-2">Requesting Data Deletion</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You have the right to request the deletion of your personal
                data. To request deletion, please contact us at{" "}
                <a
                  href="https://wa.me/2349013535205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  +234 901 353 5205
                </a>{" "}
                or via our support channels. Upon request, we will delete your
                data from our active databases, subject to any legal obligations
                to retain certain data.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Security of Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable, and no method of data transmission
              can be guaranteed against any interception or other type of
              misuse.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last Updated&quot; date. You are advised to
              review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                By WhatsApp:{" "}
                <a
                  href="https://wa.me/2349013535205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  +234 901 353 5205
                </a>
              </li>
              <li>
                By visiting our website:{" "}
                <a
                  href="https://storrs.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  storrs.com.ng
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

