export type ProductSku = '30cl' | '50cl' | '75cl' | '18.9L';
export type UnitOfSale = 'case' | 'bottle';
export type DeliveryZoneId = 'eket_city' | 'uyo' | 'wider_akwa_ibom';
export type OrderStatus = 'pending_payment' | 'paid' | 'scheduled' | 'dispatched' | 'delivered' | 'cancelled';
export type SubscriptionFrequency = 'weekly' | 'biweekly' | 'monthly';
export type QuoteStatus = 'pending_review' | 'quoted' | 'accepted' | 'paid' | 'fulfilled' | 'cancelled';

export interface Product {
  sku: ProductSku;
  display_name: string;
  nickname: string;
  unit_of_sale: UnitOfSale;
  bottles_per_unit: number;
  price_naira: number;
  min_order_quantity: number;
  category: 'pet' | 'pc';
  in_stock: boolean;
  active: boolean;
  display_order: number;
  zoho_item_id?: string;
  zoho_sku?: string;
}

export interface DeliveryZone {
  id: DeliveryZoneId;
  display_name: string;
  fee_naira: number;
  active: boolean;
}

export interface CartItem {
  sku: ProductSku;
  display_name: string;
  nickname: string;
  unit_of_sale: UnitOfSale;
  bottles_per_unit: number;
  price_naira: number;
  min_order_quantity: number;
  quantity: number;
  image_src: string;
}

export interface Customer {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  whatsapp?: string;
}

export interface Address {
  id: string;
  customer_id: string;
  street_address: string;
  city: string;
  lga?: string;
  state: string;
  delivery_zone: DeliveryZoneId;
  notes?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_sku: ProductSku;
  quantity: number;
  unit_price_naira: number;
  line_total_naira: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  address_id: string;
  delivery_zone: DeliveryZoneId;
  status: OrderStatus;
  subtotal_naira: number;
  delivery_fee_naira: number;
  total_naira: number;
  paystack_reference?: string;
  paid_at?: string;
  scheduled_delivery_date?: string;
  customer_notes?: string;
  created_at: string;
  // joined
  customer?: Customer;
  address?: Address;
  items?: OrderItem[];
}
