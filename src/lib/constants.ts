import { MenuItem, DeliverySlot, Coupon, CustomerReview, Booking } from '@/types';

export const SADYA_MENU_ITEMS: MenuItem[] = [
  {
    id: 'sadya-regular',
    name: 'Authentic 26-Item Kerala Onam Sadya',
    malayalamName: 'പരമ്പരാഗത 26 കറി തിരുവോണസദ്യ',
    category: 'Sadya Packages',
    price: 399,
    servingPax: '1 Adult',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=1000',
    description: 'Traditional grand feast served on fresh banana leaf with Rose Matta Rice, Parippu, Sambar, Rasam, Avial, Thoran, Olan, Kalan, Erissery, Pulissery, Inji Puli, 2 Payasams, Pappadam & Banana Chips.',
    itemsIncluded: [
      'Kerala Rose Matta Rice', 'Nadan Parippu Curry', 'Traditional Sambar', 'Malabar Avial', 
      'Pineapple Pulissery', 'Pumpkin Erissery', 'Kumbalanga Olan', 'Kurukku Kalan', 
      'Beans & Carrot Thoran', 'Pachadi (Cucumber)', 'Khichadi (Beetroot)', 'Inji Puli (Ginger Pickle)', 
      'Lemon Pickle', 'Mango Pickle', 'Kondattam Mulaku', 'Nenthra Kaaya Upperi (Banana Chips)', 
      'Sharkara Varatti', 'Crispy Pappadam', 'Sweet Banana', 'Nadan Rasam', 'Pacha Moru', 
      'Ada Pradhaman Payasam', 'Palada Payasam', 'Neer & Mineral Water'
    ],
    itemCount: 26,
  },
  {
    id: 'sadya-royal',
    name: 'Royal Kerala Rajakeeya Sadya',
    malayalamName: 'രാജകീയ 30 കറി തിരുവോണസദ്യ',
    category: 'Sadya Packages',
    price: 549,
    servingPax: '1 Adult (Special Items)',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000',
    description: 'Extravagant 30-item Royal Sadya with premium additions including Cashew Pradhaman, Jackfruit (Chakka) Payasam, Special Boli, Nadan Inji Puli, and extra banana chips.',
    itemsIncluded: [
      'All 26 Regular Sadya items', 'Special Trivandrum Boli', 'Chakka Pradhaman', 
      'Cashew Nut Payasam', 'Kathrikka Pachadi', 'Spicy Mango Chutney'
    ],
    itemCount: 30,
  },
  {
    id: 'sadya-family-5',
    name: 'Family Celebration Pack (5 Pax)',
    malayalamName: 'കുടുംബ സദ്യ പാക്ക് (5 പേർക്ക്)',
    category: 'Sadya Packages',
    price: 1899,
    servingPax: '5 Adults',
    isVeg: true,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000',
    description: 'Complete eco-friendly packed Sadya for 5 family members. Includes 5 fresh cut banana leaves, stainless steel style eco-containers, and 2.5 Liters of Payasam.',
    itemsIncluded: [
      '26-Item Sadya for 5', '5 Plantain Banana Leaves', '1L Palada Payasam', '1L Ada Pradhaman', '500g Banana Chips & Sharkara Varatti'
    ],
    itemCount: 26,
  },
  {
    id: 'sadya-mini',
    name: 'Mini Onam Festival Sadya',
    malayalamName: 'മിനി ഓണസദ്യ',
    category: 'Sadya Packages',
    price: 269,
    servingPax: '1 Person / Light Feast',
    isVeg: true,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1000',
    description: 'Compact 16-item festival meal perfect for a quick light feast. Includes Matta Rice, Sambar, Avial, Thoran, Inji Puli, Pappadam, Chips & Palada Payasam.',
    itemsIncluded: [
      'Matta Rice', 'Sambar', 'Avial', 'Thoran', 'Olan', 'Pulissery', 'Inji Puli', 'Lemon Pickle', 'Chips', 'Pappadam', 'Palada Payasam'
    ],
    itemCount: 16,
  },
  {
    id: 'sadya-corporate-20',
    name: 'Corporate Bulk Feast (20 Pax)',
    malayalamName: 'കോർപ്പറേറ്റ് ബൾക്ക് ഓണസദ്യ (20 പേർക്ക്)',
    category: 'Corporate Bulk',
    price: 7499,
    servingPax: '20-25 Pax',
    isVeg: true,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000',
    description: 'Designed for office celebrations & group gatherings. Comes with thermal bulk boxes, banana leaf rolls, serving spoons, and dedicated delivery window.',
    itemsIncluded: ['26 Items in bulk hot containers', '20 Banana Leaf Rolls', '4L Payasam (Palada + Ada Pradhaman)', '1kg Banana Chips'],
    itemCount: 26,
  }
];

