import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  name: string;
  phone: string;
  password: string;
  address?: string;
  landmark?: string;
  pincode?: string;
};

export type Item = {
  id: number;
  name: string;
  price: number;
  discount: number;
  isOutOfStock: boolean;
  quantity?: number;
};

export type Store = {
  id: string;
  name: string;
  logo: string;
  category: string;
  items: Item[];
};

export type Order = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  landmark: string;
  items: string; 
  amount: number;
  time: string;
  status: 'PENDING' | 'PACKED' | 'DELIVERED';
};

const initialStores: Store[] = [
  { id: 'st-1', name: 'Sharma Kirana', logo: '🛒', category: 'GROCERY', items: [{ id: 101, name: 'Aashirvaad Atta 5kg', price: 245, discount: 10, isOutOfStock: false }] },
  { id: 'st-2', name: 'Dairy Fresh', logo: '🥛', category: 'DAIRY', items: [{ id: 201, name: 'Amul Gold Milk 500ml', price: 33, discount: 0, isOutOfStock: false }] },
  { id: 'st-3', name: 'The Cake Shop', logo: '🎂', category: 'BAKERY', items: [{ id: 301, name: 'Choco Delight Cake', price: 450, discount: 50, isOutOfStock: false }] },
  { id: 'st-4', name: 'Organic Fruits', logo: '🍎', category: 'FRUITS', items: [{ id: 401, name: 'Shimla Apple 1kg', price: 180, discount: 20, isOutOfStock: false }] },
  { id: 'st-5', name: 'Protein Hub', logo: '🥩', category: 'MEAT', items: [{ id: 501, name: 'Fresh Chicken 1kg', price: 220, discount: 15, isOutOfStock: false }] },
  { id: 'st-6', name: 'Gadget World', logo: '🔌', category: 'ELECTRONICS', items: [{ id: 601, name: 'Fast Charger 20W', price: 899, discount: 200, isOutOfStock: false }] },
  { id: 'st-7', name: 'Pet Care Center', logo: '🐶', category: 'PET SUPPLIES', items: [{ id: 701, name: 'Pedigree 1.2kg', price: 350, discount: 30, isOutOfStock: false }] },
  { id: 'st-8', name: 'Medicine Plus', logo: '💊', category: 'PHARMACY', items: [{ id: 801, name: 'Paracetamol 650mg', price: 30, discount: 2, isOutOfStock: false }] }
];

interface AppState {
  stores: Store[];
  orders: Order[];
  cart: Item[];
  users: User[];
  currentUser: User | null;
  isLoggedIn: boolean;

  registerUser: (newUser: User) => void;
  loginUser: (phone: string, pass: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: number) => void;
  updateCartQuantity: (itemId: number, delta: number) => void;
  clearCart: () => void;
  placeOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void; // FIX: Added back
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      stores: initialStores,
      orders: [],
      cart: [],
      users: [],
      currentUser: null,
      isLoggedIn: false,

      registerUser: (newUser) => set((state) => ({ users: [...state.users, newUser] })),
      loginUser: (phone, pass) => {
        const user = get().users.find(u => u.phone === phone && u.password === pass);
        if (user) { set({ isLoggedIn: true, currentUser: user }); return true; }
        return false;
      },
      updateProfile: (data) => set((state) => {
        const updatedUser = state.currentUser ? { ...state.currentUser, ...data } : null;
        const updatedUsers = state.users.map(u => u.phone === state.currentUser?.phone ? { ...u, ...data } : u);
        return { currentUser: updatedUser, users: updatedUsers };
      }),
      logout: () => set({ isLoggedIn: false, currentUser: null, cart: [] }),
      addToCart: (item) => set((state) => {
        const existing = state.cart.find(i => i.id === item.id);
        if (existing) return { cart: state.cart.map(i => i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i) };
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }),
      removeFromCart: (itemId) => set((state) => ({ cart: state.cart.filter(i => i.id !== itemId) })),
      updateCartQuantity: (itemId, delta) => set((state) => ({
        cart: state.cart.map(i => i.id === itemId ? { ...i, quantity: Math.max(1, (i.quantity || 1) + delta) } : i)
      })),
      clearCart: () => set({ cart: [] }),
      placeOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(order => order.id === orderId ? { ...order, status } : order)
      })),
    }),
    { name: 'webfoo-master-data-v3' }
  )
);