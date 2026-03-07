"use client";

import Script from "next/script";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
    StorrsApp?: {
      postMessage: (message: string) => void;
    };
  }
}

export default function OnboardingPage() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      // SDK initialization
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FB_APP_ID!, // your app ID goes here
        autoLogAppEvents: true,
        xfbml: true,
        version: process.env.NEXT_PUBLIC_FB_GRAPH_VERSION!, // Graph API version goes here
      });
    };

    // Session logging message event listener
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.endsWith("facebook.com")) return;
      try {
        const data = JSON.parse(event.data);
        if (data.type === "WA_EMBEDDED_SIGNUP") {
          console.log("message event: ", data); // remove after testing
          if (data.event === "CANCEL") {
            Sentry.captureMessage(
              "WhatsApp Embedded Signup Cancelled or Error",
              {
                extra: { embeddedSignupData: data.data },
              },
            );
          }
          window.StorrsApp?.postMessage(JSON.stringify(data));
        }
      } catch (error) {
        console.log("message event: ", event.data); // remove after testing
        Sentry.captureException(error, {
          extra: { rawEventData: event.data },
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Response callback
  const fbLoginCallback = (response: any) => {
    if (response.authResponse) {
      const code = response.authResponse.code;
      console.log("response: ", code); // remove after testing
      // your code goes here
    } else {
      console.log("response: ", response); // remove after testing
      // your code goes here
    }
  };

  // Launch method and callback registration
  const launchWhatsAppSignup = () => {
    window.FB.login(fbLoginCallback, {
      config_id: process.env.NEXT_PUBLIC_FB_CONFIG_ID!, // your configuration ID goes here
      response_type: "code",
      override_default_response_type: true,
      extras: {
        setup: {},
      },
    });
  };

  return (
    <>
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      />
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground selection:bg-primary/30">
        <div className="w-full max-w-sm flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
          {/* Storrs Icon */}
          <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mb-2 shadow-2xl">
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
            className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white transition-all duration-200 rounded-xl px-4 py-3.5 font-medium text-sm shadow-[0_0_20px_rgba(24,119,242,0.3)] hover:shadow-[0_0_25px_rgba(24,119,242,0.5)] active:scale-[0.98]"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Continue with Facebook
          </button>
        </div>
      </div>
    </>
  );
}

