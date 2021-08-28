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

export interface Cart {
  cart: Smartphone[];
}
