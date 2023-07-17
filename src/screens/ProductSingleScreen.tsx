import { View, Image, Pressable, Text } from "react-native";
import { ProductFullImageStackProps, ProductStackProps } from "../Types";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const ProductSingleScreen = ({ route }: ProductStackProps) => {
  const navigation = useNavigation();
  const { details, image, name, price } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: "none" }, headerShown: false });
  }, []);

  const handleImagePress = () => {};

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Pressable onPress={handleImagePress}>
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: "75%",
            resizeMode: "cover",
            backgroundColor: "black",
          }}
        />
      </Pressable>
      <Text style={{ padding: 10, fontSize: 30 }}>{name}</Text>
      <Text
        style={{
          padding: 10,
          backgroundColor: "gray",
          color: "#ffff",
          textAlign: "center",
        }}
      >
        ---Product Details---
      </Text>
      <Text>{details}</Text>
    </View>
  );
};

export default ProductSingleScreen;
