-- =====================================================================
-- KERALA KITCHEN ONAM SADYA DATABASE SCHEMA & RLS POLICIES
-- PostgreSQL schema for Supabase Auth, Guest Bookings, Location & Delivery
-- =====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CUSTOMER PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. BOOKINGS / ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  booking_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_guest BOOLEAN NOT NULL DEFAULT TRUE,
  guest_name TEXT,
  guest_phone TEXT,
  guest_email TEXT,
  
  -- Sadya & Items
  fulfillment TEXT NOT NULL CHECK (fulfillment IN ('pickup', 'delivery')),
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  sadya_item_id TEXT NOT NULL,
  adults_count INTEGER NOT NULL DEFAULT 1,
  children_count INTEGER NOT NULL DEFAULT 0,
  extras_json JSONB DEFAULT '[]'::jsonb,
  
  -- Delivery & Location details
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  location_accuracy DOUBLE PRECISION,
  delivery_address TEXT,
  landmark TEXT,
  pincode TEXT,
  delivery_instructions TEXT,
  delivery_otp VARCHAR(6),

  -- Financials & Status
  subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
  discount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  delivery_charge NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  coupon_code TEXT,
  payment_method TEXT NOT NULL DEFAULT 'upi',
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  order_status TEXT NOT NULL DEFAULT 'Booked' CHECK (order_status IN ('Booked', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled')),
  
  qr_code_url TEXT,
  token_number TEXT,
  estimated_wait_minutes INTEGER,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SAVED ADDRESSES TABLE (For Authenticated Customers)
CREATE TABLE IF NOT EXISTS public.saved_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  label TEXT NOT NULL CHECK (label IN ('Home', 'Work', 'Other')),
  address TEXT NOT NULL,
  landmark TEXT,
  pincode TEXT,
  delivery_instructions TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_number ON public.bookings(booking_number);
CREATE INDEX IF NOT EXISTS idx_bookings_guest_phone ON public.bookings(guest_phone);
CREATE INDEX IF NOT EXISTS idx_bookings_order_status ON public.bookings(order_status);
CREATE INDEX IF NOT EXISTS idx_saved_addresses_user_id ON public.saved_addresses(user_id);

-- 6. AUTOMATIC TRIGGER FOR PROFILES CREATION ON OAUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, auth_user_id, full_name, email, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Customer'),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url',
    'customer'
  )
  ON CONFLICT (id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      avatar_url = EXCLUDED.avatar_url,
      updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_addresses ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by owner"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'staff')
  ));

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Saved Addresses Policies
CREATE POLICY "Users can view their own saved addresses"
  ON public.saved_addresses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved addresses"
  ON public.saved_addresses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved addresses"
  ON public.saved_addresses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved addresses"
  ON public.saved_addresses FOR DELETE
  USING (auth.uid() = user_id);

-- Bookings Policies
-- Authenticated Users can view their own bookings
CREATE POLICY "Authenticated users can view their bookings"
  ON public.bookings FOR SELECT
  USING (
    auth.uid() = user_id 
    OR is_guest = TRUE 
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );

-- Anyone (Guest or Auth) can insert a new booking
CREATE POLICY "Anyone can insert a booking"
  ON public.bookings FOR INSERT
  WITH CHECK (TRUE);

-- Authenticated Users can update their own booking; Staff/Admins can update any booking
CREATE POLICY "Users or Staff can update bookings"
  ON public.bookings FOR UPDATE
  USING (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'staff'))
  );
