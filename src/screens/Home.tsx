import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

import { ProductInterface } from "../Types";
import axios from "axios";
import { API_URL } from "../../API_URL";

const Home = () => {
  const [filteredData, setFilteredData] = useState<ProductInterface[]>([]);
  const [productData, setProductData] = useState<ProductInterface[]>([]);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/product/list`);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchProductData = async () => {
    const data = await fetchData();
    setProductData(data);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProductData();
    setRefreshing(false);
  };

  const handleFilter = (
    category: string | undefined,
    searchKeyword: string
  ) => {
    setCategory(category);
    setSearchKeyword(searchKeyword);
  };

  useEffect(() => {
    let filteredProducts = productData;
    if (category !== undefined) {
      filteredProducts = filteredProducts?.filter(
        (product) => product.categoryId === category
      );
    }
    if (searchKeyword) {
      filteredProducts = filteredProducts?.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    setFilteredData(filteredProducts || []);
  }, [productData, category, searchKeyword]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onFilter={handleFilter} />
      <ScrollView
        style={styles.products}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {filteredData?.map((item, key) => (
          <ProductCard product={item} key={key} refreshing={refreshing} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  products: {
    width: "100%",
  },
});
