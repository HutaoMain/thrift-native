import { create } from "zustand";

interface NotificationInterface {
  pendingOrderCount: number;
  setPendingOrderCount: (count: number) => void;
  wishlistCount: number;
  setWishlistCount: (count: number) => void;
}

const useNotificationCountStore = create<NotificationInterface>((set) => ({
  pendingOrderCount: 0,
  setPendingOrderCount: (count: number) => set({ pendingOrderCount: count }),
  wishlistCount: 0,
  setWishlistCount: (count: number) => set({ wishlistCount: count }),
}));

export default useNotificationCountStore;
