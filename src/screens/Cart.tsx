import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import useCartStore from "../zustand/CartStore";
import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import {
  StackNavigatorParamListType,
  UserAddressInterface,
  UserInterface,
} from "../Types";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import axios from "axios";
import useAuthStore from "../zustand/AuthStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import { API_URL } from "../../API_URL";

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const increaseItem = useCartStore((state) => state.increaseItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const total = useCartStore((state) => state.total);
  const clearCartFromStorage = useCartStore(
    (state) => state.clearCartFromStorage
  );

  const user = useAuthStore((state) => state.user);

  const [userData, setUserData] = useState<UserInterface>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("gcash");
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);

  const { data } = useQuery<UserAddressInterface>({
    queryKey: ["Address"],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/user-address/byEmail/${user}`)
        .then((res) => res.data),
  });

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await axios.get(`${API_URL}/api/user/${user}`);
        setUserData(res.data);
      };
      fetch();
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  const navigate =
    useNavigation<NativeStackNavigationProp<StackNavigatorParamListType>>();

  const itemsToString = JSON.stringify(items);

  console.log(items);

  const handlePlaceOrder = async () => {
    const orderData = {
      products: items.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
      email: user,
      userFullName: userData?.name,
      totalPrice: total,
      orderJsonList: itemsToString,
      status: "Pending",
      modeOfPayment: selectedPaymentMethod,
      dateNow: dayjs().format("YYYY-MM-DD hh:mma"),

      barangay: data?.barangay,
      street: data?.street,
      municipality: data?.municipality,
      city: data?.street,
      postalCode: data?.postalCode,
      contactNumber: data?.contactNumber,
    };

    try {
      console.log("here");
      await axios.post(`${API_URL}/api/order/create`, orderData);
      console.log("here after");

      Toast.show({
        type: "success",
        text1: "Successfully checkout your orders.",
      });

      if (selectedPaymentMethod === "gcash") {
        setImageModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToAdress = () => {
    navigate.navigate("Address");
  };

  const handleCloseModal = () => {
    clearCartFromStorage();
    navigate.navigate("Home");
    setImageModalVisible(false);
  };

  const handlePaymentMethodChange = (itemValue: string) => {
    setSelectedPaymentMethod(itemValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={styles.title}>Cart</Text>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <FontAwesome5 name="map-marker-alt" size={24} color="black" />
          <TouchableOpacity onPress={handleGoToAdress}>
            <Text style={{ width: 250, flexWrap: "wrap" }}>
              {data
                ? data.street +
                  " " +
                  data.barangay +
                  " " +
                  data.municipality +
                  " " +
                  data.city +
                  " " +
                  data.postalCode
                : "Address"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <ScrollView>
          {items.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>
                Here's what you're getting!
              </Text>
              {items.map((item) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: "rgb(220, 220, 220)",
                    padding: 10,
                  }}
                >
                  <View style={styles.productDetails}>
                    <Image
                      style={styles.checkoutImage}
                      source={{ uri: item.imageUrl }}
                      resizeMode="contain"
                    />
                    <View style={styles.productInfo}>
                      <Text>{item.name}</Text>
                      <Text>₱{item.price}.00</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <TouchableOpacity onPress={() => decreaseItem(item.id)}>
                        <FontAwesome5
                          name="minus-circle"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                      <Text>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => increaseItem(item.id)}>
                        <FontAwesome5
                          name="plus-circle"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          )}
        </ScrollView>
        <View style={styles.orderSummary}>
          <View>
            <View style={styles.formRow}>
              <Text>Payment method</Text>
              <Picker
                style={styles.picker}
                selectedValue={selectedPaymentMethod}
                onValueChange={handlePaymentMethodChange}
              >
                <Picker.Item label="GCash" value="gcash" />
                <Picker.Item label="COD" value="cod" />
              </Picker>
            </View>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={styles.title}>Order Details:</Text>
            <View style={styles.orderDetails}>
              <Text>{items.length} items</Text>
              <Text>₱{total}</Text>
            </View>
            <View style={styles.totalAmount}>
              <Text>TOTAL</Text>
              <Text>₱{total}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: total === 0 ? "gray" : "#00205C" },
              ]}
              onPress={handlePlaceOrder}
              disabled={total === 0}
            >
              <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {imageModalVisible && (
        <Modal style={styles.modalContainer}>
          <View
            style={{
              alignItems: "center",
              paddingTop: 70,
              height: "100%",
            }}
          >
            <Image
              source={require("../../assets/happy-thrift-qr.jpg")}
              style={styles.modalImage}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 24,
  },
  checkoutProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkoutImage: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  quantityButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderSummary: {
    marginTop: 24,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 8,
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#00205C",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  // Modal
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: "100%",
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  closeButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#00205C",
    textAlign: "center",
  },
});
