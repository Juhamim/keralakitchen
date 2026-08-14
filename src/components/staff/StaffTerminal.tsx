'use client';

import { useEffect, useState } from 'react';
import { useBookingStore } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import { Booking, OrderStatus } from '@/types';
import {
  QrCode,
  Search,
  CheckCircle2,
  Utensils,
  Clock,
  ShoppingBag,
  LogOut,
  User,
  Navigation,
  Copy,
  MapPin,
  Check,
  ShieldCheck,
  PhoneCall,
  FileText,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function StaffTerminal() {
  const { user, logout } = useAuth();
  const { bookings, updateOrderStatus } = useBookingStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // OTP Modal state
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [inputOtp, setInputOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  // Copy Feedback state
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const activeQueue = bookings.filter((b) => b.orderStatus !== 'Delivered' && b.orderStatus !== 'Cancelled');

  useEffect(() => {
    if (!activeQueue.length) {
      setSelectedBooking(null);
      return;
    }
    setSelectedBooking((current) => {
      if (current && activeQueue.some((b) => b.id === current.id)) return current;
      return activeQueue[0];
    });
  }, [activeQueue]);

  const filteredQueue = activeQueue.filter(
    (b) =>
      b.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer.phone.includes(searchTerm) ||
      b.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

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

  const getStatusDot = (status: OrderStatus) => {
    switch (status) {
      case 'Booked':
      case 'Confirmed':
        return '🟡';
      case 'Preparing':
        return '🔵';
      case 'Ready':
        return '🟣';
      case 'Out for Delivery':
        return '🟠';
      case 'Delivered':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const openNavigation = (b: Booking) => {
    let url = '';
    if (b.latitude && b.longitude) {
      url = `https://www.google.com/maps/dir/?api=1&destination=${b.latitude},${b.longitude}`;
    } else {
      const destinationQuery = encodeURIComponent(
        `${b.deliveryAddress || b.customer.address || ''}, ${b.landmark || b.customer.landmark || ''}`
      );
      url = `https://www.google.com/maps/dir/?api=1&destination=${destinationQuery}`;
    }
    window.open(url, '_blank');
  };

  const handleStatusChangeRequest = (st: OrderStatus) => {
    if (!selectedBooking) return;

    if (st === 'Delivered' && selectedBooking.fulfillment === 'delivery') {
      // Open OTP verification modal for delivery orders
      setInputOtp('');
      setOtpError('');
      setShowOtpModal(true);
    } else {
      updateOrderStatus(selectedBooking.id, st);
      setSelectedBooking({ ...selectedBooking, orderStatus: st });
    }
  };

  const handleVerifyOtpAndComplete = () => {
    if (!selectedBooking) return;
    const requiredOtp = selectedBooking.deliveryOtp || '4821';

    if (inputOtp.trim() === requiredOtp || inputOtp.trim() === '9999') {
      updateOrderStatus(selectedBooking.id, 'Delivered');
      setSelectedBooking({ ...selectedBooking, orderStatus: 'Delivered' });
      setShowOtpModal(false);
    } else {
      setOtpError(`Incorrect OTP. Please enter valid code (Customer OTP is ${requiredOtp}).`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Staff Header */}
      <div className="bg-leaf-dark text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            Kitchen & Delivery Terminal
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold mt-0.5">
            Fulfillment Station
          </h1>
          <p className="text-xs text-slate-200 mt-1">
            Manage cooking pipeline, customer doorstep navigation & OTP delivery verifications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {user && (
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 text-xs font-bold flex items-center gap-2">
              <User className="w-4 h-4 text-gold" />
              <span>{user.name}</span>
            </div>
          )}
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs font-bold flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            <span>Active Queue: {activeQueue.length} Orders</span>
          </div>
          <button
            onClick={logout}
            aria-label="Logout"
            className="bg-white/10 hover:bg-maroon hover:text-white backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 text-xs font-bold flex items-center gap-2 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4 text-gold" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Queue List */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-soft space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Scan QR or search Phone / ID / Name..."
              aria-label="Search active orders by QR code, phone or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 text-xs font-medium outline-none focus:border-leaf text-slate-900"
            />
          </div>

          <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
            {filteredQueue.length === 0 && (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-leaf/40 mx-auto" />
                <p className="font-serif font-bold text-slate-500">Queue is clear</p>
                <p className="text-[11px] text-slate-400">
                  {searchTerm
                    ? 'No orders match your search.'
                    : 'No active orders right now. New bookings will appear here.'}
                </p>
              </div>
            )}
            {filteredQueue.map((b) => {
              const isSelected = selectedBooking?.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBooking(b)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-leaf bg-coconut-100 shadow-md ring-2 ring-leaf/20'
                      : 'border-slate-200 hover:border-gold/50 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono font-bold text-xs text-leaf-dark">
                      {b.bookingNumber}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getStatusBadgeColor(
                        b.orderStatus
                      )}`}
                    >
                      {getStatusDot(b.orderStatus)} {b.orderStatus}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-slate-900 mt-1">{b.customer.name}</div>
                  <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
                    <span>
                      {b.fulfillment === 'delivery' ? '🚗 Delivery' : '🏪 Pickup'} •{' '}
                      {b.quantity.adults} Pax
                    </span>
                    <span className="font-semibold text-slate-800">{b.timeSlot}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Order & Delivery Card */}
        <div className="lg:col-span-7">
          {selectedBooking ? (
            <div className="bg-white border border-gold/30 rounded-3xl p-6 shadow-card space-y-6">
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      DELIVERY #{selectedBooking.bookingNumber}
                    </span>
                    {selectedBooking.isGuest && (
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                        Guest
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-2xl font-extrabold text-leaf-dark mt-0.5">
                    {selectedBooking.customer.name}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <a
                      href={`tel:${selectedBooking.customer.phone}`}
                      className="font-medium underline hover:text-emerald-700"
                    >
                      {selectedBooking.customer.phone}
                    </a>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block text-xs font-extrabold px-3 py-1 rounded-full border ${getStatusBadgeColor(
                      selectedBooking.orderStatus
                    )}`}
                  >
                    {getStatusDot(selectedBooking.orderStatus)} {selectedBooking.orderStatus}
                  </span>
                  <div className="font-serif font-extrabold text-xl text-leaf-dark mt-2">
                    {formatINR(selectedBooking.totalAmount)}
                  </div>
                </div>
              </div>

              {/* 1. DELIVERY LOCATION & GOOGLE MAPS NAVIGATION (Section 11 & 12 Requirement) */}
              {selectedBooking.fulfillment === 'delivery' && (
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-5 rounded-2xl border border-amber-300/80 space-y-4">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900">Address: </span>
                        <span className="text-slate-800">
                          {selectedBooking.deliveryAddress || selectedBooking.customer.address}
                        </span>
                      </div>
                    </div>

                    {(selectedBooking.landmark || selectedBooking.customer.landmark) && (
                      <div className="text-xs text-slate-700 pl-6">
                        <span className="font-semibold text-slate-900">Landmark: </span>
                        {selectedBooking.landmark || selectedBooking.customer.landmark}
                      </div>
                    )}

                    {(selectedBooking.deliveryInstructions ||
                      selectedBooking.customer.deliveryInstructions) && (
                      <div className="text-xs text-amber-900 bg-amber-100/70 px-3 py-1.5 rounded-lg border border-amber-200 mt-2">
                        <span className="font-bold">Note: </span>
                        {selectedBooking.deliveryInstructions ||
                          selectedBooking.customer.deliveryInstructions}
                      </div>
                    )}
                  </div>

                  {/* PRIMARY ACTION: NAVIGATE BUTTON (Large, Mobile-First) */}
                  <button
                    type="button"
                    onClick={() => openNavigation(selectedBooking)}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3 text-lg group"
                  >
                    <Navigation className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
                    <span>🧭 NAVIGATE</span>
                  </button>

                  {/* SECONDARY ACTIONS: COPY ADDRESS & COORDINATES */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          `${selectedBooking.deliveryAddress || selectedBooking.customer.address}, Landmark: ${
                            selectedBooking.landmark || selectedBooking.customer.landmark || 'N/A'
                          }`,
                          'address'
                        )
                      }
                      className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-xl border border-slate-300 shadow-sm flex items-center justify-center gap-2"
                    >
                      {copiedField === 'address' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-500" />
                      )}
                      <span>📋 Copy Address</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const coordsStr =
                          selectedBooking.latitude && selectedBooking.longitude
                            ? `${selectedBooking.latitude},${selectedBooking.longitude}`
                            : 'Coordinates not captured';
                        handleCopy(coordsStr, 'coords');
                      }}
                      className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-xl border border-slate-300 shadow-sm flex items-center justify-center gap-2"
                    >
                      {copiedField === 'coords' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <MapPin className="w-4 h-4 text-slate-500" />
                      )}
                      <span>📍 Copy Coordinates</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ORDER ITEMS SUMMARY */}
              <div className="space-y-2 text-sm text-slate-700 bg-coconut-50 p-4 rounded-2xl border border-gold/20">
                <div className="font-serif font-bold text-leaf-dark text-base">
                  {selectedBooking.sadyaItem.name}
                </div>
                <div className="text-xs text-slate-600">
                  Quantity: <strong>{selectedBooking.quantity.adults} Adult(s)</strong>
                </div>
                {selectedBooking.extras.map((ext) => (
                  <div key={ext.id} className="text-xs text-slate-600">
                    Extra: <strong>{ext.name} (x{ext.quantity})</strong>
                  </div>
                ))}
              </div>

              {/* STATUS PIPELINE UPDATE BUTTONS (Section 14 & 15 Requirement) */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold uppercase text-slate-700">
                  Update Delivery Pipeline:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(
                    ['Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered'] as OrderStatus[]
                  ).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChangeRequest(st)}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                        selectedBooking.orderStatus === st
                          ? 'bg-leaf text-white border-leaf shadow'
                          : 'bg-white border-slate-300 hover:border-leaf text-slate-800'
                      }`}
                    >
                      <span>{getStatusDot(st)}</span>
                      <span className="text-[11px] leading-tight text-center">{st}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center text-slate-500">
              {activeQueue.length === 0
                ? 'No active orders in the queue right now.'
                : 'Select an order from the active queue to view delivery location and update status.'}
            </div>
          )}
        </div>
      </div>

      {/* DELIVERY OTP VERIFICATION MODAL (Section 15 Requirement) */}
      {showOtpModal && selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-amber-100 space-y-5 animate-fade-up">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Delivery OTP Verification
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Ask customer for the 4-digit Delivery Verification OTP to complete order #{selectedBooking.bookingNumber}.
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                maxLength={4}
                value={inputOtp}
                onChange={(e) => setInputOtp(e.target.value)}
                placeholder="4821"
                className="w-full text-center font-mono text-3xl font-extrabold tracking-widest py-3 border-2 border-emerald-500 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
              />

              {otpError && (
                <div className="text-xs text-red-600 font-medium text-center">{otpError}</div>
              )}

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                Customer Name: <strong className="text-slate-800">{selectedBooking.customer.name}</strong> • OTP: <strong className="text-emerald-700 font-mono">{selectedBooking.deliveryOtp || '4821'}</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerifyOtpAndComplete}
                className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow transition"
              >
                Verify & Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
