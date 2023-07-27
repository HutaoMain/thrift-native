import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import { Rating } from "react-native-ratings";
import { ProductStackProps } from "../Types";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { API_URL } from "../../API_URL";

const WishlistCard = ({ product }: any) => {
  const navigation = useNavigation<ProductStackProps["navigation"]>();

  const isFocused = useIsFocused();
  const [productRating, setProductRating] = useState<number>();

  const handleNavigate = () => {
    navigation.navigate("Product", {
      id: product?.product?.id,
      name: product?.product?.name,
      imageUrl: product?.product?.imageUrl,
      description: product?.product?.description,
      price: product?.product?.price,
      quantity: product?.product?.quantity,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${API_URL}/api/productRating/productId/${product?.product?.id}`
      );
      setProductRating(res.data);
    };
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  return (
    <Pressable style={styles.card} onPress={handleNavigate}>
      <Image
        source={{ uri: product?.product?.imageUrl?.[0] }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{product?.product?.name}</Text>
        <Text style={styles.description}>{product?.product?.description}</Text>
        <Rating
          type="star"
          imageSize={30}
          startingValue={productRating}
          readonly={true}
        />
        <Text style={styles.price}>₱{product?.product?.price}</Text>
        <Text style={styles.quantity}>
          Quantity: {product?.product?.quantity}
        </Text>
      </View>
    </Pressable>
  );
};

export default WishlistCard;

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
