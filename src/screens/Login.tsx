import {
  View,
  Text,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = () => {
    // TODO: add your login logic here
    Alert.alert("Login successful");
    //   navigation.navigate('RegistrationScreen'); //TODO navigate to HomePage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    width: "80%",
    height: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
  },
});
