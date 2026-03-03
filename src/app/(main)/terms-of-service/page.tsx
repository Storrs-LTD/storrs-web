import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service – Storrs",
  description:
    "Read the Terms of Service for Storrs. Understand your rights and responsibilities when using our WhatsApp growth tools.",
};

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last Updated: November 24, 2025
          </p>
        </div>

        {/* Intro */}
        <div className="prose-content space-y-10">
          <div className="rounded-xl border bg-card p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Please read these Terms of Service (&quot;Terms&quot;) carefully
              before using the Storrs website and WhatsApp growth tools (the
              &quot;Service&quot;) operated by Storrs LTD (&quot;us&quot;,
              &quot;we&quot;, or &quot;our&quot;). Your access to and use of the
              Service is conditioned on your acceptance of and compliance with
              these Terms. By accessing or using the Service you agree to be
              bound by these Terms. If you disagree with any part of the terms,
              then you may not access the Service.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Description of Service
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Storrs provides a platform for businesses to manage marketing,
              sales, and delivery operations via WhatsApp. Our Service
              integrates with the WhatsApp Business API to facilitate these
              communications.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Accounts and Registration
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To use our Service, you must register for an account and provide
              accurate, complete, and current information. You are responsible
              for safeguarding the password that you use to access the Service
              and for any activities or actions under your password.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You must have a valid WhatsApp Business account to use our
              Service. You agree to comply with all terms and policies
              applicable to your WhatsApp Business account, including the
              WhatsApp Business Solution Terms.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                Send spam, unsolicited messages, or messages that violate
                WhatsApp&apos;s Business or Commerce Policies.
              </li>
              <li>Violate any laws, regulations, or third-party rights.</li>
              <li>Distribute malware, viruses, or any other malicious code.</li>
              <li>
                Engage in any activity that interferes with or disrupts the
                Service.
              </li>
              <li>
                Attempt to gain unauthorized access to the Service or its
                related systems.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Compliance with Meta Policies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our Service relies on the Meta Platform (including WhatsApp). By
              using our Service, you also agree to be bound by the{" "}
              <a
                href="https://developers.facebook.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Meta Platform Terms
              </a>{" "}
              and{" "}
              <a
                href="https://www.whatsapp.com/legal/business-solution-terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                WhatsApp Business Solution Terms
              </a>
              .
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You acknowledge that Meta has the right to enforce its terms
              directly against you. We are not responsible for any actions taken
              by Meta (such as suspending your WhatsApp account) due to your
              violation of their policies.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of Storrs LTD and its
              licensors. The Service is protected by copyright, trademark, and
              other laws.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You retain all rights to the content (text, images, data) you
              upload or transmit through the Service (&quot;User Content&quot;).
              By using the Service, you grant us a license to use, copy, modify,
              and display your User Content solely as necessary to provide the
              Service to you.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach the Terms.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Upon termination, your right to use the Service will immediately
              cease. If you wish to terminate your account, you may simply
              discontinue using the Service.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall Storrs LTD, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from (i) your
              access to or use of or inability to access or use the Service;
              (ii) any conduct or content of any third party on the Service;
              (iii) any content obtained from the Service; and (iv) unauthorized
              access, use or alteration of your transmissions or content,
              whether based on warranty, contract, tort (including negligence)
              or any other legal theory, whether or not we have been informed of
              the possibility of such damage.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your use of the Service is at your sole risk. The Service is
              provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
              basis. The Service is provided without warranties of any kind,
              whether express or implied, including, but not limited to, implied
              warranties of merchantability, fitness for a particular purpose,
              non-infringement or course of performance.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed and construed in accordance with the
              laws of Nigeria, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Changes</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material we will try to
              provide at least 30 days notice prior to any new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
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
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

