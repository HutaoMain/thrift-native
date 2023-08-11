import { Text, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import React from "react";
import { ProductInterface } from "../Types";
import axios from "axios";
import WishlistCard from "../components/WishlistCard";
import useAuthStore from "../zustand/AuthStore";
import { useQuery, useQueryClient } from "react-query";
import { API_URL } from "../../API_URL";
import useNotificationCountStore from "../zustand/NotificationCountStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Wishlist = () => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const setWishlistCount = useNotificationCountStore(
    (state) => state.setWishlistCount
  );

  const { data, isFetching } = useQuery<ProductInterface[]>({
    queryKey: ["Wishlist"],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/wishlist/product/${user}`)
        .then((res) => res.data),
  });

  const handleRefresh = async () => {
    await queryClient.refetchQueries("Wishlist");

    const wishlistCount = data?.length || 0;

    setWishlistCount(wishlistCount);

    await AsyncStorage.setItem(
      "happy-thrift-wishlist-count",
      wishlistCount.toString()
    );
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", paddingTop: 10, paddingBottom: 50 }}
    >
      <Text style={{ textAlign: "center", fontSize: 20 }}>Wishlist</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
        }
      >
        {data?.map((item, key) => (
          <WishlistCard product={item} key={key} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wishlist;
