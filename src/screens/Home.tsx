import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import React from "react";
import ProductCard, { SearchBar } from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Vintage denim jacket",
    price: "$25",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmludGFnZSUyMGRlbmltJTIwamFja2V0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Floral dress",
    price: "$15",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmxvcmFsJTIwZHJlc3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Leather boots",
    price: "$35",
    image:
      "https://i2.wp.com/thesimplegentleman.com/wp-content/uploads/2017/01/tsg-leather-boots-mens.jpg?fit=1920%2C1080",
  },
];

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});
