'use client';

import { useState, useEffect } from 'react';
import { Booking, MenuItem, ExtraItem, FulfillmentType, Coupon } from '@/types';
import { SADYA_MENU_ITEMS, SAMPLE_BOOKINGS, VALID_COUPONS } from './constants';
import { generateBookingNumber } from './utils';

const STORAGE_KEY_BOOKINGS = 'kerala_kitchen_bookings';
const STORAGE_KEY_CART = 'kerala_kitchen_active_draft';

export interface BookingDraft {
  date: string;
  timeSlot: string;
  fulfillment: FulfillmentType;
  selectedSadyaId: string;
  adultsCount: number;
  childrenCount: number;
  extras: { [extraId: string]: number };
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  customerLandmark: string;
  customerPincode: string;
  couponCode: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet' | 'cash';
}

const DEFAULT_DRAFT: BookingDraft = {
  date: '2026-09-04',
  timeSlot: '12:00 PM',
  fulfillment: 'delivery',
  selectedSadyaId: 'sadya-regular',
  adultsCount: 1,
  childrenCount: 0,
  extras: {},
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  customerAddress: '',
  customerLandmark: '',
  customerPincode: '682031',
  couponCode: '',
  paymentMethod: 'upi',
};

export function useBookingStore() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [draft, setDraft] = useState<BookingDraft>(DEFAULT_DRAFT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedBookings = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      } else {
        setBookings(SAMPLE_BOOKINGS);
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(SAMPLE_BOOKINGS));
      }

      const storedDraft = localStorage.getItem(STORAGE_KEY_CART);
      if (storedDraft) {
        setDraft(JSON.parse(storedDraft));
      }
    } catch (e) {
      console.error('Failed to load stored data', e);
    } finally {
      setIsLoaded(true);
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

  const createBookingFromDraft = (): Booking => {
    const sadya = SADYA_MENU_ITEMS.find((item) => item.id === draft.selectedSadyaId) || SADYA_MENU_ITEMS[0];
    
    // Calculate extras
    const extrasList: ExtraItem[] = [];
    let extrasTotal = 0;
    
    const extraPrices: Record<string, { name: string; price: number }> = {
      'ext-palada-1l': { name: 'Palada Pradhaman Payasam (1 Liter)', price: 299 },
      'ext-ada-1l': { name: 'Ada Pradhaman Payasam (1 Liter)', price: 289 },
      'ext-chakka-1l': { name: 'Chakka Payasam (1 Liter)', price: 310 },
      'ext-chips-500g': { name: 'Nenthra Kaaya Chips (500g)', price: 240 },
      'ext-sharkara-500g': { name: 'Sharkara Varatti (500g)', price: 260 },
      'ext-boli-5': { name: 'Trivandrum Boli (Pack of 5)', price: 150 },
      'ext-injipuli-250g': { name: 'Nadan Inji Puli Jar (250g)', price: 120 },
      'ext-pappadam-pkt': { name: 'Extra Pappadam Packet (10 Pcs)', price: 40 },
    };

    Object.entries(draft.extras).forEach(([id, qty]) => {
      if (qty > 0 && extraPrices[id]) {
        const item = extraPrices[id];
        extrasList.push({
          id,
          name: item.name,
          price: item.price,
          quantity: qty,
        });
        extrasTotal += item.price * qty;
      }
    });

    const baseAmount = sadya.price * (draft.adultsCount + draft.childrenCount * 0.6);
    const subtotal = Math.round(baseAmount + extrasTotal);

    // Coupon check
    let discount = 0;
    let couponApplied: Coupon | undefined = undefined;
    if (draft.couponCode) {
      const foundCoupon = VALID_COUPONS.find(c => c.code.toUpperCase() === draft.couponCode.trim().toUpperCase());
      if (foundCoupon && subtotal >= foundCoupon.minOrderValue) {
        couponApplied = foundCoupon;
        if (foundCoupon.discountType === 'percentage') {
          discount = Math.round((subtotal * foundCoupon.discountValue) / 100);
        } else {
          discount = foundCoupon.discountValue;
        }
      }
    }

    const deliveryCharge = draft.fulfillment === 'delivery' ? 50 : 0;
    const totalAmount = Math.max(0, subtotal - discount + deliveryCharge);

    const bookingNum = generateBookingNumber();

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingNumber: bookingNum,
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
      },
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

    return newBooking;
  };

  const updateOrderStatus = (bookingId: string, status: Booking['orderStatus']) => {
    const updated = bookings.map((b) => (b.id === bookingId ? { ...b, orderStatus: status } : b));
    setBookings(updated);
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update status', e);
    }
  };

  return {
    bookings,
    draft,
    isLoaded,
    updateDraft,
    createBookingFromDraft,
    updateOrderStatus,
  };
}
