import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductCard = ({ product }: any) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: 175,
    height: 300,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: "relative",
  },
  image: {
    width: 175,
    height: 300,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    bottom: 35,
    paddingLeft: 15,
    color: "#ffff",
  },
  price: {
    fontSize: 16,
    position: "absolute",
    bottom: 10,
    paddingLeft: 15,
    color: "#ffff",
  },
});
