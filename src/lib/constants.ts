import { MenuItem, DeliverySlot, Coupon, CustomerReview, Booking } from '@/types';

export const POSTER_23_DELICACIES = [
  { id: 1, mlName: 'സാമ്പാർ', enName: 'Traditional Sambar' },
  { id: 2, mlName: 'അവിയൽ', enName: 'Malabar Avial' },
  { id: 3, mlName: 'പൈനാപ്പിൾ പച്ചടി', enName: 'Pineapple Pachadi' },
  { id: 4, mlName: 'കിച്ചടി', enName: 'Special Khichadi' },
  { id: 5, mlName: 'ബീറ്റ്‌റൂട്ട് പച്ചടി', enName: 'Beetroot Pachadi' },
  { id: 6, mlName: 'പരിപ്പ് കറി', enName: 'Nadan Parippu Curry' },
  { id: 7, mlName: 'മോര് കറി', enName: 'Kerala Moru Curry' },
  { id: 8, mlName: 'പുളിഞ്ചി', enName: 'Tangy Inji Puli' },
  { id: 9, mlName: 'കായ വറുത്തത്', enName: 'Kaya Varuthathu (Banana Chips)' },
  { id: 10, mlName: 'ശർക്കര വരട്ടി', enName: 'Sharkara Varatti' },
  { id: 11, mlName: 'ഉപ്പ്', enName: 'Uppu (Salt)' },
  { id: 12, mlName: 'ഇല', enName: 'Ela (Fresh Cut Plantain Leaf)' },
  { id: 13, mlName: 'പായസം അട', enName: 'Ada Pradhaman Payasam' },
  { id: 14, mlName: 'തോരൻ', enName: 'Fresh Vegetable Thoran' },
  { id: 15, mlName: 'ഓലൻ', enName: 'Kumbalanga Olan' },
  { id: 16, mlName: 'കാളൻ', enName: 'Kurukku Kalan' },
  { id: 17, mlName: 'പപ്പടം', enName: 'Crispy Pappadam' },
  { id: 18, mlName: 'മാങ്ങാ അച്ചാർ', enName: 'Nadan Mango Pickle' },
  { id: 19, mlName: 'പഴം', enName: 'Sweet Nenthra Banana' },
  { id: 20, mlName: 'രസം', enName: 'Nadan Spicy Rasam' },
  { id: 21, mlName: 'ചോറ്', enName: 'Kerala Rose Matta Rice' },
  { id: 22, mlName: 'പച്ചടി', enName: 'Cucumber Pachadi' },
  { id: 23, mlName: 'കൂട്ടു കറി', enName: 'Traditional Kootu Curry' },
];

export const SADYA_MENU_ITEMS: MenuItem[] = [
  {
    id: 'sadya-regular',
    name: 'Grand Onam Sadya (Dine-in / Single)',
    malayalamName: 'ഓണ സദ്യ (ഡൈനിംഗ്)',
    category: 'Sadya Packages',
    price: 220,
    servingPax: '1 Adult',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=1000',
    description: 'Authentic 23-item Kerala Grand Onam Sadya served fresh on banana leaf. Includes Sambar, Avial, Pineapple Pachadi, Beetroot Pachadi, Parippu, Moru, Inji Puli, Ada Payasam, Chips, Sharkara Varatti, Pappadam & more!',
    itemsIncluded: POSTER_23_DELICACIES.map(item => `${item.mlName} (${item.enName})`),
    itemCount: 23,
  },
  {
    id: 'sadya-family-5',
    name: 'Family Sadya Celebration Pack (5 Pax)',
    malayalamName: 'ഫാമിലി പാക്ക് (5 പേർക്ക്)',
    category: 'Sadya Packages',
    price: 1300,
    servingPax: '5 Persons',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000',
    description: 'Complete festival Sadya feast for 5 persons. Includes 5 fresh plantain leaves, eco-friendly packed thermal containers for all 23 items, and extra Ada Payasam.',
    itemsIncluded: [
      '23 Poster Sadya items for 5 Persons', '5 Plantain Banana Leaves', '1L Ada Payasam', 'Banana Chips & Sharkara Varatti'
    ],
    itemCount: 23,
  },
  {
    id: 'sadya-royal',
    name: 'Royal Kerala Rajakeeya Sadya',
    malayalamName: 'രാജകീയ തിരുവോണസദ്യ',
    category: 'Sadya Packages',
    price: 340,
    servingPax: '1 Person (Special Extras)',
    isVeg: true,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000',
    description: 'Grand 23-item Sadya plus extra Palada Payasam portion, Trivandrum Boli, and extra chips packet.',
    itemsIncluded: [
      'All 23 Poster Sadya items', 'Special Trivandrum Boli', 'Extra Palada Payasam Portion', 'Extra Chips'
    ],
    itemCount: 26,
  },
  {
    id: 'sadya-corporate-20',
    name: 'Corporate & Group Bulk Feast (20 Pax)',
    malayalamName: 'ഗ്രൂപ്പ് ബൾക്ക് ഓണസദ്യ (20 പേർക്ക്)',
    category: 'Corporate Bulk',
    price: 4999,
    servingPax: '20 Pax',
    isVeg: true,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000',
    description: 'Designed for group celebrations. Comes with hot thermal bulk boxes, 20 banana leaves, and dedicated delivery.',
    itemsIncluded: ['23 Poster Items in bulk containers', '20 Plantain Leaves', '4L Ada Payasam', '1kg Chips'],
    itemCount: 23,
  }
];

