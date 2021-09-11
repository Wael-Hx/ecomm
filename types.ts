export interface Smartphone {
  id: string;
  name: string;
  brand: string;
  specs: Spec;
  price: number;
  image: string;
  colors: string[];
  ram: number[];
  storage: number[];
  size: number;
}

export interface Spec {
  resolution: string;
  cameras: string;
  OS: string;
  batterie: string;
  CPU: string;
}

export interface Brand {
  name: string;
  logo: string;
}

export interface Shop {
  brands: Brand[];
  smartphones: Smartphone[];
}

export interface FilterOptions {
  price: number;
  storage: number;
  ram: number;
  size: number;
}

export interface CartItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  ram: number;
  storage: number;
  color: string;
  specs: Spec;
  qty: number;
}

export interface Cart {
  products: CartItem[];
  total: number;
}
