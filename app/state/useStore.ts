"use client"
import { create } from 'zustand';

export interface Item {
  id: number;
  name: string;
  price: number;
  discount: number;
  isOutOfStock: boolean;
}

export interface Store {
  id: number;
  name: string;
  items: Item[];
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  landmark: string;
  items: string[];
  amount: number;
  status: 'Pending' | 'PACKED' | 'Shipped' | 'Delivered';
  time: string;
}

interface AppState {
  stores: Store[];
  cart: { id: number; name: string; price: number; quantity: number }[];
  isLoggedIn: boolean;
  currentUser: { name: string; address: string } | null;
  orders: Order[];
  login: (name: string, address: string) => void;
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: number) => void;
  updateCartQuantity: (itemId: number, quantity: number) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addStore: (name: string) => void;
  addItem: (storeId: number, item: Omit<Item, 'id'>) => void;
  toggleStock: (storeId: number, itemId: number) => void;
  updateValue: (storeId: number, itemId: number, field: keyof Item, value: any) => void;
}

export const useStore = create<AppState>((set) => ({
  stores: [{ id: 1, name: "WebFoo Grocery", items: [] }],
  cart: [],
  isLoggedIn: false,
  currentUser: null,
  orders: [],

  login: (name, address) => set({ isLoggedIn: true, currentUser: { name, address } }),
  
  addToCart: (item) => set((state) => {
    const existing = state.cart.find(i => i.id === item.id);
    if (existing) {
      return { cart: state.cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
    }
    return { cart: [...state.cart, { id: item.id, name: item.name, price: item.price, quantity: 1 }] };
  }),

  removeFromCart: (itemId) => set((state) => ({
    cart: state.cart.filter(i => i.id !== itemId)
  })),

  updateCartQuantity: (itemId, quantity) => set((state) => ({
    cart: state.cart.map(i => i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i)
  })),

  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
  })),

  addStore: (name) => set((state) => ({ stores: [...state.stores, { id: Date.now(), name, items: [] }] })),

  addItem: (storeId, newItem) => set((state) => ({
    stores: state.stores.map(s => s.id === storeId ? { ...s, items: [...s.items, { ...newItem, id: Date.now() }] } : s)
  })),

  toggleStock: (storeId, itemId) => set((state) => ({
    stores: state.stores.map(s => s.id === storeId ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, isOutOfStock: !i.isOutOfStock } : i) } : s)
  })),

  updateValue: (storeId, itemId, field, value) => set((state) => ({
    stores: state.stores.map(s => s.id === storeId ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, [field]: value } : i) } : s)
  })),
}));