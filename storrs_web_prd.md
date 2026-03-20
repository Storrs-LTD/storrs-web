# PRD: storrs-web (Next.js Web App)

## Overview
`storrs-web` is the centralized web hub for the Storrs platform. It handles complex administrative tasks, onboarding prerequisites, and hosts public-facing legal documents.

## Target Audience
- **New Merchants**: Those in the process of setting up their Meta Business Portfolio.
- **Public Users**: Customers or partners looking for legal information (Privacy Policy, terms of service).

## Problem Statement
Linking a WhatsApp Business API involves complex, multi-step authentications with Facebook/Meta. These processes are error-prone on mobile webviews and require a desktop-class browser experience for reliability and ease of use.

## Key Features
- **Onboarding Prerequisites**: Complex setup for Meta Business Portfolio.
- **WhatsApp API Integration**: Linking the WhatsApp Business Account (WABA).
- **Legal & Compliance**: Hosting SEO-friendly Privacy Policy and Terms of Service.
- **Marketing Landing Pages**: Top-of-funnel pages to attract new merchants (future).

## Technical Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS & shadcn/ui
- **Auth/Database**: Supabase SSR
- **Monitoring**: Sentry

## Big Picture Integration
The web app is the **Onboarding & Compliance Layer**. By offloading the "heavy lifting" of Meta integration to the web, the mobile app remains lean and focused on daily operations. It shares the same Supabase backend as the mobile app, ensuring that once onboarding is complete on web, the merchant can immediately see their updated status on mobile.
