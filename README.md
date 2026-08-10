# Kerala Kitchen | Onam Sadya Pre-Booking Web Application 🌺🍃

A modern, production-ready full-stack web application designed for Kerala Kitchen to accept, manage, and fulfill **Onam Sadya pre-bookings** online.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and PDF Invoice generation, featuring an authentic, bright Kerala visual design system (Coconut White `#FFFDF8`, Temple Gold `#D4AF37`, Kerala Leaf Green `#2E7D32`, and Playfair Display serif typography).

---

## 🌟 Key Features

### Customer Experience
- 🌺 **Hero Banner & Live Onam Countdown**: Interactive countdown timer calculating days, hours, minutes, and seconds until Thiruvonam Onam.
- 🍃 **26-Item Sadya Menu Catalog**: Detailed cards showcasing pure vegetarian Sadya items, Payasam add-ons (Palada, Ada Pradhaman, Chakka), banana chips, and Inji Puli.
- 🛒 **8-Step Multi-Step Booking Engine**:
  1. **Date Selection**: Choose festival dates (Uthradam Eve, Uthradam, Thiruvonam Peak, Avittom, Chatayam).
  2. **Fulfillment Mode & Slot Control**: Doorstep delivery vs. Hotel counter pickup with capacity control (10 AM to 2 PM).
  3. **Pax & Quantity Calculator**: Adult vs. Child meal counts.
  4. **Payasam & Extras Selector**: Custom quantities for Palada Payasam, extra pappadam, boli, and chips.
  5. **Customer Details & Validation**: Real-time 6-digit Kerala PIN code validation (`67xxxx`, `68xxxx`, `69xxxx`).
  6. **Coupon Engine**: Redeem discount promo codes (`ONAM2026`, `EARLYBIRD`, `BULKSADYA`).
  7. **Payment Options**: Integrated Razorpay (UPI, Google Pay, Cards, NetBanking), Pay at Hotel, or Cash on Delivery.
  8. **Instant Order Confirmation**: Dynamic QR Code generation for counter verification, queue token (`PK-42`), and one-click PDF invoice generation.
- 📱 **Real-time Order Status Tracker**: Live visual timeline tracking order progression: `Booked` ➔ `Confirmed` ➔ `Preparing` ➔ `Ready` ➔ `Delivered`.
- 🖼️ **Pookalam & Food Photo Gallery**: Interactive lightbox photo showcase.
- ⭐ **Customer Reviews & Rating Engine**: Real customer testimonials and star rating submission form.
- 📱 **Progressive Web App (PWA)**: Mobile installable Web App manifest.

### Admin & Kitchen Staff Features
- 📊 **Admin Dashboard (`/admin`)**:
  - Live revenue analytics, total bookings count, pending kitchen queue, and completed orders count.
  - Interactive Orders Table with search, status filters, status changers, and single-click PDF invoice downloads.
  - One-click **Export Sales CSV** feature for financial reporting.
  - Menu price editor, slot capacity controller, and coupon promo manager.
- 👨‍🍳 **Staff Fulfillment Terminal (`/staff`)**:
  - Simplified touch screen interface for counter & kitchen staff to quickly search by phone/QR code and advance order status.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion.
- **Form Validation**: React Hook Form, Zod.
- **Database & Storage**: PostgreSQL (Supabase schema integration) + LocalStorage draft engine.
- **Payments**: Razorpay SDK Gateway hooks + UPI Direct Link + Cash on Delivery.
- **PDF Generation**: `jspdf` custom invoice generator.
- **PWA**: Web App Manifest & Service Worker setup.

---

## 🚀 Getting Started

### 1. Installation

```bash
# Install dependencies
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production

```bash
npm run build
npm run start
```

---

## 🔑 Environment Variables Setup (`.env.local`)

To integrate live Supabase DB and Razorpay payments, create a `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Razorpay Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## 📱 Mobile PWA Support
The application is pre-configured with a Web App Manifest (`public/manifest.json`). Users on iOS or Android devices can tap **"Add to Home Screen"** to launch the booking portal directly like a native app.
