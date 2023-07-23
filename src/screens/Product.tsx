import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { ProductStackProps, StackNavigatorParamListType } from "../Types";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useAuthStore from "../zustand/AuthStore";
import { useCartStore } from "../zustand/CartStore";
import { FontAwesome5 } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const Product = ({ route }: ProductStackProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorParamListType>>();
  const { id, name, imageUrl, description, price, quantity } = route.params;

  const [useStateQuantity, setUseStateQuantity] = useState<number>(1);

  const user = useAuthStore((state) => state.user);
  const addItem = useCartStore((state) => state.addItem);

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
      imageUrl: imageUrl,
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

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
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

        <Pressable onPress={handleAddToCart} style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
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
