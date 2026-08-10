export type FulfillmentType = 'pickup' | 'delivery';

export type OrderStatus = 
  | 'Booked' 
  | 'Confirmed' 
  | 'Preparing' 
  | 'Ready' 
  | 'Out for Delivery' 
  | 'Delivered' 
  | 'Cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cash';

export interface MenuItem {
  id: string;
  name: string;
  malayalamName?: string;
  category: 'Sadya Packages' | 'Payasam' | 'Savories & Chips' | 'Extras & Curries' | 'Corporate Bulk';
  price: number;
  description: string;
  itemsIncluded?: string[];
  itemCount?: number;
  imageUrl: string;
  isVeg: boolean;
  isAvailable: boolean;
  isPopular?: boolean;
  servingPax?: string;
}

export interface ExtraItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface BookingCustomerDetails {
  name: string;
  phone: string;
  email: string;
  address?: string;
  landmark?: string;
  pincode?: string;
  notes?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  expiryDate: string;
  description: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  createdAt: string;
  date: string;
  timeSlot: string;
  fulfillment: FulfillmentType;
  sadyaItem: MenuItem;
  quantity: {
    adults: number;
    children: number;
  };
  extras: ExtraItem[];
  customer: BookingCustomerDetails;
  couponApplied?: Coupon;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  qrCodeUrl?: string;
  tokenNumber?: string;
  estimatedWaitMinutes?: number;
}

export interface DeliverySlot {
  time: string;
  maxOrders: number;
  bookedCount: number;
  isAvailable: boolean;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
  avatarUrl?: string;
  verifiedBooking?: boolean;
}