export const EXTRAS_MENU = [
  { id: 'ext-palada-1l', name: 'Palada Pradhaman Payasam (1 Liter)', price: 250 },
  { id: 'ext-ada-1l', name: 'Ada Pradhaman Payasam (1 Liter)', price: 240 },
  { id: 'ext-chips-500g', name: 'Authentic Nenthra Kaaya Chips (500g)', price: 200 },
  { id: 'ext-sharkara-500g', name: 'Sharkara Varatti Jaggery Chips (500g)', price: 220 },
  { id: 'ext-injipuli-250g', name: 'Nadan Inji Puli Jar (250g)', price: 100 },
  { id: 'ext-pappadam-pkt', name: 'Extra Kerala Pappadam Packet (10 Pcs)', price: 30 },
];

export const RESTAURANT_DETAILS = {
  name: 'KERALA KITCHEN, Valiyaparamba',
  shortName: 'Kerala Kitchen',
  category: 'Restaurant',
  location: 'Valiyaparamba, Kerala',
  phone: '9447445078',
  phoneNumbers: ['9447 44 50 78', '9745 62 72 03'],
  formattedPhone: '9447 44 50 78 / 9745 62 72 03',
  priceRange: '₹220 – ₹1300',
  openingStatus: 'Open for Onam Booking',
  closingTime: 'Around 9:00 PM',
  serviceOptions: [
    { label: 'All-you-can-eat options', icon: '🍛' },
    { label: 'Outdoor seating', icon: '🌿' },
    { label: 'Dine-in experience', icon: '🍽️' },
  ],
  atmosphere: 'Calm, peaceful, and family-friendly dining environment',
};

export const AVAILABLE_SLOTS: DeliverySlot[] = [
  { time: '11:00 AM', maxOrders: 50, bookedCount: 18, isAvailable: true },
  { time: '12:00 PM', maxOrders: 60, bookedCount: 38, isAvailable: true },
  { time: '01:00 PM', maxOrders: 60, bookedCount: 45, isAvailable: true },
  { time: '02:00 PM', maxOrders: 40, bookedCount: 15, isAvailable: true },
  { time: '07:00 PM', maxOrders: 40, bookedCount: 10, isAvailable: true },
];

export const ONAM_FESTIVAL_DATES = [
  { date: '2026-08-25', label: 'First Onam (Uthradam)', day: 'Tue', isPopular: true, malayalamDate: 'ഓഗസ്റ്റ് 25' },
  { date: '2026-08-26', label: 'THIRUVONAM (Main Sadya)', day: 'Wed', isPopular: true, malayalamDate: 'ഓഗസ്റ്റ് 26' },
  { date: '2026-08-27', label: 'Third Onam (Avittom)', day: 'Thu', isPopular: true, malayalamDate: 'ഓഗസ്റ്റ് 27' },
];

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'ONAM2026',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 150,
    expiryDate: '2026-08-29',
    description: 'Get 10% OFF on all Onam Sadya pre-bookings at Kerala Kitchen!'
  },
  {
    code: 'EARLYBIRD',
    discountType: 'flat',
    discountValue: 30,
    minOrderValue: 200,
    expiryDate: '2026-08-24',
    description: 'Flat ₹30 OFF for early festival pre-bookings.'
  },
  {
    code: 'BULKSADYA',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 1000,
    expiryDate: '2026-08-28',
    description: '15% OFF on group & family orders above ₹1,000.'
  }
];

export const REVIEWS_DATA: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Suresh Kumar',
    rating: 5,
    comment: 'The authentic Kerala Sadya at Kerala Kitchen Valiyaparamba is outstanding. Calm place with a peaceful atmosphere, friendly staff, and mouthwatering Palada Payasam!',
    date: 'Onam Festival',
    location: 'Valiyaparamba',
    verifiedBooking: true
  },
  {
    id: 'rev-2',
    customerName: 'Anitha Ramesh',
    rating: 5,
    comment: 'Very pleasant & sweet staff! The outdoor seating environment makes it a super comfortable place to unwind with family after a long busy week. Loved the banana leaf dining experience.',
    date: 'Valiyaparamba Diner',
    location: 'Kerala 673602',
    verifiedBooking: true
  },
  {
    id: 'rev-3',
    customerName: 'Firoz Muhammed',
    rating: 5,
    comment: 'Extremely affordable pricing (₹1–₹200 range) with all-you-can-eat options! Authentic traditional dishes served hot and fresh. Highly recommended.',
    date: 'Local Guest',
    location: 'Valiyaparamba',
    verifiedBooking: true
  }
];

export const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 'bk-1001',
    bookingNumber: 'ONAM-2026-8492',
    isGuest: true,
    createdAt: new Date().toISOString(),
    date: '2026-08-26',
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
      landmark: 'Near High Court Junction',
      pincode: '682031',
      deliveryInstructions: 'Call before arriving',
      latitude: 11.2588,
      longitude: 75.7804,
      locationAccuracy: 12,
    },
    latitude: 11.2588,
    longitude: 75.7804,
    locationAccuracy: 12,
    deliveryAddress: 'House 42, Marine Drive Layout',
    landmark: 'Near High Court Junction',
    deliveryInstructions: 'Call before arriving',
    deliveryOtp: '4821',
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
    isGuest: false,
    userId: 'user-demo-1',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    date: '2026-08-26',
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
    deliveryOtp: '1942',
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
