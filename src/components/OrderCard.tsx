import { View, SafeAreaView, Text, StyleSheet, Image } from "react-native";
import { OrderInterface, ProductRatingInterface } from "../Types";
import StarRating from "react-native-star-rating-widget";
import useAuthStore from "../zustand/AuthStore";
import { API_URL } from "@env";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  order: OrderInterface;
}

const OrderCard = ({ order }: Props) => {
  const orderData = JSON.parse(order.orderJsonList);

  const [productRating, setProductRating] = useState<number>();

  const user = useAuthStore((state) => state.user);

  console.log(productRating);

  const saveRating = async (newRating: number) => {
    console.log(newRating);
    try {
      const response = await axios.post(`${API_URL}/api/productRating/rate`, {
        rating: newRating,
        email: user,
        productId: orderData[0]?.id,
      });
      setProductRating(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${API_URL}/api/productRating/${user}/${orderData[0]?.id}`
      );
      setProductRating(res.data);
    };
    fetchData();
  }, [productRating]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <Text>{order.status}</Text>
        <Text>{order.dateNow}</Text>
      </View>
      <View style={styles.productDetails}>
        <Image source={{ uri: orderData[0].imageUrl }} style={styles.image} />
        <View>
          <Text style={styles.name}>{orderData[0]?.name}</Text>
          <Text style={styles.description}>{orderData[0]?.description}</Text>
          <Text style={styles.price}>Price: ₱{orderData[0]?.price}.00</Text>
          <Text style={styles.quantity}>
            Quantity: {orderData[0]?.quantity}
          </Text>
        </View>
      </View>

      <Text style={{ paddingVertical: 10 }}>
        Total Price: ₱{order.totalPrice}.00
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ fontSize: 13 }}>Please rate the product</Text>
        <StarRating
          rating={productRating || 0}
          onChange={(newValue) => {
            saveRating(newValue);
          }}
          starSize={27}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#ccc",
    borderBottomColor: "#ccc",
  },
  productDetails: {
    flexDirection: "row",
    width: "70%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#888",
  },
  price: {
    fontSize: 16,
  },
  quantity: {
    fontSize: 16,
  },
});