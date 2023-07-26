import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

import { ProductInterface } from "../Types";
import axios from "axios";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  const [filteredData, setFilteredData] = useState<ProductInterface[]>([]);
  const [productData, setProductData] = useState<ProductInterface[]>([]);
  const [category, setCategory] = useState<string | undefined>(undefined); // add a state for category
  const [searchKeyword, setSearchKeyword] = useState<string>(""); // add a state for search keyword

  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/product/list`);
        setProductData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  }, []);

  const handleFilter = (
    category: string | undefined,
    searchKeyword: string
  ) => {
    // update the category and searchKeyword states
    setCategory(category);
    setSearchKeyword(searchKeyword);
  };

  useEffect(() => {
    // apply the same filter logic as in handleFilter
    let filteredProducts = productData;
    if (category) {
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
  }, [productData]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onFilter={handleFilter} />
      <ScrollView style={styles.products}>
        {filteredData?.map((item, key) => (
          <ProductCard product={item} key={key} />
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
