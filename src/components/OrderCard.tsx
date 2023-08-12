import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { OrderInterface } from "../Types";
import { Rating } from "react-native-ratings";
import useAuthStore from "../zustand/AuthStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../API_URL";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

interface Props {
  order: OrderInterface;
  refreshing: boolean;
}

const OrderCard = ({ order, refreshing }: Props) => {
  const orderData = JSON.parse(order.orderJsonList);

  const [productRating, setProductRating] = useState<number>();
  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const user = useAuthStore((state) => state.user);

  const saveRating = async (newRating: number) => {
    console.log(newRating);
    try {
      const response = await axios.post(`${API_URL}/api/productRating/rate`, {
        rating: newRating,
        email: user,
        productId: orderData[0]?.id,
      });
      setProductRating(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${API_URL}/api/productRating/${user}/${orderData[0]?.id}`
      );
      setProductRating(res.data);
    };
    fetchData();
  }, [orderData, refreshing]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.canceled) {
      let base64Img = `data:image/jpg;base64,${result.assets?.[0].base64}`;

      setImageBase64(base64Img);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!imageBase64) {
        console.error("No image selected");
        return;
      }

      let data = {
        file: imageBase64,
        upload_preset: "upload",
      };

      fetch("https://api.cloudinary.com/v1_1/alialcantara/image/upload", {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(async (r) => {
          let data = await r.json();
          setImageUrl(data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));

      console.log(imageUrl);

      console.log(orderData[0]?.id);

      setTimeout(async () => {
        await axios.put(
          `${API_URL}/api/order/update/proofPayment/${order.id}`,
          {
            proofPayment: imageUrl,
          }
        );
      }, 1000);

      Toast.show({
        type: "success",
        text1: "Successfully upload your receipt.",
      });
      setImageBase64("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <Text style={{ paddingRight: 10 }}>{order.status}</Text>
        <Text>{order.dateNow}</Text>
      </View>
      <View style={styles.productDetails}>
        <Image source={{ uri: orderData[0].imageUrl }} style={styles.image} />
        <View>
          <Text style={styles.name}>{orderData[0]?.name}</Text>
          <Text style={styles.description}>{orderData[0]?.description}</Text>
          <Text style={styles.price}>Price: ₱{orderData[0]?.price}.00</Text>
          <Text style={styles.quantity}>
            Quantity: {orderData[0]?.quantity}
          </Text>
        </View>
      </View>

      <Text style={{ paddingVertical: 10 }}>
        Total Price: ₱{order.totalPrice}.00
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ fontSize: 13 }}>Please rate the product</Text>
        <Rating
          type="star"
          imageSize={25}
          startingValue={productRating}
          onFinishRating={(newValue: number) => {
            saveRating(newValue);
          }}
        />
      </View>

      {imageBase64 ? (
        <>
          <Image
            source={
              imageBase64
                ? { uri: imageBase64 }
                : {
                    uri: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
                  }
            }
            style={{ width: 100, height: 100 }}
          />
          <TouchableOpacity
            onPress={handleImageUpload}
            style={styles.uploadButton}
          >
            <Text style={styles.uploadButtonText}>Submit Receipt</Text>
          </TouchableOpacity>
        </>
      ) : order.proofPayment ? (
        <Text
          style={{
            textAlign: "center",
            paddingTop: 20,
            fontWeight: "bold",
          }}
        >
          Done uploading receipt
        </Text>
      ) : (
        <TouchableOpacity
          // onPress={fileTypeChecking}
          onPress={() => pickImage()}
          style={styles.uploadButton}
        >
          <Text style={styles.uploadButtonText}>
            Upload the image of category here...
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    width: "100%",
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#ccc",
    borderBottomColor: "#ccc",
    backgroundColor: "white",
  },
  productDetails: {
    flexDirection: "row",
    width: "70%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#888",
  },
  price: {
    fontSize: 16,
  },
  quantity: {
    fontSize: 16,
  },
  uploadButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
