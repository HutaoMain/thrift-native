import { Text, StyleSheet, SafeAreaView } from "react-native";
import Orders from "./Orders";

const Account = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20 }}>Order History</Text>
      <Orders />
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },
});
