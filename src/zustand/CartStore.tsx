import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem, quantity: number) => void;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;
  saveCartToStorage: (cartData: CartStore) => void;
  getCartFromStorage: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: async (item: CartItem, quantity: number = 1) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/product/list/${item.id}`
      );
      const productQuantity = data.quantity;

      set((state: CartStore) => {
        const index = state.items.findIndex((i: CartItem) => i.id === item.id);

        if (index === -1) {
          // Item not in cart yet, add it as a new item
          if (quantity > productQuantity) {
            quantity = productQuantity;
          }
          return {
            items: [...state.items, { ...item, quantity }],
            total: state.total + item.price * quantity,
          };
        } else {
          // Item already in cart, update its quantity
          const newQuantity = state.items[index].quantity + quantity;
          if (newQuantity > productQuantity) {
            quantity = productQuantity - state.items[index].quantity;
          }
          const newItems = [...state.items];
          newItems[index].quantity += quantity;
          return {
            items: newItems,
            total: state.total + item.price * quantity,
          };
        }
      });
    } catch (error) {
      console.error(error);
    }
  },

  increaseItem: async (id: string) => {
    const { data } = await axios.get(`${API_URL}/api/product/list/${id}`);
    const productQuantity = data.quantity;
    set((state: CartStore) => {
      const item = state.items.find((item: any) => item.id === id)!;

      if (productQuantity > item.quantity) {
        return {
          items: state.items.map((item: any) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          total: state.total + item.price,
        };
      } else {
        alert("You can't add more items to the cart.");
        return state;
      }
    });
  },

  decreaseItem: (id: string) => {
    set((state: CartStore) => {
      const item = state.items.find((item: any) => item.id === id)!;
      const newItems =
        item.quantity === 1
          ? state.items.filter((item: any) => item.id !== id)
          : state.items.map((item: any) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
      return {
        items: newItems,
        total: state.total - item.price,
      };
    });
  },

  removeItem: (id: string) => {
    set((state: CartStore) => {
      const item = state.items.find((item: any) => item.id === id)!;
      return {
        items: state.items.filter((item: any) => item.id !== id),
        total: state.total - item.price * item.quantity,
      };
    });
  },

  saveCartToStorage: async (cartData: CartStore) => {
    try {
      await AsyncStorage.setItem("cart-storage", JSON.stringify(cartData));
    } catch (error) {
      console.error("Error saving cart data to AsyncStorage:", error);
    }
  },

  getCartFromStorage: async () => {
    try {
      const cartDataString = await AsyncStorage.getItem("cart-storage");
      if (cartDataString) {
        const cartData = JSON.parse(cartDataString) as CartStore;
        set((state) => ({
          ...state,
          items: cartData.items,
          total: cartData.total,
        }));
      }
    } catch (error) {
      console.error("Error retrieving cart data from AsyncStorage:", error);
    }
  },
}));

// Get the store instance
const cartStore = useCartStore.getState();

// Load the cart data from AsyncStorage when the store is initialized
cartStore.getCartFromStorage();

export default useCartStore;
