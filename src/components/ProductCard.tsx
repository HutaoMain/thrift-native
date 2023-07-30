import React, { useState } from "react";
import { Text, Image, StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProductInterface, ProductStackProps } from "../Types";
import { useEffect } from "react";
import axios from "axios";
import { Rating } from "react-native-ratings";
import { useIsFocused } from "@react-navigation/native";
import { API_URL } from "../../API_URL";

interface Props {
  product: ProductInterface;
  refreshing: boolean;
}

const ProductCard = ({ product, refreshing }: Props) => {
  const navigation = useNavigation<ProductStackProps["navigation"]>();

  const isFocused = useIsFocused();
  const [productRating, setProductRating] = useState<number>();

  const handleNavigate = () => {
    navigation.navigate("Product", {
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${API_URL}/api/productRating/productId/${product.id}`
      );
      setProductRating(res.data);
    };
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, refreshing]);

  console.log(productRating);

  return (
    <Pressable style={styles.card} onPress={handleNavigate}>
      <Image source={{ uri: product.imageUrl?.[0] }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Rating
          type="star"
          imageSize={30}
          startingValue={productRating}
          readonly={true}
          // ratingCount={productRating}
          onFinishRating={setProductRating}
        />
        <Text style={styles.price}>₱{product.price}</Text>
        <Text style={styles.quantity}>Quantity: {product.quantity}</Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingLeft: 10,
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
    paddingLeft: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00a",
    marginTop: 10,
    paddingLeft: 10,
  },
  quantity: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
    paddingLeft: 10,
  },
});