export const EXTRAS_MENU = [
  { id: 'ext-palada-1l', name: 'Palada Pradhaman Payasam (1 Liter)', price: 299 },
  { id: 'ext-ada-1l', name: 'Ada Pradhaman Payasam (1 Liter)', price: 289 },
  { id: 'ext-chakka-1l', name: 'Chakka (Jackfruit) Payasam (1 Liter)', price: 310 },
  { id: 'ext-chips-500g', name: 'Authentic Nenthra Kaaya Chips (500g)', price: 240 },
  { id: 'ext-sharkara-500g', name: 'Sharkara Varatti Jaggery Chips (500g)', price: 260 },
  { id: 'ext-boli-5', name: 'Special Trivandrum Boli (Pack of 5)', price: 150 },
  { id: 'ext-injipuli-250g', name: 'Nadan Inji Puli Jar (250g)', price: 120 },
  { id: 'ext-pappadam-pkt', name: 'Extra Kerala Pappadam Packet (10 Pcs)', price: 40 },
];

export const AVAILABLE_SLOTS: DeliverySlot[] = [
  { time: '10:00 AM', maxOrders: 40, bookedCount: 12, isAvailable: true },
  { time: '11:00 AM', maxOrders: 50, bookedCount: 38, isAvailable: true },
  { time: '12:00 PM', maxOrders: 60, bookedCount: 58, isAvailable: true },
  { time: '01:00 PM', maxOrders: 60, bookedCount: 45, isAvailable: true },
  { time: '02:00 PM', maxOrders: 40, bookedCount: 15, isAvailable: true },
];

export const ONAM_FESTIVAL_DATES = [
  { date: '2026-09-02', label: 'Uthradam Eve', day: 'Wed', isPopular: false },
  { date: '2026-09-03', label: 'First Onam (Uthradam)', day: 'Thu', isPopular: true },
  { date: '2026-09-04', label: 'THIRUVONAM (Main Festival)', day: 'Fri', isPopular: true },
  { date: '2026-09-05', label: 'Third Onam (Avittom)', day: 'Sat', isPopular: false },
  { date: '2026-09-06', label: 'Fourth Onam (Chatayam)', day: 'Sun', isPopular: false },
];

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'ONAM2026',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 500,
    expiryDate: '2026-09-07',
    description: 'Get 10% OFF on all Onam Sadya pre-bookings!'
  },
  {
    code: 'EARLYBIRD',
    discountType: 'flat',
    discountValue: 100,
    minOrderValue: 800,
    expiryDate: '2026-08-31',
    description: 'Flat ₹100 OFF for early pre-bookings.'
  },
  {
    code: 'BULKSADYA',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 3000,
    expiryDate: '2026-09-06',
    description: '15% OFF on group & corporate orders above ₹3,000.'
  }
];

export const REVIEWS_DATA: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Anjali Kurup',
    rating: 5,
    comment: 'The 26-item Sadya was extraordinarily delicious! Reminded me exactly of my grandmother’s recipe in Thrissur. The Palada Payasam was divine.',
    date: 'Thiruvonam Last Year',
    location: 'Kochi',
    verifiedBooking: true
  },
  {
    id: 'rev-2',
    customerName: 'Dr. Rahul Varma',
    rating: 5,
    comment: 'Punctual home delivery at 12:00 PM right on Thiruvonam day. Packaging in banana leaf cutouts kept the food piping hot and super fresh!',
    date: 'Onam 2025',
    location: 'Trivandrum',
    verifiedBooking: true
  },
  {
    id: 'rev-3',
    customerName: 'Meera Nair',
    rating: 5,
    comment: 'The corporate bulk order for our office (30 people) was handled flawlessly. Exceptional Inji Puli, Avial, and crisp Sharkara Varatti!',
    date: 'Uthradam 2025',
    location: 'Calicut',
    verifiedBooking: true
  }
];

export const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 'bk-1001',
    bookingNumber: 'ONAM-2026-8492',
    createdAt: new Date().toISOString(),
    date: '2026-09-04',
    timeSlot: '12:00 PM',
    fulfillment: 'delivery',
    sadyaItem: SADYA_MENU_ITEMS[0],
    quantity: { adults: 4, children: 1 },
    extras: [
      { id: 'ext-palada-1l', name: 'Palada Pradhaman Payasam (1 Liter)', price: 299, quantity: 1 }
    ],
    customer: {
      name: 'Siddharth Menon',
      phone: '+91 98765 43210',
      email: 'siddharth.m@gmail.com',
      address: 'House 42, Marine Drive Layout',
      landmark: 'Near High Court',
      pincode: '682031'
    },
    subtotal: 1895,
    discount: 100,
    deliveryCharge: 50,
    totalAmount: 1845,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    orderStatus: 'Confirmed',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ONAM-2026-8492'
  },
  {
    id: 'bk-1002',
    bookingNumber: 'ONAM-2026-9120',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    date: '2026-09-04',
    timeSlot: '01:00 PM',
    fulfillment: 'pickup',
    sadyaItem: SADYA_MENU_ITEMS[1],
    quantity: { adults: 2, children: 0 },
    extras: [],
    customer: {
      name: 'Kavya Pillai',
      phone: '+91 98470 11223',
      email: 'kavya.p@yahoo.com'
    },
    subtotal: 1098,
    discount: 0,
    deliveryCharge: 0,
    totalAmount: 1098,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'Preparing',
    tokenNumber: 'PK-42',
    estimatedWaitMinutes: 10,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ONAM-2026-9120'
  }
];
