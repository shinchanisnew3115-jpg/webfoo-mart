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

// Order interface jo Admin panel ko chahiye
export interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  timestamp: string;
}

interface AppState {
  stores: Store[];
  cart: { item: Item; quantity: number }[];
  isLoggedIn: boolean;
  currentUser: { name: string; address: string } | null;
  orders: Order[]; // Naya: Admin ke liye
  login: (name: string, address: string) => void;
  addToCart: (item: Item) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void; // Naya: Admin action
}

export const useStore = create<AppState>((set) => ({
  stores: [
    {
      id: 1,
      name: "WebFoo Grocery",
      items: [
        { id: 101, name: "Aashirvaad Atta 5kg", price: 250, discount: 20, isOutOfStock: false },
        { id: 102, name: "Amul Gold Milk 500ml", price: 33, discount: 0, isOutOfStock: false },
      ],
    },
  ],
  cart: [],
  isLoggedIn: false,
  currentUser: null,
  orders: [ // Dummy orders taaki admin page khali na dikhe
    { id: "ORD001", customerName: "Vineet", items: ["Milk"], total: 33, status: 'Pending', timestamp: new Date().toLocaleString() }
  ],
  login: (name, address) => set({ isLoggedIn: true, currentUser: { name, address } }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, { item, quantity: 1 }] })),
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
  })),
}));