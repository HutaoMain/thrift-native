import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// A sample array of objects containing products from a thrift store

// A function that renders a single product card
const ProductCard = ({ product }: any) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
    </View>
  );
};

// A function that renders a search bar and filter icon at the top of the card
const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <Text style={styles.searchText}>Search</Text>
      <Text style={styles.filterIcon}>🔎</Text>
    </View>
  );
};

// A stylesheet that defines the styles for the components
const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 300,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: "#888",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  searchBar: {
    width: "100%",
    height: 50,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  searchText: {
    fontSize: 20,
    color: "#333",
  },
  filterIcon: {
    fontSize: 24,
    color: "#333",
  },
});

export default ProductCard;
export { SearchBar };
