import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import {
  ProductStackProps,
  StackNavigatorParamListType,
  WishlistInterface,
} from "../Types";
import { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useAuthStore from "../zustand/AuthStore";
import { useCartStore } from "../zustand/CartStore";
import { FontAwesome5 } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import axios from "axios";
import { Rating } from "react-native-ratings";
import { useIsFocused } from "@react-navigation/native";
import { API_URL } from "../../API_URL";

const Product = ({ route }: ProductStackProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorParamListType>>();
  const { id, name, imageUrl, description, price, quantity } = route.params;

  const [useStateQuantity, setUseStateQuantity] = useState<number>(1);
  const [disable, setDisable] = useState<boolean>(false);

  const isFocused = useIsFocused();
  const [productRating, setProductRating] = useState<number>();

  const user = useAuthStore((state) => state.user);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${API_URL}/api/productRating/productId/${id}`
      );
      setProductRating(res.data);
    };
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
  }, []);

  const handleQuantity = (type: string) => {
    if (type === "dec") {
      useStateQuantity > 1 && setUseStateQuantity(useStateQuantity - 1);
    } else {
      quantity > 0 && setUseStateQuantity(useStateQuantity + 1);
    }

    if (useStateQuantity >= quantity) {
      setUseStateQuantity(0);
    }
  };

  const handleAddToCart = () => {
    const product = {
      id: id,
      name: name,
      imageUrl: imageUrl?.[0],
      description: description,
      price: price * useStateQuantity,
      quantity: useStateQuantity,
    };
    if (quantity > 0) {
      addItem(product, useStateQuantity);
      Toast.show({
        type: "success",
        text1: `${name} added to your cart.`,
      });
    } else {
      alert("Quantity is 0");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const wishlist = await axios.get(`${API_URL}/api/wishlist/${user}`);

      if (
        wishlist.data.find((item: WishlistInterface) => item.productId === id)
      ) {
        Toast.show({
          type: "info",
          text1: "Product already in wishlist",
        });
        setDisable(true);
      } else {
        await axios.post(`${API_URL}/api/wishlist/create`, {
          productId: id,
          email: user,
        });
        Toast.show({
          type: "success",
          text1: "Added to wishlist",
        });
        setDisable(true);
        setTimeout(() => setDisable(false), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={imageUrl}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        keyExtractor={(index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.priceQuantityContainer}>
          <Text style={styles.price}>₱{price * useStateQuantity}.00</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleQuantity("dec")}>
              <FontAwesome5 name="minus-circle" size={20} color="black" />
            </TouchableOpacity>
            <TextInput
              style={{ fontSize: 20, textAlign: "center" }}
              keyboardType="numeric"
              value={useStateQuantity.toString()}
              onChangeText={(value) => {
                const parsedValue = parseInt(value);
                if (!isNaN(parsedValue)) {
                  setUseStateQuantity(parsedValue);
                  if (parsedValue > quantity) {
                    Alert.alert(`The quantity cannot be more than ${quantity}`);
                    setUseStateQuantity(quantity);
                  }
                }
              }}
              editable={quantity > 0}
            />
            <TouchableOpacity onPress={() => handleQuantity("inc")}>
              <FontAwesome5 name="plus-circle" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.description}>{description}</Text>
        <Rating
          type="star"
          imageSize={30}
          startingValue={productRating}
          readonly={true}
          // ratingCount={productRating}
          onFinishRating={setProductRating}
        />
        <Pressable onPress={handleAddToCart} style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
        <Pressable
          disabled={disable}
          onPress={handleAddToWishlist}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add to Wishlist</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: 400,
    height: 400,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00205C",
    paddingVertical: 10,
  },
  priceQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00205C",
  },
  quantity: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  description: {
    fontSize: 16,
    color: "#777",
    marginTop: 10,
    textAlign: "justify",
  },
  button: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#00205C",
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
  },
});
