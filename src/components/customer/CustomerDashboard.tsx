'use client';

import { useState } from 'react';
import { useBookingStore } from '@/lib/store';
import { formatINR, formatDate } from '@/lib/utils';
import { Booking, OrderStatus } from '@/types';
import SavedAddressesManager from './SavedAddressesManager';
import { signOutUser } from '@/lib/supabase/client';
import {
  ShoppingBag,
  MapPin,
  User,
  LogOut,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export default function CustomerDashboard() {
  const { authUser, bookings, savedAddresses, selectSavedAddress, addSavedAddress } = useBookingStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  // Filter user's bookings (by userId or matching email)
  const myBookings = bookings.filter((b) => {
    if (authUser?.id && b.userId === authUser.id) return true;
    if (authUser?.email && b.customer.email?.toLowerCase() === authUser.email.toLowerCase()) return true;
    return false;
  });

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case 'Booked':
      case 'Confirmed':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Preparing':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Ready':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Out for Delivery':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* HEADER CARD */}
      <div className="bg-gradient-to-r from-leaf-dark to-leaf text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          {authUser?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={authUser.avatarUrl}
              alt={authUser.name}
              className="w-16 h-16 rounded-full border-2 border-gold shadow-md object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gold text-slate-900 font-extrabold text-2xl flex items-center justify-center shadow-md">
              {authUser?.name?.charAt(0) || 'C'}
            </div>
          )}
          <div>
            <div className="inline-flex items-center gap-1 bg-gold/20 text-gold px-3 py-0.5 rounded-full text-xs font-bold mb-1 border border-gold/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Customer
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold">
              Welcome back, {authUser?.name || 'Customer'}!
            </h1>
            <p className="text-xs text-slate-200 mt-1">{authUser?.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={async () => {
            await signOutUser();
            window.location.href = '/';
          }}
          className="bg-white/10 hover:bg-maroon text-white backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs font-bold flex items-center gap-2 transition"
        >
          <LogOut className="w-4 h-4 text-gold" />
          <span>Logout</span>
        </button>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 text-sm font-semibold gap-8">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition ${
            activeTab === 'orders'
              ? 'border-amber-600 text-amber-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>My Orders ({myBookings.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition ${
            activeTab === 'addresses'
              ? 'border-amber-600 text-amber-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses ({savedAddresses.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition ${
            activeTab === 'profile'
              ? 'border-amber-600 text-amber-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {myBookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-slate-700">No Orders Found</h3>
              <p className="text-xs text-slate-500">You haven&apos;t placed any Onam Sadya pre-bookings yet.</p>
              <a
                href="/book"
                className="inline-block mt-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow transition"
              >
                Book Your Onam Sadya
              </a>
            </div>
          ) : (
            myBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-3 gap-2">
                  <div>
                    <span className="font-mono text-sm font-bold text-leaf-dark">
                      Booking #{b.bookingNumber}
                    </span>
                    <span className="text-xs text-slate-500 ml-3">
                      Date: {b.date} • {b.timeSlot}
                    </span>
                  </div>
                  <span
                    className={`inline-block text-xs font-extrabold px-3 py-1 rounded-full border ${getStatusBadgeColor(
                      b.orderStatus
                    )}`}
                  >
                    {b.orderStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase">Sadya Package</span>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">{b.sadyaItem.name}</p>
                    <p className="text-slate-600 mt-1">
                      Pax: {b.quantity.adults} Adult(s), {b.quantity.children} Child(ren)
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold uppercase">Fulfillment & Location</span>
                    <p className="font-bold text-slate-800 text-sm mt-0.5 capitalize">
                      {b.fulfillment === 'delivery' ? '🚗 Doorstep Delivery' : '🏪 Counter Pickup'}
                    </p>
                    <p className="text-slate-600 mt-1 line-clamp-2">
                      {b.deliveryAddress || b.customer.address}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-slate-400 font-semibold uppercase">Total Paid</span>
                    <p className="font-serif font-extrabold text-xl text-leaf-dark mt-0.5">
                      {formatINR(b.totalAmount)}
                    </p>

                    {b.deliveryOtp && (
                      <div className="mt-2 inline-flex items-center gap-1 bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-xl text-xs font-bold">
                        <span>Delivery OTP:</span>
                        <span className="font-mono text-sm text-emerald-700">{b.deliveryOtp}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href={`/track?id=${b.bookingNumber}`}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                  >
                    <span>Track Live Status Timeline</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB CONTENT: ADDRESSES */}
      {activeTab === 'addresses' && (
        <SavedAddressesManager
          savedAddresses={savedAddresses}
          onSelectAddress={selectSavedAddress}
          onAddNewAddress={addSavedAddress}
        />
      )}

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 max-w-2xl">
          <h3 className="font-serif text-xl font-bold text-slate-900">Personal Information</h3>
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                disabled
                value={authUser?.name || ''}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 text-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={authUser?.email || ''}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 text-slate-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
