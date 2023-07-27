import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import useAuthStore from "../zustand/AuthStore";
import Orders from "./Orders";

const Account = () => {
  const clearUser = useAuthStore((state) => state.clearUser);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Order History</Text>
      <ScrollView>
        <Orders />
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={clearUser}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    backgroundColor: "white",
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
  },
});
