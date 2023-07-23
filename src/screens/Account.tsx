import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import useAuthStore from "../zustand/AuthStore";

const Account = () => {
  const clearUser = useAuthStore((state) => state.clearUser);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Account</Text>
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
    height: "100%",

    display: "flex",
    alignItems: "center",
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
