import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFilterPress = () => {
    // Implement your filter logic here
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category: any) => {
    // Implement your category selection logic here
    console.log(`Selected category: ${category}`);
  };

  return (
    <View style={styles.searchContainer}>
      <Ionicons
        style={styles.searchIcon}
        name="ios-search"
        size={20}
        color="#000"
      />
      <TextInput style={styles.input} placeholder="Search product here.." />

      <TouchableOpacity
        style={styles.filterContainer}
        onPress={handleFilterPress}
      >
        <Ionicons name="filter" size={20} color="#000" />
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.categoryDropdown}>
          <Text style={styles.categoryLabel}>Category:</Text>
          <TouchableOpacity onPress={() => handleCategorySelect("Category 1")}>
            <Text>Category 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect("Category 2")}>
            <Text>Category 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect("Category 3")}>
            <Text>Category 3</Text>
          </TouchableOpacity>
          {/* Add more category options as needed */}
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 10,
    position: "relative", // Added position relative to parent container
    zIndex: 3, // works on ios
    elevation: 3,
  },
  searchIcon: {
    padding: 10,
    paddingLeft: 20,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
    color: "#424242",
    borderRadius: 15,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#000",
  },
  filterText: {
    marginLeft: 5,
  },
  categoryDropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%", // Expanded to the full width of the parent container
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
  },
  categoryLabel: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
