import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
} from "react-native";
import useCartStore from "../zustand/CartStore";
import { FontAwesome5 } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";
import { ProductInterface, StackNavigatorParamListType } from "../Types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Prop {
  item: ProductInterface;
}

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const increaseItem = useCartStore((state) => state.increaseItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const total = useCartStore((state) => state.total);

  const navigate =
    useNavigation<NativeStackNavigationProp<StackNavigatorParamListType>>();

  const handlePlaceOrder = async () => {};

  const renderItem = ({ item }: Prop) => (
    <View
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity onPress={() => decreaseItem(item.id)}>
            <FontAwesome5 name="minus-circle" size={20} color="black" />
          </TouchableOpacity>
          <Text>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseItem(item.id)}>
            <FontAwesome5 name="plus-circle" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleGoToAdress = () => {
    navigate.navigate("Address");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={styles.title}>Cart</Text>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <FontAwesome5 name="map-marker-alt" size={24} color="black" />
          <TouchableOpacity onPress={handleGoToAdress}>
            <Text>Address</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Here's what you're getting!</Text>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        }
      />
      <View style={styles.orderSummary}>
        {/* <Text style={styles.title}>Order Summary</Text> */}
        <View>
          {/* <View style={styles.formRow}>
            <Text>Street</Text>
            <TextInput style={styles.input} placeholder="Street" />
          </View> */}
          {/* ... Other address fields with TextInput */}
          {/* <View style={styles.formRow}>
            <Text>Payment method</Text>
            <Picker style={styles.picker}>
              <Picker.Item label="Pickup" value="pickup" />
              <Picker.Item label="COD" value="cod" />
              <Picker.Item label="GCash" value="gcash" />
            </Picker>
          </View> */}
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
});
