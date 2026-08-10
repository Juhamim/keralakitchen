'use client';

import { useState } from 'react';
import { useBookingStore } from '@/lib/store';
import { SADYA_MENU_ITEMS, AVAILABLE_SLOTS, VALID_COUPONS } from '@/lib/constants';
import { formatINR, formatDate } from '@/lib/utils';
import { generateInvoicePDF } from '@/lib/pdf';
import { Booking, OrderStatus } from '@/types';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Plus,
  Search,
  Filter,
  ShieldCheck,
  Tag,
  Utensils,
  Calendar,
  Users
} from 'lucide-react';

export default function AdminDashboard() {
  const { bookings, updateOrderStatus } = useBookingStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'slots' | 'coupons'>('orders');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate Metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalBookingsCount = bookings.length;
  const pendingOrdersCount = bookings.filter((b) => b.orderStatus === 'Confirmed' || b.orderStatus === 'Preparing').length;
  const completedOrdersCount = bookings.filter((b) => b.orderStatus === 'Delivered').length;

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || b.orderStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const exportCSV = () => {
    const headers = 'Booking ID,Date,Time Slot,Fulfillment,Customer Name,Phone,Total Amount,Order Status\n';
    const rows = bookings
      .map(
        (b) =>
          `"${b.bookingNumber}","${b.date}","${b.timeSlot}","${b.fulfillment}","${b.customer.name}","${b.customer.phone}",${b.totalAmount},"${b.orderStatus}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KeralaKitchen_Onam_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const statusOptions: OrderStatus[] = [
    'Booked',
    'Confirmed',
    'Preparing',
    'Ready',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold/20 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-gold" />
            <h1 className="font-serif text-3xl font-extrabold text-leaf-dark">
              Admin Control Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">Kerala Kitchen Onam Sadya Pre-Booking Management System</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="bg-leaf hover:bg-leaf-dark text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-gold-light" />
            <span>Export Sales CSV</span>
          </button>
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-gold/30 shadow-soft">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Total Revenue</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="font-serif text-2xl font-extrabold text-leaf-dark">{formatINR(totalRevenue)}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Live festival bookings total</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gold/30 shadow-soft">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Total Bookings</span>
            <ShoppingBag className="w-5 h-5 text-gold-deep" />
          </div>
          <div className="font-serif text-2xl font-extrabold text-slate-900">{totalBookingsCount}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Orders placed for Onam</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gold/30 shadow-soft">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Active Kitchen Queue</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="font-serif text-2xl font-extrabold text-amber-600">{pendingOrdersCount}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Confirmed / Preparing</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gold/30 shadow-soft">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Completed</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="font-serif text-2xl font-extrabold text-emerald-700">{completedOrdersCount}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Successfully fulfilled</span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 gap-4">
        {[
          { id: 'orders', label: 'All Orders', icon: ShoppingBag },
          { id: 'menu', label: 'Menu & Prices', icon: Utensils },
          { id: 'slots', label: 'Time Slots Capacity', icon: Clock },
          { id: 'coupons', label: 'Coupons & Offers', icon: Tag },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                isActive
                  ? 'border-leaf text-leaf-dark'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ORDERS TABLE */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-soft space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by ID, Name or Phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 text-xs font-medium outline-none focus:border-leaf"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 bg-white outline-none"
              >
                <option value="all">All Statuses</option>
                {statusOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Orders Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-coconut-100 border-b border-gold/20 text-[11px] font-bold uppercase text-slate-600">
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date & Slot</th>
                  <th className="p-3">Mode</th>
                  <th className="p-3">Items / Pax</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Order Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-coconut-50/50 transition-colors">
                    <td className="p-3 font-mono font-bold text-leaf-dark">{b.bookingNumber}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{b.customer.name}</div>
                      <div className="text-[11px] text-slate-500">{b.customer.phone}</div>
                    </td>
                    <td className="p-3">
                      <div>{formatDate(b.date)}</div>
                      <div className="text-[11px] text-gold-deep font-bold">{b.timeSlot}</div>
                    </td>
                    <td className="p-3">
                      <span className="uppercase font-bold text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {b.fulfillment}
                      </span>
                    </td>
                    <td className="p-3">
                      <div>{b.sadyaItem.name}</div>
                      <div className="text-[11px] text-slate-500">{b.quantity.adults} Adult(s)</div>
                    </td>
                    <td className="p-3 font-serif font-bold text-slate-900">{formatINR(b.totalAmount)}</td>
                    <td className="p-3">
                      <select
                        value={b.orderStatus}
                        onChange={(e) => updateOrderStatus(b.id, e.target.value as OrderStatus)}
                        className="px-2.5 py-1 rounded-xl text-xs font-bold border border-slate-300 bg-white text-slate-800 outline-none"
                      >
                        {statusOptions.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => generateInvoicePDF(b)}
                        className="p-1.5 rounded-lg bg-coconut-100 border border-gold/30 hover:bg-coconut-200 text-slate-700 inline-flex items-center gap-1 text-[11px] font-bold"
                        title="Download Invoice PDF"
                      >
                        <Download className="w-3.5 h-3.5 text-gold-deep" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MENU EDITOR */}
      {activeTab === 'menu' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SADYA_MENU_ITEMS.map((item) => (
            <div key={item.id} className="p-5 bg-white rounded-3xl border border-gold/30 shadow-soft space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">{item.name}</h3>
                  <span className="text-xs text-maroon font-semibold">{item.category}</span>
                </div>
                <span className="font-serif font-extrabold text-xl text-leaf-dark">{formatINR(item.price)}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-emerald-700 font-bold">100% Pure Veg</span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  Active Available
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: TIME SLOTS */}
      {activeTab === 'slots' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {AVAILABLE_SLOTS.map((slot) => (
            <div key={slot.time} className="p-5 bg-white rounded-3xl border border-gold/30 shadow-soft space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-lg text-slate-900">{slot.time}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  Active
                </span>
              </div>
              <div className="text-xs text-slate-600">
                Booked: <strong>{slot.bookedCount}</strong> / {slot.maxOrders} Max
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gold h-full"
                  style={{ width: `${(slot.bookedCount / slot.maxOrders) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: COUPONS */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {VALID_COUPONS.map((cp) => (
            <div key={cp.code} className="p-5 bg-white rounded-3xl border border-gold/30 shadow-soft space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono font-extrabold text-lg text-leaf-dark">{cp.code}</span>
                <span className="text-xs font-bold bg-gold-soft text-slate-900 px-2.5 py-0.5 rounded-full">
                  {cp.discountType === 'percentage' ? `${cp.discountValue}% OFF` : `₹${cp.discountValue} OFF`}
                </span>
              </div>
              <p className="text-xs text-slate-600">{cp.description}</p>
              <div className="text-[11px] text-slate-400">Min Order: {formatINR(cp.minOrderValue)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
