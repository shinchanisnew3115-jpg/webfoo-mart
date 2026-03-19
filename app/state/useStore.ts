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

interface AppState {
  stores: Store[];
  cart: { item: Item; quantity: number }[];
  isLoggedIn: boolean;
  currentUser: { name: string; address: string } | null;
  login: (name: string, address: string) => void;
  addToCart: (item: Item) => void;
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
  login: (name, address) => set({ isLoggedIn: true, currentUser: { name, address } }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, { item, quantity: 1 }] })),
}));