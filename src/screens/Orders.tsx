import { StyleSheet, SafeAreaView, View, TextInput } from "react-native";
import { useQuery } from "react-query";
import { OrderInterface } from "../Types";
import axios from "axios";
import useAuthStore from "../zustand/AuthStore";
import OrderCard from "../components/OrderCard";
import { useState } from "react";
import { API_URL } from "../../API_URL";

const Orders = () => {
  const [searchText, setSearchText] = useState<string>("");

  const user = useAuthStore((state) => state.user);

  const { data } = useQuery<OrderInterface[]>({
    queryKey: ["Orders"],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/order/listOrder/${user}`)
        .then((res) => res.data),
  });

  const applyFilters = (order: OrderInterface) => {
    if (searchText.trim() !== "") {
      const searchRegex = new RegExp(searchText.trim(), "i");
      if (
        !searchRegex.test(order.userFullName) &&
        !searchRegex.test(order.email) &&
        !searchRegex.test(order.orderJsonList)
      ) {
        return false;
      }
    }

    return true;
  };

  const filteredOrders = data?.filter(applyFilters);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      {filteredOrders?.map((item, key) => (
        <OrderCard key={key} order={item} />
      ))}
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "95%",
  },
  filterInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginRight: 10,
    width: "100%",
  },
});
