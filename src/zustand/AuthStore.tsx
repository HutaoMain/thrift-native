import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthStore {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  async setUser(user) {
    try {
      await AsyncStorage.setItem("happy-thrift-user", user);
      set({ user });
    } catch (error) {
      console.error("Error saving user to AsyncStorage:", error);
    }
  },

  async clearUser() {
    try {
      await AsyncStorage.removeItem("happy-thrift-user");
      set({ user: null });
    } catch (error) {
      console.error("Error removing user from AsyncStorage:", error);
    }
  },

  async init() {
    try {
      const user = await AsyncStorage.getItem("happy-thrift-user");
      if (user) {
        set({ user });
      }
    } catch (error) {
      console.error("Error retrieving user from AsyncStorage:", error);
    }
  },
}));

export default useAuthStore;
