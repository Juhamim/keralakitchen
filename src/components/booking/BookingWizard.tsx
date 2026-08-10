'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useBookingStore } from '@/lib/store';
import { SADYA_MENU_ITEMS, EXTRAS_MENU, AVAILABLE_SLOTS, ONAM_FESTIVAL_DATES, VALID_COUPONS } from '@/lib/constants';
import { formatINR, isValidKeralaPincode } from '@/lib/utils';
import { generateInvoicePDF } from '@/lib/pdf';
import { Booking } from '@/types';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  Minus,
  CheckCircle2,
  Tag,
  CreditCard,
  QrCode,
  Download,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Info
} from 'lucide-react';

import { FestivalFireIcon } from '@/components/common/SvgIcons';

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sadyaParam = searchParams.get('sadya');

  const { draft, updateDraft, createBookingFromDraft } = useBookingStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Default selected item from query or draft
  const activeSadya = SADYA_MENU_ITEMS.find((s) => s.id === (sadyaParam || draft.selectedSadyaId)) || SADYA_MENU_ITEMS[0];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 8));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Calculations
  const adultPrice = activeSadya.price;
  const childPrice = Math.round(activeSadya.price * 0.6);
  const baseTotal = adultPrice * draft.adultsCount + childPrice * draft.childrenCount;

  // Calculate extras total
  let extrasTotal = 0;
  EXTRAS_MENU.forEach((ext) => {
    const qty = draft.extras[ext.id] || 0;
    extrasTotal += ext.price * qty;
  });

  const subtotal = baseTotal + extrasTotal;

  // Coupon
  let discount = 0;
  const appliedCouponObj = VALID_COUPONS.find(c => c.code.toUpperCase() === draft.couponCode.toUpperCase());
  if (appliedCouponObj && subtotal >= appliedCouponObj.minOrderValue) {
    if (appliedCouponObj.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCouponObj.discountValue) / 100);
    } else {
      discount = appliedCouponObj.discountValue;
    }
  }

  const deliveryCharge = draft.fulfillment === 'delivery' ? 50 : 0;
  const finalTotal = Math.max(0, subtotal - discount + deliveryCharge);

  const handleApplyCoupon = (codeToApply: string) => {
    setCouponError('');
    setCouponSuccess('');
    const coupon = VALID_COUPONS.find((c) => c.code.toUpperCase() === codeToApply.trim().toUpperCase());
    if (!coupon) {
      setCouponError('Invalid coupon code. Try ONAM2026 or EARLYBIRD');
      return;
    }
    if (subtotal < coupon.minOrderValue) {
      setCouponError(`Minimum order value of ${formatINR(coupon.minOrderValue)} required for code ${coupon.code}`);
      return;
    }
    updateDraft({ couponCode: coupon.code });
    setCouponSuccess(`Coupon ${coupon.code} applied! Saved ${coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : formatINR(coupon.discountValue)}.`);
  };

  const handleExtraQtyChange = (extraId: string, delta: number) => {
    const current = draft.extras[extraId] || 0;
    const nextQty = Math.max(0, current + delta);
    updateDraft({
      extras: {
        ...draft.extras,
        [extraId]: nextQty,
      },
    });
  };

  const handleFinalPayment = async () => {
    if (!draft.customerName || !draft.customerPhone || !draft.customerEmail) {
      alert('Please fill in your Name, Phone Number, and Email before proceeding.');
      setCurrentStep(5);
      return;
    }
    if (draft.fulfillment === 'delivery' && (!draft.customerAddress || !draft.customerPincode)) {
      alert('Please provide your complete Delivery Address and PIN code.');
      setCurrentStep(5);
      return;
    }

    setIsProcessing(true);

    // Simulate Payment Gateway delay
    setTimeout(() => {
      const booking = createBookingFromDraft();
      setConfirmedBooking(booking);
      setIsProcessing(false);
      setCurrentStep(8);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#2E7D32', '#F9A825', '#8E2430'],
        });
      } catch (e) {
        console.log(e);
      }
    }, 1500);
  };

  const steps = [
    { num: 1, label: 'Date' },
    { num: 2, label: 'Slot & Mode' },
    { num: 3, label: 'Quantities' },
    { num: 4, label: 'Extras' },
    { num: 5, label: 'Details' },
    { num: 6, label: 'Offers' },
    { num: 7, label: 'Payment' },
    { num: 8, label: 'Confirmed' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Wizard Header Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 overflow-x-auto pb-2 scrollbar-none">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => s.num < currentStep && currentStep !== 8 && setCurrentStep(s.num)}
              disabled={currentStep === 8 || s.num > currentStep}
              className={`flex flex-col items-center min-w-[64px] transition-colors ${
                s.num === currentStep
                  ? 'text-leaf-dark font-bold'
                  : s.num < currentStep
                  ? 'text-gold-deep font-semibold cursor-pointer'
                  : 'text-slate-400'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all mb-1 ${
                  s.num === currentStep
                    ? 'bg-leaf text-white shadow-md scale-110'
                    : s.num < currentStep
                    ? 'bg-gold text-slate-900'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {s.num < currentStep ? '✓' : s.num}
              </div>
              <span className="text-[11px] uppercase tracking-wider whitespace-nowrap">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-gold via-leaf to-leaf-dark h-full transition-all duration-300"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Container Card */}
      <div className="bg-white border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-card relative">
        {/* STEP 1: Date Selection */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-maroon">Step 1 of 7</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-leaf-dark">
                Choose Festival Date
              </h2>
              <p className="text-sm text-slate-600">Select your preferred date for Onam Sadya pre-booking.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ONAM_FESTIVAL_DATES.map((dateObj) => {
                const isSelected = draft.date === dateObj.date;
                return (
                  <div
                    key={dateObj.date}
                    onClick={() => updateDraft({ date: dateObj.date })}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-leaf bg-coconut-100 shadow-md scale-[1.02]'
                        : 'border-slate-200 hover:border-gold/50 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase">{dateObj.day}</span>
                      {dateObj.isPopular && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gold text-slate-900 flex items-center gap-1">
                          <FestivalFireIcon className="w-3 h-3 text-slate-900" />
                          <span>Main Festival</span>
                        </span>
                      )}
                    </div>
                    <div className="font-serif text-lg font-bold text-slate-900">{dateObj.label}</div>
                    <div className="text-xs font-semibold text-leaf mt-1">Available for Pre-Booking</div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={nextStep}
                className="bg-leaf hover:bg-leaf-dark text-white font-bold px-8 py-3.5 rounded-full shadow-md flex items-center gap-2"
              >
                <span>Continue to Fulfillment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Fulfillment & Time Slot */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-maroon">Step 2 of 7</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-leaf-dark">
                Pickup or Home Delivery
              </h2>
              <p className="text-sm text-slate-600">Select how you want to receive your Sadya and choose a time slot.</p>
            </div>

            {/* Fulfillment Mode Toggle */}
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => updateDraft({ fulfillment: 'delivery' })}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                  draft.fulfillment === 'delivery'
                    ? 'border-leaf bg-coconut-100 shadow-md'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <MapPin className="w-8 h-8 text-leaf mb-2" />
                <span className="font-serif font-bold text-slate-900 text-lg">Doorstep Delivery</span>
                <span className="text-xs text-slate-500 mt-1">Delivered in hot thermal box (+₹50)</span>
              </div>

              <div
                onClick={() => updateDraft({ fulfillment: 'pickup' })}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                  draft.fulfillment === 'pickup'
                    ? 'border-leaf bg-coconut-100 shadow-md'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <ShoppingBag className="w-8 h-8 text-gold-deep mb-2" />
                <span className="font-serif font-bold text-slate-900 text-lg">Hotel Counter Pickup</span>
                <span className="text-xs text-slate-500 mt-1">Zero delivery fee + Queue token</span>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-3">Select Time Slot:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AVAILABLE_SLOTS.map((slot) => {
                  const isSelected = draft.timeSlot === slot.time;
                  return (
                    <button
                      key={slot.time}
                      disabled={!slot.isAvailable}
                      onClick={() => updateDraft({ timeSlot: slot.time })}
                      className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                        isSelected
                          ? 'border-gold bg-gold-soft font-bold text-slate-900 shadow-sm'
                          : slot.isAvailable
                          ? 'border-slate-200 bg-white hover:border-gold'
                          : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5 font-serif font-bold text-sm">
                        <Clock className="w-3.5 h-3.5" />
                        {slot.time}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        {slot.maxOrders - slot.bookedCount} slots left
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={prevStep}
                className="text-slate-600 hover:text-slate-900 font-semibold px-6 py-3 rounded-full flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-leaf hover:bg-leaf-dark text-white font-bold px-8 py-3.5 rounded-full shadow-md flex items-center gap-2"
              >
                <span>Continue to Quantities</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Quantity & Pax */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-maroon">Step 3 of 7</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-leaf-dark">
                Selected Package & Pax Quantity
              </h2>
              <p className="text-sm text-slate-600">Adjust the number of Adult and Child Sadya meals needed.</p>
            </div>

            {/* Selected Package Banner */}
            <div className="p-4 bg-coconut-100 rounded-2xl border border-gold/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-maroon uppercase">Selected Sadya</span>
                <h4 className="font-serif font-bold text-lg text-slate-900">{activeSadya.name}</h4>
                <p className="text-xs text-slate-600">{activeSadya.itemCount} Delicacies Included</p>
              </div>
              <div className="text-right">
                <span className="font-serif font-extrabold text-xl text-leaf-dark">{formatINR(activeSadya.price)}</span>
                <span className="text-xs text-slate-500 block">/ Adult Pax</span>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">Adult Sadya Meals</h4>
                  <p className="text-xs text-slate-500">Full 26-item feast served with Payasam ({formatINR(adultPrice)} each)</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateDraft({ adultsCount: Math.max(1, draft.adultsCount - 1) })}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-serif text-xl font-bold text-slate-900 min-w-[24px] text-center">
                    {draft.adultsCount}
                  </span>
                  <button
                    onClick={() => updateDraft({ adultsCount: draft.adultsCount + 1 })}
                    className="w-9 h-9 rounded-full bg-leaf text-white hover:bg-leaf-dark flex items-center justify-center font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">Child Sadya Meals</h4>
                  <p className="text-xs text-slate-500">Kids portion size ({formatINR(childPrice)} each)</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateDraft({ childrenCount: Math.max(0, draft.childrenCount - 1) })}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-serif text-xl font-bold text-slate-900 min-w-[24px] text-center">
                    {draft.childrenCount}
                  </span>
                  <button
                    onClick={() => updateDraft({ childrenCount: draft.childrenCount + 1 })}
                    className="w-9 h-9 rounded-full bg-leaf text-white hover:bg-leaf-dark flex items-center justify-center font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={prevStep}
                className="text-slate-600 hover:text-slate-900 font-semibold px-6 py-3 rounded-full flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-leaf hover:bg-leaf-dark text-white font-bold px-8 py-3.5 rounded-full shadow-md flex items-center gap-2"
              >
                <span>Add Payasam & Extras</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Payasam & Extras */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-maroon">Step 4 of 7</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-leaf-dark">
                Add Extra Payasam & Savories
              </h2>
              <p className="text-sm text-slate-600">Want extra Palada Payasam, Banana Chips, or Inji Puli?</p>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {EXTRAS_MENU.map((extra) => {
                const qty = draft.extras[extra.id] || 0;
                return (
                  <div key={extra.id} className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{extra.name}</h4>
                      <span className="font-serif font-extrabold text-leaf text-sm">{formatINR(extra.price)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {qty > 0 && (
                        <button
                          onClick={() => handleExtraQtyChange(extra.id, -1)}
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <span className={`font-serif text-base font-bold min-w-[20px] text-center ${qty > 0 ? 'text-leaf-dark' : 'text-slate-400'}`}>
                        {qty}
                      </span>
                      <button
                        onClick={() => handleExtraQtyChange(extra.id, 1)}
                        className="w-8 h-8 rounded-full bg-gold text-slate-900 hover:bg-gold-warm flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={prevStep}
                className="text-slate-600 hover:text-slate-900 font-semibold px-6 py-3 rounded-full flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-leaf hover:bg-leaf-dark text-white font-bold px-8 py-3.5 rounded-full shadow-md flex items-center gap-2"
              >
                <span>Customer Contact Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Customer Details */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-maroon">Step 5 of 7</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-leaf-dark">
                Customer & Delivery Information
              </h2>
              <p className="text-sm text-slate-600">Enter contact details for booking confirmation and receipt.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Anjali Kurup"
                  value={draft.customerName}
                  onChange={(e) => updateDraft({ customerName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Mobile Phone (WhatsApp) *</label>
                <input
                  type="tel"
                  placeholder="+91 98470 XXXXX"
                  value={draft.customerPhone}
                  onChange={(e) => updateDraft({ customerPhone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none text-sm font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="anjali@example.com"
                  value={draft.customerEmail}
                  onChange={(e) => updateDraft({ customerEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none text-sm font-medium"
                />
              </div>

              {draft.fulfillment === 'delivery' && (
                <>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Complete Address *</label>
                    <textarea
                      rows={2}
                      placeholder="House No, Apartment, Street Name..."
                      value={draft.customerAddress}
                      onChange={(e) => updateDraft({ customerAddress: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Landmark</label>
                    <input
                      type="text"
                      placeholder="Near Temple / Metro Station"
                      value={draft.customerLandmark}
                      onChange={(e) => updateDraft({ customerLandmark: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-leaf focus:ring-2 focus:ring-leaf/20 outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Kerala PIN Code *</label>
                    <input
                      type="text"
                      placeholder="682031"
                      value={draft.customerPincode}
                      onChange={(e) => updateDraft({ customerPincode: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm font-medium ${
                        draft.customerPincode && !isValidKeralaPincode(draft.customerPincode)
                          ? 'border-red-500 bg-red-50 text-red-900'
                          : 'border-slate-300 focus:border-leaf'
                      }`}
                    />
                    {draft.customerPincode && !isValidKeralaPincode(draft.customerPincode) && (
                      <p className="text-[11px] text-red-600 mt-1">Please enter a valid 6-digit Kerala PIN code (starts with 67, 68, or 69)</p>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={prevStep}
                className="text-slate-600 hover:text-slate-900 font-semibold px-6 py-3 rounded-full flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-leaf hover:bg-leaf-dark text-white font-bold px-8 py-3.5 rounded-full shadow-md flex items-center gap-2"
              >
                <span>Apply Offers & Discounts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Coupon & Summary */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-maroon">Step 6 of 7</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-leaf-dark">
                Apply Promo Coupons
              </h2>
              <p className="text-sm text-slate-600">Save on your festival feast with exclusive Onam discount codes.</p>
            </div>

            {/* Coupon Box */}
            <div className="p-4 bg-coconut-100 rounded-2xl border border-gold/40 space-y-3">
              <label className="block text-xs font-bold uppercase text-slate-800">Enter Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ONAM2026"
                  value={draft.couponCode}
                  onChange={(e) => updateDraft({ couponCode: e.target.value.toUpperCase() })}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 uppercase font-mono font-bold text-sm outline-none focus:border-gold"
                />
                <button
                  onClick={() => handleApplyCoupon(draft.couponCode)}
                  className="bg-gold hover:bg-gold-warm text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm"
                >
                  Apply
                </button>
              </div>

              {couponError && <p className="text-xs text-red-600 font-medium">{couponError}</p>}
              {couponSuccess && <p className="text-xs text-emerald-700 font-semibold">{couponSuccess}</p>}

              {/* Sample Coupons Badges */}
              <div className="pt-2 flex flex-wrap gap-2">
                {VALID_COUPONS.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => handleApplyCoupon(c.code)}
                    className="text-xs bg-white border border-gold/30 hover:border-gold px-2.5 py-1 rounded-lg font-mono text-slate-700 flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3 text-gold" />
                    <span>{c.code} ({c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary Breakdown */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Sadya Base Total ({draft.adultsCount} Adult, {draft.childrenCount} Child):</span>
                <span className="font-semibold text-slate-900">{formatINR(baseTotal)}</span>
              </div>
              {extrasTotal > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Extras & Payasam Total:</span>
                  <span className="font-semibold text-slate-900">{formatINR(extrasTotal)}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount ({draft.couponCode}):</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              {draft.fulfillment === 'delivery' && (
                <div className="flex justify-between text-slate-600">
                  <span>Thermal Box Delivery Charge:</span>
                  <span className="font-semibold text-slate-900">{formatINR(50)}</span>
                </div>
              )}
              <div className="border-t border-slate-300 pt-3 flex justify-between items-center">
                <span className="font-serif font-bold text-lg text-slate-900">Total Payable Amount:</span>
                <span className="font-serif font-extrabold text-2xl text-leaf-dark">{formatINR(finalTotal)}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={prevStep}
                className="text-slate-600 hover:text-slate-900 font-semibold px-6 py-3 rounded-full flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-leaf hover:bg-leaf-dark text-white font-bold px-8 py-3.5 rounded-full shadow-md flex items-center gap-2"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: Payment Options */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-maroon">Step 7 of 7</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-leaf-dark">
                Choose Payment Method
              </h2>
              <p className="text-sm text-slate-600">Total to Pay: <strong className="text-leaf-dark font-serif text-lg">{formatINR(finalTotal)}</strong></p>
            </div>

            <div className="space-y-3">
              <div
                onClick={() => updateDraft({ paymentMethod: 'upi' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  draft.paymentMethod === 'upi' ? 'border-leaf bg-coconut-100 shadow-sm' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    UPI
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Instant UPI / Google Pay / PhonePe / Paytm</h4>
                    <p className="text-xs text-slate-500">Fast zero-fee digital payment</p>
                  </div>
                </div>
                <input type="radio" checked={draft.paymentMethod === 'upi'} readOnly className="accent-leaf" />
              </div>

              <div
                onClick={() => updateDraft({ paymentMethod: 'card' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  draft.paymentMethod === 'card' ? 'border-leaf bg-coconut-100 shadow-sm' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Credit / Debit Cards</h4>
                    <p className="text-xs text-slate-500">Visa, Mastercard, RuPay cards accepted</p>
                  </div>
                </div>
                <input type="radio" checked={draft.paymentMethod === 'card'} readOnly className="accent-leaf" />
              </div>

              <div
                onClick={() => updateDraft({ paymentMethod: 'cash' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  draft.paymentMethod === 'cash' ? 'border-leaf bg-coconut-100 shadow-sm' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                    CASH
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {draft.fulfillment === 'delivery' ? 'Cash on Delivery (COD)' : 'Pay Cash at Hotel Counter'}
                    </h4>
                    <p className="text-xs text-slate-500">Pay directly when receiving food</p>
                  </div>
                </div>
                <input type="radio" checked={draft.paymentMethod === 'cash'} readOnly className="accent-leaf" />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={prevStep}
                className="text-slate-600 hover:text-slate-900 font-semibold px-6 py-3 rounded-full flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleFinalPayment}
                disabled={isProcessing}
                className="bg-gradient-to-r from-gold via-gold-warm to-gold text-slate-900 font-extrabold px-9 py-4 rounded-full shadow-gold hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin text-slate-900" />
                    <span>Confirming Booking...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-slate-900" />
                    <span>Pay {formatINR(finalTotal)} & Confirm</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: Confirmation Screen */}
        {currentStep === 8 && confirmedBooking && (
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-500 py-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg border-2 border-emerald-400">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-maroon">Pre-Booking Successful</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-leaf-dark mt-1">
                Your Sadya Booking is Confirmed!
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                We have received your pre-booking for {confirmedBooking.date} ({confirmedBooking.timeSlot}).
              </p>
            </div>

            {/* QR Code & Booking Card */}
            <div className="max-w-md mx-auto bg-coconut-100 p-6 rounded-3xl border border-gold/40 shadow-soft text-left space-y-4">
              <div className="flex items-center justify-between border-b border-gold/20 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Booking ID</span>
                  <div className="font-mono text-lg font-extrabold text-leaf-dark">{confirmedBooking.bookingNumber}</div>
                </div>
                {confirmedBooking.tokenNumber && (
                  <div className="bg-gold text-slate-900 text-xs font-extrabold px-3 py-1.5 rounded-full">
                    Token: {confirmedBooking.tokenNumber}
                  </div>
                )}
              </div>

              {/* Dynamic QR Code */}
              <div className="flex flex-col items-center py-2">
                <img
                  src={confirmedBooking.qrCodeUrl}
                  alt="Order Verification QR Code"
                  className="w-36 h-36 border-2 border-white rounded-xl shadow-sm"
                />
                <span className="text-[11px] text-slate-500 mt-2 font-medium">Show QR Code at pickup / delivery for fast verification</span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 border-t border-gold/20 pt-3">
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <strong className="text-slate-900">{confirmedBooking.customer.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Fulfillment:</span>
                  <strong className="text-slate-900 uppercase">{confirmedBooking.fulfillment} ({confirmedBooking.timeSlot})</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount Paid:</span>
                  <strong className="text-leaf-dark font-serif text-sm">{formatINR(confirmedBooking.totalAmount)}</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => generateInvoicePDF(confirmedBooking)}
                className="w-full sm:w-auto bg-leaf hover:bg-leaf-dark text-white font-bold px-7 py-3.5 rounded-full shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5 text-gold-light" />
                <span>Download PDF Invoice</span>
              </button>

              <button
                onClick={() => router.push(`/track?id=${confirmedBooking.bookingNumber}`)}
                className="w-full sm:w-auto bg-white border-2 border-gold/40 hover:bg-coconut-100 text-slate-900 font-bold px-7 py-3.5 rounded-full shadow-sm flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5 text-gold" />
                <span>Track Order Live</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
