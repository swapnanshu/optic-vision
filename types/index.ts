// types/index.ts
import { Timestamp } from "firebase/firestore";

export interface Frame {
  id: string; // Firestore auto-ID
  name: string; // "Classic Aviator Gold"
  brand: string; // "Ray-Ban" | "Fastrack" | own-brand
  category: "eyeglasses" | "sunglasses";
  frameStyle:
    | "round"
    | "square"
    | "aviator"
    | "cat-eye"
    | "rectangle"
    | "wayfarer"
    | "clubmaster";
  frameMaterial: "metal" | "acetate" | "titanium" | "plastic" | "wood";
  faceShapes: Array<"oval" | "round" | "square" | "heart" | "diamond">;
  price: number; // paise — ₹1,499 = 149900
  stock: number; // integer. 0 = out of stock
  images: string[]; // Cloudinary/Firestore URLs. images[0] = primary/thumbnail
  colors: string[]; // ["Gold", "Silver", "Black"]
  sizes: Array<"small" | "medium" | "large">;
  lensCompatible: Array<
    "single-vision" | "blue-cut" | "progressive" | "photochromic" | "anti-glare"
  >;
  description: string; // 2-3 sentences, Hinglish tone
  isTrending: boolean; // manually curated — shows on homepage strip
  isActive: boolean; // false = hidden from customer catalog (soft delete)
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Order {
  id: string;
  userId: string; // Firebase Auth UID
  customerName: string;
  phone: string; // 10-digit
  email: string | null;

  address: {
    line1: string;
    line2: string | null;
    city: string; // Always "Nagpur" for v1 — auto-filled
    pincode: string; // Validated against settings.validPincodes
    landmark: string | null;
  };

  items: Array<{
    frameId: string;
    name: string;
    image: string; // Cloudinary URL of primary image
    qty: number;
    price: number; // paise — price at time of order (snapshot, not live ref)
    lensType: string | null; // e.g. "blue-cut"
    lensPrice: number | null; // paise
  }>;

  subtotal: number; // sum of (price × qty) for all items, paise
  deliveryCharge: number; // paise — snapshot from settings at time of order
  totalAmount: number; // subtotal + deliveryCharge, paise

  paymentMethod: "cod"; // always 'cod' in v1
  paymentStatus: "pending" | "collected";

  status: "placed" | "confirmed" | "shipped" | "delivered" | "cancelled";
  statusHistory: Array<{
    status: string;
    timestamp: Timestamp;
    note: string | null; // optional admin note shown on tracking page
  }>;

  estimatedDelivery: string; // ISO date "2026-06-10" — calculated at order time

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Appointment {
  id: string;
  userId: string | null; // null for guest bookings (name+phone collected inline)
  customerName: string;
  phone: string;
  type: "store-test" | "home-test";
  scheduledDate: string; // "2026-06-10" — ISO date
  scheduledTime: string; // "10:30" — 24h format
  status: "pending" | "confirmed" | "completed" | "cancelled";
  address: {
    // null for store-test
    line1: string;
    city: string;
    pincode: string;
  } | null;
  fee: number; // 0 for store-test, 19900 (₹199) for home-test — paise
  feeStatus: "pending" | "collected" | null; // null for store-test
  notes: string | null; // admin notes / customer special requests
  reminderSent: boolean; // set true after day-before WA reminder fires
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface User {
  uid: string; // = document ID = Firebase Auth UID
  email: string;
  displayName: string;
  phone: string;
  role: "customer" | "admin" | "staff"; // default: 'customer'
  addresses: Array<{
    label: string; // "Home" | "Office" | "Other"
    line1: string;
    line2: string | null;
    city: string;
    pincode: string;
    landmark: string | null;
    isDefault: boolean;
  }>;
  pushSubscription: object | null; // Web Push subscription object
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Consultation {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  query: string;
  status: "new" | "contacted" | "resolved";
  source: "form" | "whatsapp"; // 'whatsapp' = admin manually created entry
  createdAt: Timestamp;
  respondedAt: Timestamp | null;
}

export interface Settings {
  // Store Identity
  storeName: string; // "Optics Vision"
  storeAddress: string; // full address string
  storePhone: string; // "9511696861"
  storeWhatsApp: string; // with country code — "919511696861"

  // E-commerce
  deliveryCharge: number; // paise — ₹49 = 4900
  estimatedDeliveryDays: number; // 2 → order date + 2 days
  homeTestFee: number; // 19900 paise = ₹199
  validPincodes: string[]; // ["440001", "440002", ... "440035"] — Nagpur zone

  // Appointments
  appointmentStartTime: string; // "10:00"
  appointmentEndTime: string; // "19:00"
  appointmentSlotDuration: number; // 30 (minutes)

  // Presentation
  businessHours: Array<{
    day:
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
      | "Sunday";
    open: string; // "10:00"
    close: string; // "20:00"
    closed: boolean;
  }>;
  aboutText: string; // 2-3 paragraph store description
  promoActive: boolean;
  promoMessage: string | null;
}
