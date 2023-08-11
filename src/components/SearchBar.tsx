import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "react-query";
import { CategoryInterface } from "../Types";
import axios from "axios";
import { API_URL } from "../../API_URL";

interface SearchBarProps {
  onFilter: (category: string | undefined, searchKeyword: string) => void;
}

const SearchBar = ({ onFilter }: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);

  const { data } = useQuery<CategoryInterface[]>({
    queryKey: ["SearchBar"],
    queryFn: () =>
      axios.get(`${API_URL}/api/category/list`).then((res) => res.data),
  });

  const handleFilterPress = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (id: string | undefined) => {
    setSelectedCategoryId(id);
    onFilter(id, "");
    setIsOpen(false);
  };

  const handleSearchKeywordChange = (searchKeyword: string) => {
    onFilter(selectedCategoryId, searchKeyword);
  };

  return (
    <View style={styles.searchContainer}>
      <Ionicons
        style={styles.searchIcon}
        name="ios-search"
        size={20}
        color="#000"
      />
      <TextInput
        style={styles.input}
        placeholder="Search product here.."
        onChangeText={handleSearchKeywordChange}
      />

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
          <TouchableOpacity onPress={() => handleCategorySelect(undefined)}>
            <Text>All</Text>
          </TouchableOpacity>
          {data?.map((item, key) => {
            return (
              <TouchableOpacity
                onPress={() => handleCategorySelect(item.id)}
                key={key}
              >
                <Text>{item.categoryName}</Text>
              </TouchableOpacity>
            );
          })}
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
