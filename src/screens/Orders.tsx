import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native";
import { useQuery } from "react-query";
import { OrderInterface } from "../Types";
import axios from "axios";
import useAuthStore from "../zustand/AuthStore";
import OrderCard from "../components/OrderCard";
import { useState } from "react";
import { API_URL } from "../../API_URL";
import useNotificationCountStore from "../zustand/NotificationCountStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Orders = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);

  const clearUser = useAuthStore((state) => state.clearUser);

  const setPendingOrderCount = useNotificationCountStore(
    (item) => item.setPendingOrderCount
  );

  const user = useAuthStore((state) => state.user);

  const { data, refetch } = useQuery<OrderInterface[]>({
    queryKey: ["Orders", searchText],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/order/listOrder/${user}`)
        .then((res) => res.data),
    enabled: !refreshing,
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);

    const updatedPendingOrderCount =
      filteredOrders?.filter((item) => item.status === "Pending").length || 0;

    setPendingOrderCount(updatedPendingOrderCount);

    await AsyncStorage.setItem(
      "happy-thrift-pending-order-count",
      updatedPendingOrderCount.toString()
    );
  };

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

  const statusOrder = ["pending", "to ship", "cancelled", "completed"];

  // Sort function to sort orders based on their status
  const compareOrdersByStatus = (
    orderA: OrderInterface,
    orderB: OrderInterface
  ) => {
    const statusA = orderA.status.toLowerCase();
    const statusB = orderB.status.toLowerCase();
    return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
  };

  const filteredOrders = data
    ?.filter(applyFilters)
    ?.sort(compareOrdersByStatus);

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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {filteredOrders?.map((item, key) => (
          <OrderCard key={key} order={item} refreshing={refreshing} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={clearUser}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  button: {
    borderWidth: 1,
    borderColor: "black",
    width: 350,
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 30,
  },
  buttonText: {
    color: "black",
  },
});
