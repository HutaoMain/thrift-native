import { NativeStackScreenProps } from "@react-navigation/native-stack";

// interfaces
export interface ProductInterface {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  quantity: number;
}

// types
export type StackNavigatorParamListType = {
  Home: undefined;
  Product: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    quantity: number;
  };
  ProductFullImage: {
    image: string;
  };
  Address: undefined;
};

export type ProductStackProps = NativeStackScreenProps<
  StackNavigatorParamListType,
  "Product"
>;

export type ProductFullImageStackProps = NativeStackScreenProps<
  StackNavigatorParamListType,
  "ProductFullImage"
>;

export type AuthStackNavigationType = {
  Login: undefined;
  Register: undefined;
};
