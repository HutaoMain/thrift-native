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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackNavigationType } from "../Types";
import axios from "axios";
import useAuthStore from "../zustand/AuthStore";
import { API_URL } from "../../API_URL";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const setUser = useAuthStore((state) => state.setUser);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackNavigationType>>();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/user/login`, {
        email: email,
        password: password,
      });
      setLoading(false);
      setUser(email);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleGoToRegisterScreen = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Happy Thrift</Text>
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
        <Text style={styles.buttonText}>
          {loading ? "Logging in.." : "Login"}
        </Text>
      </TouchableOpacity>
      <Text>or</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleGoToRegisterScreen}
      >
        <Text style={styles.buttonText}>No account yet? Click here</Text>
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
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
  },
});
