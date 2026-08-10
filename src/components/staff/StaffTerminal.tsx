'use client';

import { useState } from 'react';
import { useBookingStore } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import { Booking, OrderStatus } from '@/types';
import { QrCode, Search, CheckCircle2, Utensils, Clock, ShoppingBag } from 'lucide-react';

export default function StaffTerminal() {
  const { bookings, updateOrderStatus } = useBookingStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(bookings[0] || null);

  const activeQueue = bookings.filter((b) => b.orderStatus !== 'Delivered' && b.orderStatus !== 'Cancelled');

  const filteredQueue = activeQueue.filter(
    (b) =>
      b.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer.phone.includes(searchTerm) ||
      b.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Staff Header */}
      <div className="bg-leaf-dark text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Kitchen & Counter Terminal</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold mt-0.5">
            Fulfillment Station
          </h1>
          <p className="text-xs text-slate-200 mt-1">Live active queue for fast packing & customer handoffs.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs font-bold flex items-center gap-2">
          <Clock className="w-4 h-4 text-gold" />
          <span>Active Queue: {activeQueue.length} Orders</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Queue List */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-soft space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Scan QR or search Phone / ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 text-xs font-medium outline-none focus:border-leaf"
            />
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredQueue.map((b) => {
              const isSelected = selectedBooking?.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBooking(b)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-leaf bg-coconut-100 shadow-md'
                      : 'border-slate-200 hover:border-gold/50 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono font-bold text-xs text-leaf-dark">{b.bookingNumber}</span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-gold text-slate-900">
                      {b.orderStatus}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-slate-900 mt-1">{b.customer.name}</div>
                  <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
                    <span>{b.quantity.adults} Pax Sadya</span>
                    <span className="font-semibold text-slate-800">{b.timeSlot}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Order Action Box */}
        <div className="lg:col-span-7">
          {selectedBooking ? (
            <div className="bg-white border border-gold/30 rounded-3xl p-6 shadow-card space-y-6">
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Current Order</span>
                  <h2 className="font-mono text-2xl font-extrabold text-leaf-dark">{selectedBooking.bookingNumber}</h2>
                  <p className="text-xs text-slate-500">{selectedBooking.customer.name} • {selectedBooking.customer.phone}</p>
                </div>
                {selectedBooking.tokenNumber && (
                  <div className="bg-maroon text-white px-4 py-2 rounded-2xl font-mono text-lg font-bold">
                    {selectedBooking.tokenNumber}
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm text-slate-700 bg-coconut-50 p-4 rounded-2xl border border-gold/20">
                <div className="font-serif font-bold text-leaf-dark text-base">{selectedBooking.sadyaItem.name}</div>
                <div className="text-xs text-slate-600">Quantity: <strong>{selectedBooking.quantity.adults} Adult(s)</strong></div>
                {selectedBooking.extras.map((ext) => (
                  <div key={ext.id} className="text-xs text-slate-600">
                    Extra: <strong>{ext.name} (x{ext.quantity})</strong>
                  </div>
                ))}
                <div className="pt-2 border-t border-gold/20 text-xs font-bold flex justify-between">
                  <span>Fulfillment: {selectedBooking.fulfillment.toUpperCase()} ({selectedBooking.timeSlot})</span>
                  <span className="font-serif text-leaf-dark text-sm">{formatINR(selectedBooking.totalAmount)}</span>
                </div>
              </div>

              {/* Status Update Quick Buttons */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold uppercase text-slate-700">Quick Status Advance:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Confirmed', 'Preparing', 'Ready', 'Delivered'] as OrderStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateOrderStatus(selectedBooking.id, st);
                        setSelectedBooking({ ...selectedBooking, orderStatus: st });
                      }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        selectedBooking.orderStatus === st
                          ? 'bg-leaf text-white border-leaf shadow-sm'
                          : 'bg-white border-slate-300 hover:border-leaf text-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center text-slate-500">
              Select an order from the active queue to update status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
