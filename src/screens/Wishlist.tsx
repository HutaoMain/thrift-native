import { Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { ProductInterface } from "../Types";
import axios from "axios";
import { API_URL } from "@env";
import WishlistCard from "../components/WishlistCard";
import useAuthStore from "../zustand/AuthStore";
import { useQuery } from "react-query";

const Wishlist = () => {
  const user = useAuthStore((state) => state.user);

  const { data } = useQuery<ProductInterface[]>({
    queryKey: ["Wishlist"],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/wishlist/product/${user}`)
        .then((res) => res.data),
  });

  return (
    <SafeAreaView style={{ paddingTop: 20 }}>
      <Text style={{ textAlign: "center" }}>Wishlist</Text>
      <ScrollView>
        {data?.map((item, key) => (
          <WishlistCard product={item} key={key} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wishlist;
