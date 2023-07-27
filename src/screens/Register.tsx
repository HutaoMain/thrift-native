import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackNavigationType } from "../Types";
import Toast from "react-native-toast-message";
import axios from "axios";
import { API_URL } from "../../API_URL";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackNavigationType>>();

  const handleRegistration = async () => {
    try {
      if (password !== confirmPassword) {
        Toast.show({
          type: "error",
          text1: `Password do not match.`,
        });
        return;
      }

      await axios.post(`${API_URL}/api/user/register`, {
        email: email,
        name: name,
        password: password,
      });
      Toast.show({
        type: "success",
        text1: `Successfully registered your account.`,
      });
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoBackToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[
          styles.button,
          email && name && password && confirmPassword
            ? styles.buttonEnabled
            : styles.buttonDisabled,
        ]}
        onPress={handleRegistration}
        disabled={!email || !name || !password || !confirmPassword}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoBackToLogin}>
        <Text style={styles.buttonText}>Go back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

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
  buttonEnabled: {
    backgroundColor: "#00f",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 16,
  },
});
