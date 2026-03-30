"use client";

import Script from "next/script";
import { useEffect, useState, Suspense } from "react";
import * as Sentry from "@sentry/nextjs";
import { redirect, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./onboarding.module.css";

const supabase = createClient();

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

enum MetaBusinessIntegrationStep {
  validatingIntegration = "validating_integration",
  creatingIntegration = "creating_integration",
  connectingToMeta = "connecting_to_meta",
  settingUpWhatsAppBusinessAccount = "setting_up_whatsapp_business_account",
  registeringPhoneNumber = "registering_phone_number",
  finalizing = "finalizing",
  completed = "completed",
}

/** Ordered steps to display in the progress card (excludes `completed`). */
const DISPLAY_STEPS = [
  {
    key: MetaBusinessIntegrationStep.validatingIntegration,
    label: "Validating integration",
  },
  {
    key: MetaBusinessIntegrationStep.creatingIntegration,
    label: "Creating integration",
  },
  {
    key: MetaBusinessIntegrationStep.connectingToMeta,
    label: "Connecting to Meta",
  },
  {
    key: MetaBusinessIntegrationStep.settingUpWhatsAppBusinessAccount,
    label: "Setting up WhatsApp Business",
  },
  {
    key: MetaBusinessIntegrationStep.registeringPhoneNumber,
    label: "Registering phone number",
  },
  {
    key: MetaBusinessIntegrationStep.finalizing,
    label: "Finalizing setup",
  },
];

/** All enum values in order, for ordinal comparisons. */
const STEP_ORDER = Object.values(MetaBusinessIntegrationStep);

function getStepIndex(step: MetaBusinessIntegrationStep): number {
  return STEP_ORDER.indexOf(step);
}

function OnboardingPageContent() {
  const searchParams = useSearchParams();
  const storrsBusinessId = searchParams.get("storrs_business_id");
  const pin = searchParams.get("pin");
  if (!(storrsBusinessId && pin)) {
    redirect("/");
  }

  const [currentStep, setCurrentStep] =
    useState<MetaBusinessIntegrationStep | null>(null);
  const [failedStep, setFailedStep] =
    useState<MetaBusinessIntegrationStep | null>(null);

  useEffect(() => {
    if (currentStep === MetaBusinessIntegrationStep.completed) {
      window.location.href =
        "http://storrs.com.ng/post-meta-business-integration";
    }
  }, [currentStep]);

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FB_APP_ID!,
        autoLogAppEvents: true,
        xfbml: true,
        version: process.env.NEXT_PUBLIC_FB_GRAPH_VERSION!,
      });
    };

    // Session logging message event listener
    const handleMessage = async (event: MessageEvent) => {
      if (!event.origin.endsWith("facebook.com")) return;

      // Ignore non-JSON messages (Facebook posts many during the flow)
      let data: any;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }

      if (data.type !== "WA_EMBEDDED_SIGNUP") return;

      // Valid embedded signup event — begin tracking
      setCurrentStep(MetaBusinessIntegrationStep.validatingIntegration);
      setFailedStep(null);

      if (data.event === "CANCEL") {
        Sentry.captureMessage("WhatsApp Embedded Signup Cancelled or Error", {
          extra: { embeddedSignupData: data.data },
        });
        setFailedStep(MetaBusinessIntegrationStep.validatingIntegration);
      } else if (data.event === "FINISH") {
        try {
          setCurrentStep(MetaBusinessIntegrationStep.creatingIntegration);

          const { error: invokeError } = await supabase.functions.invoke(
            "insert-meta-business-integration",
            {
              body: {
                ...data,
                storrs_business_id: storrsBusinessId,
              },
            },
          );

          if (!invokeError) {
            setCurrentStep(MetaBusinessIntegrationStep.connectingToMeta);
          } else {
            Sentry.captureException(invokeError, {
              extra: {
                message: "Error invoking insert-meta-business-integration",
                data,
                storrsBusinessId,
              },
            });
            setFailedStep(MetaBusinessIntegrationStep.creatingIntegration);
          }
        } catch (error) {
          Sentry.captureException(error, {
            extra: {
              message: "Error inserting meta business integration",
              data,
              storrsBusinessId,
            },
          });
          setFailedStep(MetaBusinessIntegrationStep.creatingIntegration);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [storrsBusinessId]);

  // Response callback
  const fbLoginCallback = (response: any) => {
    (async () => {
      if (response.authResponse) {
        const code = response.authResponse.code;

        try {
          const { data: streamResponse, error: invokeError } =
            await supabase.functions.invoke("integrate-meta-business", {
              body: {
                code,
                storrs_business_id: storrsBusinessId,
                pin,
              },
            });

          if (invokeError) {
            throw new Error(
              invokeError.message || "Failed to retrieve meta business token",
            );
          }

          const resp =
            streamResponse instanceof Response
              ? streamResponse
              : new Response(streamResponse);

          if (!resp.body) {
            throw new Error("No response body from stream");
          }

          const reader = resp.body.getReader();
          const decoder = new TextDecoder();
          let done = false;

          while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;

            if (value) {
              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split("\n");

              for (const line of lines) {
                if (line.startsWith("data: ")) {
                  let sseData: Record<string, unknown>;
                  try {
                    sseData = JSON.parse(line.slice(6));
                  } catch {
                    continue;
                  }

                  const progressKeys = Object.values(
                    MetaBusinessIntegrationStep,
                  );

                  // Process each progress key in the SSE data
                  for (const key of Object.keys(sseData)) {
                    if (
                      progressKeys.includes(key as MetaBusinessIntegrationStep)
                    ) {
                      const step = key as MetaBusinessIntegrationStep;
                      if (sseData[key] === true) {
                        setCurrentStep(step);
                      } else if (sseData[key] === false) {
                        setFailedStep(step);
                      }
                    }
                  }

                  if (sseData.error) {
                    throw new Error(String(sseData.error));
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error("Error retrieving meta business token: ", error);
          Sentry.captureException(error, {
            extra: {
              message: "Error retrieving meta business token",
              code,
              storrsBusinessId,
            },
          });
        }
      } else {
        Sentry.captureMessage(
          "Facebook Login Failed: " + JSON.stringify(response),
        );
      }
    })().catch((error) => {
      Sentry.captureException(error, {
        extra: { message: "Unhandled error in fbLoginCallback" },
      });
    });
  };

  const launchWhatsAppSignup = () => {
    window.FB.login(fbLoginCallback, {
      config_id: process.env.NEXT_PUBLIC_FB_CONFIG_ID!,
      response_type: "code",
      override_default_response_type: true,
      extras: {
        setup: {},
      },
    });
  };

  const handleTryAgain = () => {
    setCurrentStep(null);
    setFailedStep(null);
  };

  // ── Rendering ─────────────────────────────────────────────────────────

  const showProgressCard = currentStep !== null;

  return (
    <>
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      />
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground selection:bg-primary/30">
        {showProgressCard ? (
          <ProgressCard
            currentStep={currentStep}
            failedStep={failedStep}
            onTryAgain={handleTryAgain}
          />
        ) : (
          <div className="w-full max-w-sm flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
            {/* Storrs Icon */}
            <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mb-2">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                Connect with Facebook
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Link your Facebook Business account to set up your WhatsApp
                Business integration with Storrs.
              </p>
            </div>

            <div className="w-full bg-secondary/50 border border-border rounded-xl p-4 text-left">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-lg shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    Important
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    During the onboarding flow, please ensure you{" "}
                    <strong className="text-foreground font-medium">
                      grant all requested permissions
                    </strong>
                    . Missing permissions will prevent your business from
                    onboarding.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={launchWhatsAppSignup}
              className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white transition-all duration-200 rounded-xl px-4 py-3.5 font-medium text-sm active:scale-[0.98]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Continue with Facebook
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ── Progress Card ─────────────────────────────────────────────────────────

function ProgressCard({
  currentStep,
  failedStep,
  onTryAgain,
}: {
  currentStep: MetaBusinessIntegrationStep;
  failedStep: MetaBusinessIntegrationStep | null;
  onTryAgain: () => void;
}) {
  const currentIndex = getStepIndex(currentStep);
  const hasFailed = failedStep !== null;

  return (
    <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
      {/* Storrs Icon */}
      <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mb-2">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          {hasFailed ? "Integration Failed" : "Setting Up Integration"}
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {hasFailed
            ? "Something went wrong during the setup process."
            : "Please wait while we connect your business."}
        </p>
      </div>

      {/* Steps list */}
      <div className="w-full bg-card border border-border rounded-xl p-4 text-left space-y-1">
        {DISPLAY_STEPS.map((step, index) => {
          const stepIndex = getStepIndex(step.key);
          const isFailed = failedStep === step.key;
          const isCompleted = !isFailed && stepIndex < currentIndex;
          const isActive = !isFailed && !hasFailed && step.key === currentStep;

          return (
            <div
              key={step.key}
              className={`${styles.stepRow} flex items-center gap-3 py-2.5 px-2 rounded-lg transition-colors duration-300 ${
                isActive ? "bg-secondary/50" : ""
              }`}
              {...{
                style: {
                  "--step-delay": `${index * 80}ms`,
                } as React.CSSProperties,
              }}
            >
              {/* Status icon */}
              <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                {isFailed ? (
                  <svg
                    className="w-5 h-5 text-destructive"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : isCompleted ? (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : isActive ? (
                  <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-border" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-sm transition-colors duration-300 ${
                  isFailed
                    ? "text-destructive font-medium"
                    : isCompleted
                      ? "text-foreground"
                      : isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Error action */}
      {hasFailed && (
        <button
          onClick={onTryAgain}
          className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground transition-all duration-200 rounded-xl px-4 py-3 font-medium text-sm active:scale-[0.98]"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
}

// ── Page wrapper with Suspense ────────────────────────────────────────────

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground selection:bg-primary/30">
          <div className="w-full max-w-sm flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mb-2">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                Loading...
              </h1>
            </div>
          </div>
        </div>
      }
    >
      <OnboardingPageContent />
    </Suspense>
  );
}

