import { Page, Locator } from '@playwright/test';

export interface BasePage {
  page: Page;
  url: string;
  title: string;
}

export interface NavigationItem {
  name: string;
  selector: string;
  url?: string;
}

export interface ProductCategory {
  name: string;
  selector: string;
  subcategories?: string[];
}

export interface ProductInfo {
  name: string;
  price: string;
  inStock: boolean;
  url?: string;
}

export interface SearchOptions {
  query: string;
  category?: string;
  sortBy?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface CartItem extends ProductInfo {
  quantity: number;
  totalPrice: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface TestUser {
  id: string;
  credentials: UserCredentials;
  firstName: string;
  lastName: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
}
