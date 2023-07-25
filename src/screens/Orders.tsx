import { StyleSheet, SafeAreaView, View, TextInput } from "react-native";
import { useQuery } from "react-query";
import { OrderInterface } from "../Types";
import axios from "axios";
import { API_URL } from "@env";
import useAuthStore from "../zustand/AuthStore";
import OrderCard from "../components/OrderCard";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const Orders = () => {
  //   const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  //   const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  //   const [statusFilter, setStatusFilter] = useState<string | undefined>(
  //     undefined
  //   );
  const [searchText, setSearchText] = useState<string>("");
  //   const [sortBy, setSortBy] = useState<"price" | "date" | undefined>(undefined);
  //   const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
  //     undefined
  //   );

  const user = useAuthStore((state) => state.user);

  const { data } = useQuery<OrderInterface[]>({
    queryKey: ["Orders"],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/order/listOrder/${user}`)
        .then((res) => res.data),
  });

  const applyFilters = (order: OrderInterface) => {
    // Apply existing filters (minPrice, maxPrice, statusFilter)
    // if (minPrice !== undefined && order.totalPrice < minPrice) {
    //   return false;
    // }
    // if (maxPrice !== undefined && order.totalPrice > maxPrice) {
    //   return false;
    // }
    // if (statusFilter && order.status !== statusFilter) {
    //   return false;
    // }

    // Apply search filter
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

  //   const sortedOrders = filteredOrders?.sort((a: any, b: any) => {
  //     if (!sortBy || !sortOrder) return 0;
  //     const fieldA = sortBy === "price" ? a.totalPrice : new Date(a.dateNow);
  //     const fieldB = sortBy === "price" ? b.totalPrice : new Date(b.dateNow);

  //     if (sortOrder === "asc") {
  //       return fieldA - fieldB;
  //     } else {
  //       return fieldB - fieldA;
  //     }
  //   });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        {/* <Picker
          selectedValue={sortBy}
          onValueChange={(itemValue) => setSortBy(itemValue)}
        >
          <Picker.Item label="Sort by" value={undefined} />
          <Picker.Item label="Price (Low to High)" value="price" />
          <Picker.Item label="Price (High to Low)" value="price_desc" />
          <Picker.Item label="Date (Old to New)" value="date" />
          <Picker.Item label="Date (New to Old)" value="date_desc" />
        </Picker>
        <Picker
          selectedValue={sortOrder}
          onValueChange={(itemValue) => setSortOrder(itemValue)}
        >
          <Picker.Item label="Sort order" value={undefined} />
          <Picker.Item label="Ascending" value="asc" />
          <Picker.Item label="Descending" value="desc" />
        </Picker> */}
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
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
