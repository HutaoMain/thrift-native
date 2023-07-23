import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import React, { useLayoutEffect } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { useQuery } from "react-query";
import { ProductInterface } from "../Types";
import axios from "axios";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  const { data } = useQuery<ProductInterface[]>({
    queryKey: ["Home"],
    queryFn: () =>
      axios.get(`${API_URL}/api/product/list`).then((res) => res.data),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <FlatList
        style={styles.products}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={0}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  products: {
    width: "100%",
  },
});
