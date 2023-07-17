import { NativeStackScreenProps } from "@react-navigation/native-stack";

export interface ProductInterface {
  id: number;
  image: string;
  name: string;
  details: string;
  price: string;
}

export type StackNavigatorParamListType = {
  Home: undefined;
  ProductSingleScreen: {
    id: number;
    image: string;
    name: string;
    details: string;
    price: string;
  };
  ProductFullImage: {
    image: string;
  };
};

export type ProductStackProps = NativeStackScreenProps<
  StackNavigatorParamListType,
  "ProductSingleScreen"
>;

export type ProductFullImageStackProps = NativeStackScreenProps<
  StackNavigatorParamListType,
  "ProductFullImage"
>;
