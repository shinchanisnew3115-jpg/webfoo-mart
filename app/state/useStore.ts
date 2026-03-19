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
  cart: { item: Item; quantity: number }[];
  isLoggedIn: boolean;
  currentUser: { name: string; address: string } | null;
  orders: Order[];
  login: (name: string, address: string) => void;
  addToCart: (item: Item) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  // --- ADMIN FUNCTIONS ADDED ---
  addStore: (name: string) => void;
  addItem: (storeId: number, item: Omit<Item, 'id'>) => void;
  toggleStock: (storeId: number, itemId: number) => void;
  updateValue: (storeId: number, itemId: number, field: keyof Item, value: any) => void;
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
      landmark: "Campus Gate", 
      items: ["Milk"], 
      amount: 33, 
      status: 'Pending', 
      time: "11:45 PM" 
    }
  ],

  login: (name, address) => set({ isLoggedIn: true, currentUser: { name, address } }),
  
  addToCart: (item) => set((state) => ({ cart: [...state.cart, { item, quantity: 1 }] })),
  
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
  })),

  // --- ADMIN LOGIC IMPLEMENTATION ---
  addStore: (name) => set((state) => ({
    stores: [...state.stores, { id: Date.now(), name, items: [] }]
  })),

  addItem: (storeId, newItem) => set((state) => ({
    stores: state.stores.map(s => s.id === storeId 
      ? { ...s, items: [...s.items, { ...newItem, id: Date.now() }] } 
      : s)
  })),

  toggleStock: (storeId, itemId) => set((state) => ({
    stores: state.stores.map(s => s.id === storeId 
      ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, isOutOfStock: !i.isOutOfStock } : i) } 
      : s)
  })),

  updateValue: (storeId, itemId, field, value) => set((state) => ({
    stores: state.stores.map(s => s.id === storeId 
      ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, [field]: value } : i) } 
      : s)
  })),
}));