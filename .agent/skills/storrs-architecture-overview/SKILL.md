---
description: Comprehensive guide to the Storrs platform architecture, explaining the roles of the mobile app, web app, and edge functions, and why these technical decisions were made.
---

# Storrs Architecture Overview

## What is Storrs?

Storrs is a startup dedicated to **"Helping businesses build trust with customers and sell more on WhatsApp."** It provides merchants with a centralized system to manage their catalog, orders, marketing, and customer interactions directly tied to their WhatsApp Business presence.

## The Tri-Partite Architecture

The Storrs platform is divided into three distinct codebases, each serving a highly specific purpose tailored to the user's context and technical requirements.

### 1. `storrs_business` (Flutter Mobile App)

- **Role**: The primary control center for the merchant and their staff.
- **Why Mobile?**: Merchants are constantly on the move. A mobile app provides the immediacy required to respond to orders, update catalog items, and track sales without needing to sit at a desk.
- **Core Tech Stack**:
  - **Flutter**: For cross-platform (iOS/Android) unified UI development.
  - **Riverpod**: Robust, compile-safe state management.
  - **Supabase Flutter**: Direct, real-time connection to the backend database and authentication.
  - **GoRouter**: Declarative routing.
- **Key Modules (`lib/ui`)**:
  - `auth`: User authentication.
  - `business_onboarding`: In-app steps for profile setup.
  - `catalog`, `orders`, `sales`, `marketing`: The core operational tools for the merchant.
- **Domain Entities**: Includes `BusinessEntity` (tracking trade type, industry, WhatsApp number, onboarding state), `StaffEntity`, and `UserProfileEntity`.

### 2. `storrs-web` (Next.js Web App)

- **Role**: The centralized hub for complex onboarding and public-facing documents.
- **Why Web?**: Setting up a Meta Business Portfolio and linking the WhatsApp Business API involves complex, multi-step authentications with Facebook. This process is significantly easier and less error-prone on a desktop web browser than within a mobile webview. Therefore, the web app handles the "onboarding-prerequisites" and initial heavy-lifting. It also serves static, SEO-friendly pages like Privacy Policies and Terms of Service.
- **Core Tech Stack**:
  - **Next.js (App Router)**: Fast, React-based web framework with server components.
  - **Tailwind CSS & shadcn/ui**: Rapid, consistent, and accessible UI component styling.
  - **Supabase SSR**: Secure, cookie-based authentication across client and server.

### 3. `edge-functions` (Supabase Serverless Backend)

- **Role**: The secure, scalable backend middleware.
- **Why Edge Functions?**: A platform integrated with WhatsApp heavily relies on Real-time Webhooks from Meta. Supabase Edge Functions provide a low-latency, auto-scaling environment to receive these webhooks, process messages, and securely interact with the Postgres database without the overhead of maintaining a traditional Node.js/Python server.
- **Core Tech Stack**:
  - **Deno & TypeScript**: Secure, modern JavaScript runtime.

## Architectural Decisions Summary

- **Separation of Concerns**: Mobile for daily operations, Web for complex setups/legal, Edge for secure third-party integrations (webhooks).
- **Supabase as the single source of truth**: All three clients/environments connect to the same Supabase Postgres instance, leveraging Row Level Security (RLS) and real-time capabilities to keep the merchant's mobile app instantly updated when a webhook triggers a database change via an edge function.

