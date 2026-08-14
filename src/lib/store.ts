'use client';

import { useState, useEffect } from 'react';
import { Booking, MenuItem, ExtraItem, FulfillmentType, Coupon, SavedAddress, AuthUser } from '@/types';
import { SADYA_MENU_ITEMS, SAMPLE_BOOKINGS, EXTRAS_MENU, VALID_COUPONS } from './constants';
import { generateBookingNumber } from './utils';
import { supabase, isSupabaseConfigured } from './supabase/client';

const STORAGE_KEY_BOOKINGS = 'kerala_kitchen_bookings';
const STORAGE_KEY_CART = 'kerala_kitchen_active_draft';
const STORAGE_KEY_SAVED_ADDRESSES = 'kerala_kitchen_saved_addresses';
const STORAGE_KEY_AUTH = 'kerala_kitchen_auth_session';

export interface BookingDraft {
  date: string;
  timeSlot: string;
  fulfillment: FulfillmentType;
  selectedSadyaId: string;
  adultsCount: number;
  childrenCount: number;
  extras: { [extraId: string]: number };
  
  // Customer Details
  isGuest: boolean;
  userId?: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  
  // Location & Address
  customerAddress: string;
  customerLandmark: string;
  customerPincode: string;
  deliveryInstructions: string;
  latitude: number | null;
  longitude: number | null;
  locationAccuracy: number | null;
  
  // Payment
  couponCode: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet' | 'cash';
}

const DEFAULT_DRAFT: BookingDraft = {
  date: '2026-08-26',
  timeSlot: '12:00 PM',
  fulfillment: 'delivery',
  selectedSadyaId: 'sadya-regular',
  adultsCount: 1,
  childrenCount: 0,
  extras: {},
  isGuest: true,
  userId: null,
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  customerAddress: '',
  customerLandmark: '',
  customerPincode: '673602',
  deliveryInstructions: '',
  latitude: null,
  longitude: null,
  locationAccuracy: null,
  couponCode: '',
  paymentMethod: 'upi',
};

const DEFAULT_SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-home-1',
    userId: 'user-demo-1',
    label: 'Home',
    address: 'House 23, Valiyaparamba, Calicut',
    landmark: 'Near Main Junction',
    pincode: '673602',
    deliveryInstructions: 'Call before arriving',
    latitude: 11.2588,
    longitude: 75.7804,
    isDefault: true,
  },
  {
    id: 'addr-work-2',
    userId: 'user-demo-1',
    label: 'Work',
    address: 'Cyberpark, Nellikode, Kozhikode',
    landmark: 'Building A, 3rd Floor',
    pincode: '673016',
    deliveryInstructions: 'Deliver to reception desk',
    latitude: 11.2721,
    longitude: 75.8364,
    isDefault: false,
  },
];

