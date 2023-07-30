import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../zustand/AuthStore";
import Toast from "react-native-toast-message";
import { useQuery } from "react-query";
import { UserAddressInterface } from "../Types";
import { API_URL } from "../../API_URL";
import { useNavigation } from "@react-navigation/native";

const Address = () => {
  const [contactNumber, setContactNumber] = useState<string>("");
  const [barangay, setBarangay] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [municipality, setMunicipality] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");

  const user = useAuthStore((state) => state.user);

  const navigate = useNavigation();

  const { data } = useQuery<UserAddressInterface>({
    queryKey: ["Address"],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/user-address/byEmail/${user}`)
        .then((res) => res.data),
  });

  useEffect(() => {
    setContactNumber(data?.contactNumber || "");
    setBarangay(data?.barangay || "");
    setStreet(data?.street || "");
    setMunicipality(data?.municipality || "");
    setCity(data?.city || "");
    setPostalCode(data?.postalCode || "");
  }, [data]);

  const handleSaveAddress = async () => {
    try {
      await axios.post(`${API_URL}/api/user-address/create`, {
        email: user,
        contactNumber: contactNumber,
        barangay: barangay,
        street: street,
        municipality: municipality,
        city: city,
        postalCode: postalCode,
      });
      Toast.show({
        type: "success",
        text1: "Successfully saved your address.",
      });
      navigate.goBack();
    } catch (error) {
      console.log();
    }
  };

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        gap: 10,
        paddingHorizontal: 15,
      }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={(text) => setContactNumber(text)}
          placeholder="Contact Number"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          value={barangay}
          onChangeText={(text) => setBarangay(text)}
          placeholder="Barangay"
        />

        <TextInput
          style={styles.input}
          value={street}
          onChangeText={(text) => setStreet(text)}
          placeholder="Street"
        />

        <TextInput
          style={styles.input}
          value={municipality}
          onChangeText={(text) => setMunicipality(text)}
          placeholder="Municipality"
        />

        <TextInput
          style={styles.input}
          value={city}
          onChangeText={(text) => setCity(text)}
          placeholder="City"
        />

        <TextInput
          style={styles.input}
          value={postalCode}
          onChangeText={(text) => setPostalCode(text)}
          placeholder="Postal Code"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity onPress={handleSaveAddress} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "rgb(220, 220, 220)", // Grayish or dirty white color
    padding: 10,
    marginBottom: 10,
    width: "95%",
  },
  saveButton: {
    backgroundColor: "#00205C",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
