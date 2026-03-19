import { create } from 'zustand';

// 1. DATA TYPES (Structure kaisa hoga)
export type Item = {
  id: number;
  name: string;
  price: number;
  discount: number;
  isOutOfStock: boolean;
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
  items: string; // E.g., "2x Maggi, 1x Coke"
  amount: number;
  time: string;
  status: 'PENDING' | 'PACKED' | 'DELIVERED';
};

// 2. THE GLOBAL STATE INTERFACE
interface AppState {
  stores: Store[];
  orders: Order[];
  
  // Admin Actions
  addStore: (newStore: Store) => void;
  toggleStock: (storeId: string, itemId: number) => void;
  updateValue: (storeId: string, itemId: number, field: keyof Item, value: number) => void;
  
  // Order Actions
  placeOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

// 3. INITIAL MASTER DATA
const initialStores: Store[] = [
  { 
    id: "1", name: "KIRANA KING", logo: "🏪", category: "GROCERY",
    items: [
      { id: 101, name: "AMUL TAAZA (1L)", price: 66, discount: 0, isOutOfStock: false },
      { id: 102, name: "MAGGI MASALA", price: 168, discount: 10, isOutOfStock: false }
    ]
  },
  { 
    id: "2", name: "FRESH MART", logo: "🍎", category: "BAKERY & DAIRY",
    items: [
      { id: 201, name: "BROWN BREAD", price: 50, discount: 5, isOutOfStock: true },
      { id: 202, name: "EGGS (1 DOZEN)", price: 85, discount: 0, isOutOfStock: false }
    ]
  },
  { 
    id: "3", name: "SNACK JUNCTION", logo: "🍿", category: "SNACKS & DRINKS",
    items: [
      { id: 301, name: "LAYS BLUE (LARGE)", price: 20, discount: 0, isOutOfStock: false },
      { id: 302, name: "COKE (750ML)", price: 40, discount: 0, isOutOfStock: false }
    ]
  }
];

const initialOrders: Order[] = [
  {
    id: "#WF-901", customer: "VINEET KUMAR", phone: "9934567890", address: "GALI NO. 4, SHANTI NAGAR",
    landmark: "NEAR HANUMAN MANDIR", items: "2X MAGGI, 1X COKE", amount: 245, time: "10:30 PM", status: 'PENDING'
  }
];

// 4. CREATE AND EXPORT THE STORE
export const useStore = create<AppState>((set) => ({
  stores: initialStores,
  orders: initialOrders,

  // --- ADMIN FUNCTIONS ---
  addStore: (newStore) => set((state) => ({ 
    stores: [...state.stores, newStore] 
  })),

  toggleStock: (storeId, itemId) => set((state) => ({
    stores: state.stores.map(store => store.id === storeId ? {
      ...store, items: store.items.map(item => item.id === itemId ? { ...item, isOutOfStock: !item.isOutOfStock } : item)
    } : store)
  })),

  updateValue: (storeId, itemId, field, value) => set((state) => ({
    stores: state.stores.map(store => store.id === storeId ? {
      ...store, items: store.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
    } : store)
  })),

  // --- ORDER FUNCTIONS ---
  placeOrder: (order) => set((state) => ({
    orders: [order, ...state.orders] // Naya order list mein sabse upar aayega
  })),

  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(order => order.id === orderId ? { ...order, status } : order)
  }))
}));