export function useBookingStore() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [draft, setDraft] = useState<BookingDraft>(DEFAULT_DRAFT);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      // Load Session
      const storedAuth = localStorage.getItem(STORAGE_KEY_AUTH);
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth) as AuthUser;
        setAuthUser(parsedAuth);
      }

      // Load Bookings
      const storedBookings = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (storedBookings) {
        const parsed = JSON.parse(storedBookings);
        setBookings(Array.isArray(parsed) ? parsed : SAMPLE_BOOKINGS);
      } else {
        setBookings(SAMPLE_BOOKINGS);
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(SAMPLE_BOOKINGS));
      }

      // Load Saved Addresses
      const storedAddresses = localStorage.getItem(STORAGE_KEY_SAVED_ADDRESSES);
      if (storedAddresses) {
        setSavedAddresses(JSON.parse(storedAddresses));
      } else {
        setSavedAddresses(DEFAULT_SAVED_ADDRESSES);
        localStorage.setItem(STORAGE_KEY_SAVED_ADDRESSES, JSON.stringify(DEFAULT_SAVED_ADDRESSES));
      }

      // Load Active Draft
      const storedDraft = localStorage.getItem(STORAGE_KEY_CART);
      if (storedDraft) {
        const parsed = JSON.parse(storedDraft);
        setDraft(parsed && typeof parsed === 'object' ? { ...DEFAULT_DRAFT, ...parsed } : DEFAULT_DRAFT);
      }
    } catch (e) {
      console.error('Failed to load stored data', e);
      setBookings(SAMPLE_BOOKINGS);
    } finally {
      setIsLoaded(true);
    }

    // Listen to Supabase Auth State changes if configured
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const userObj: AuthUser = {
            id: session.user.id,
            username: session.user.email?.split('@')[0] || 'customer',
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'Customer',
            email: session.user.email,
            role: 'customer',
            avatarUrl: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
            loggedInAt: new Date().toISOString(),
          };
          setAuthUser(userObj);
          localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(userObj));
          
          // Automatically update draft details for authenticated customer
          setDraft((prev) => ({
            ...prev,
            isGuest: false,
            userId: session.user.id,
            customerName: prev.customerName || userObj.name,
            customerEmail: prev.customerEmail || userObj.email || '',
          }));
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const userObj: AuthUser = {
            id: session.user.id,
            username: session.user.email?.split('@')[0] || 'customer',
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'Customer',
            email: session.user.email,
            role: 'customer',
            avatarUrl: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
            loggedInAt: new Date().toISOString(),
          };
          setAuthUser(userObj);
          localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(userObj));
          setDraft((prev) => ({
            ...prev,
            isGuest: false,
            userId: session.user.id,
            customerName: userObj.name,
            customerEmail: userObj.email || '',
          }));
        } else if (event === 'SIGNED_OUT') {
          setAuthUser(null);
          localStorage.removeItem(STORAGE_KEY_AUTH);
          setDraft((prev) => ({
            ...prev,
            isGuest: true,
            userId: null,
          }));
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const updateDraft = (fields: Partial<BookingDraft>) => {
    setDraft((prev) => {
      const updated = { ...prev, ...fields };
      try {
        localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save draft', e);
      }
      return updated;
    });
  };

  const selectSavedAddress = (address: SavedAddress) => {
    updateDraft({
      customerAddress: address.address,
      customerLandmark: address.landmark || '',
      customerPincode: address.pincode || '673602',
      deliveryInstructions: address.deliveryInstructions || '',
      latitude: address.latitude || null,
      longitude: address.longitude || null,
    });
  };

  const addSavedAddress = (newAddr: Omit<SavedAddress, 'id' | 'userId'>) => {
    const userId = authUser?.id || 'user-demo-1';
    const created: SavedAddress = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      userId,
      createdAt: new Date().toISOString(),
    };
    const updated = [created, ...savedAddresses];
    setSavedAddresses(updated);
    localStorage.setItem(STORAGE_KEY_SAVED_ADDRESSES, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase && authUser?.id) {
      supabase
        .from('saved_addresses')
        .insert([{
          user_id: authUser.id,
          label: newAddr.label,
          address: newAddr.address,
          landmark: newAddr.landmark,
          pincode: newAddr.pincode,
          delivery_instructions: newAddr.deliveryInstructions,
          latitude: newAddr.latitude,
          longitude: newAddr.longitude,
          is_default: newAddr.isDefault || false,
        }])
        .then(({ error }) => {
          if (error) console.error('Failed to insert saved address into Supabase:', error);
        });
    }

    return created;
  };

  const createBookingFromDraft = (): Booking => {
    const sadya = SADYA_MENU_ITEMS.find((item) => item.id === draft.selectedSadyaId) || SADYA_MENU_ITEMS[0];

    const extrasList: ExtraItem[] = [];
    let extrasTotal = 0;
    Object.entries(draft.extras).forEach(([id, qty]) => {
      if (qty > 0) {
        const item = EXTRAS_MENU.find((e) => e.id === id);
        if (item) {
          extrasList.push({ id, name: item.name, price: item.price, quantity: qty });
          extrasTotal += item.price * qty;
        }
      }
    });

    const adultPrice = sadya.price;
    const childPrice = Math.round(sadya.price * 0.6);
    const baseTotal = adultPrice * draft.adultsCount + childPrice * draft.childrenCount;
    const subtotal = Math.round(baseTotal + extrasTotal);

    let discount = 0;
    let couponApplied: Coupon | undefined = undefined;
    if (draft.couponCode) {
      const foundCoupon = VALID_COUPONS.find((c) => c.code.toUpperCase() === draft.couponCode.trim().toUpperCase());
      const notExpired = foundCoupon && new Date(foundCoupon.expiryDate).getTime() >= Date.now();
      if (foundCoupon && notExpired && subtotal >= foundCoupon.minOrderValue) {
        couponApplied = foundCoupon;
        discount =
          foundCoupon.discountType === 'percentage'
            ? Math.round((subtotal * foundCoupon.discountValue) / 100)
            : foundCoupon.discountValue;
      }
    }

    const deliveryCharge = draft.fulfillment === 'delivery' ? 50 : 0;
    const totalAmount = Math.max(0, subtotal - discount + deliveryCharge);
    const bookingNum = generateBookingNumber();

    // Generate a 4-digit Delivery OTP (e.g. 4821)
    const deliveryOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingNumber: bookingNum,
      userId: draft.isGuest ? null : (draft.userId || authUser?.id || null),
      isGuest: draft.isGuest,
      guestName: draft.isGuest ? draft.customerName : undefined,
      guestPhone: draft.isGuest ? draft.customerPhone : undefined,
      guestEmail: draft.isGuest ? draft.customerEmail : undefined,
      createdAt: new Date().toISOString(),
      date: draft.date,
      timeSlot: draft.timeSlot,
      fulfillment: draft.fulfillment,
      sadyaItem: sadya,
      quantity: {
        adults: draft.adultsCount,
        children: draft.childrenCount,
      },
      extras: extrasList,
      customer: {
        name: draft.customerName,
        phone: draft.customerPhone,
        email: draft.customerEmail,
        address: draft.customerAddress,
        landmark: draft.customerLandmark,
        pincode: draft.customerPincode,
        deliveryInstructions: draft.deliveryInstructions,
        latitude: draft.latitude,
        longitude: draft.longitude,
        locationAccuracy: draft.locationAccuracy,
      },
      latitude: draft.latitude,
      longitude: draft.longitude,
      locationAccuracy: draft.locationAccuracy,
      deliveryAddress: draft.customerAddress,
      landmark: draft.customerLandmark,
      deliveryInstructions: draft.deliveryInstructions,
      deliveryOtp,
      couponApplied,
      subtotal,
      discount,
      deliveryCharge,
      totalAmount,
      paymentMethod: draft.paymentMethod,
      paymentStatus: 'paid',
      orderStatus: 'Confirmed',
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${bookingNum}`,
      tokenNumber: draft.fulfillment === 'pickup' ? `PK-${Math.floor(10 + Math.random() * 90)}` : undefined,
      estimatedWaitMinutes: draft.fulfillment === 'pickup' ? 12 : undefined,
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updatedBookings));
    } catch (e) {
      console.error('Failed to update stored bookings', e);
    }

    // Sync to Supabase DB if enabled
    if (isSupabaseConfigured && supabase) {
      supabase
        .from('bookings')
        .insert([{
          id: newBooking.id,
          booking_number: newBooking.bookingNumber,
          user_id: newBooking.userId,
          is_guest: newBooking.isGuest,
          guest_name: newBooking.guestName,
          guest_phone: newBooking.guestPhone,
          guest_email: newBooking.guestEmail,
          fulfillment: newBooking.fulfillment,
          booking_date: newBooking.date,
          time_slot: newBooking.timeSlot,
          sadya_item_id: sadya.id,
          adults_count: draft.adultsCount,
          children_count: draft.childrenCount,
          extras_json: extrasList,
          latitude: draft.latitude,
          longitude: draft.longitude,
          location_accuracy: draft.locationAccuracy,
          delivery_address: draft.customerAddress,
          landmark: draft.customerLandmark,
          pincode: draft.customerPincode,
          delivery_instructions: draft.deliveryInstructions,
          delivery_otp: deliveryOtp,
          subtotal: subtotal,
          discount: discount,
          delivery_charge: deliveryCharge,
          total_amount: totalAmount,
          coupon_code: draft.couponCode || null,
          payment_method: draft.paymentMethod,
          payment_status: 'paid',
          order_status: 'Confirmed',
          qr_code_url: newBooking.qrCodeUrl,
          token_number: newBooking.tokenNumber,
        }])
        .then(({ error }) => {
          if (error) console.error('Failed to persist booking to Supabase:', error);
        });
    }

    return newBooking;
  };

  const linkGuestBookingToUser = async (bookingId: string, user: AuthUser) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, userId: user.id || 'user-demo-1', isGuest: false } : b
    );
    setBookings(updated);
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase && user.id) {
      await supabase
        .from('bookings')
        .update({ user_id: user.id, is_guest: false, updated_at: new Date().toISOString() })
        .eq('id', bookingId);
    }
  };

  const updateOrderStatus = (bookingId: string, status: Booking['orderStatus']) => {
    const updated = bookings.map((b) => (b.id === bookingId ? { ...b, orderStatus: status } : b));
    setBookings(updated);
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update status', e);
    }

    if (isSupabaseConfigured && supabase) {
      supabase
        .from('bookings')
        .update({ order_status: status, updated_at: new Date().toISOString() })
        .eq('id', bookingId)
        .then(({ error }) => {
          if (error) console.error('Failed to update status in Supabase', error);
        });
    }
  };

  return {
    bookings,
    draft,
    savedAddresses,
    authUser,
    isLoaded,
    updateDraft,
    selectSavedAddress,
    addSavedAddress,
    createBookingFromDraft,
    linkGuestBookingToUser,
    updateOrderStatus,
  };
}
