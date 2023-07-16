import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <Text style={styles.searchText}>Search</Text>
      <Text style={styles.filterIcon}>🔎</Text>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    width: "100%",
    height: 50,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  searchText: {
    fontSize: 20,
    color: "#333",
  },
  filterIcon: {
    fontSize: 24,
    color: "#333",
  },
});
