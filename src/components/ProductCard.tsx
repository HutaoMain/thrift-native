import React from "react";
import { Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProductInterface, ProductStackProps } from "../Types";

interface Props {
  product: ProductInterface;
}

const ProductCard = ({ product }: Props) => {
  const navigation = useNavigation<ProductStackProps["navigation"]>();

  const handleNavigate = () => {
    navigation.navigate("ProductSingleScreen", {
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      details: product.details,
    });
  };

  return (
    <Pressable style={styles.card} onPress={handleNavigate}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: "45%",
    height: 300,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: "relative",
    zIndex: 0, // works on ios
    elevation: 0,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
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
