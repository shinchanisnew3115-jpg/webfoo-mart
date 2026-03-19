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

// Admin UI ke exact variables ke sath Order Interface
export interface Order {
  id: string;
  customer: string;   // Pehle customerName tha
  phone: string;      // Naya added
  landmark: string;   // Naya added
  items: string[];
  amount: number;     // Store total
  status: 'Pending' | 'Shipped' | 'Delivered';
  time: string;       // Store timestamp
}

interface AppState {
  stores: Store[];
  cart: { item: Item; quantity: number }[];
  isLoggedIn: boolean;
  currentUser: { name: string; address: string } | null;
  orders: Order[]; 
  login: (name: string, address: string) => void;
  addToCart: (item: Item) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
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
  orders: [ 
    { 
      id: "WF-8821", 
      customer: "Vineet Kumar", 
      phone: "9876543210",
      landmark: "Near Campus Gate No. 2",
      items: ["Milk", "Atta"], 
      amount: 283, 
      status: 'Pending', 
      time: "11:45 PM" 
    }
  ],
  login: (name, address) => set({ isLoggedIn: true, currentUser: { name, address } }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, { item, quantity: 1 }] })),
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
  })),
}));