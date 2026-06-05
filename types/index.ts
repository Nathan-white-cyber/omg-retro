export * from "./game";
export * from "./medusa";

export interface DeliveryOption {
  id: "standard" | "expedited" | string;
  label: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  postalCode: string;
  countryCode: string;
  phone?: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  memberSince?: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number | "FREE";
  tax: number;
  total: number;
}
