import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import useAuthStore from "../zustand/AuthStore";
import Orders from "./Orders";

const Account = () => {
  const clearUser = useAuthStore((state) => state.clearUser);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Order History</Text>
      <Orders />
      <TouchableOpacity style={styles.button} onPress={clearUser}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    display: "flex",
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    position: "absolute",
    bottom: 10,
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 20,

    display: "flex",
    alignItems: "center",

    borderRadius: 10,
  },
  buttonText: {
    color: "black",
  },
});
