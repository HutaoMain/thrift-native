import { NativeStackScreenProps } from "@react-navigation/native-stack";

// interfaces
export interface ProductInterface {
  id: string;
  name: string;
  imageUrl: string[];
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
}

export interface UserAddressInterface {
  id: string;
  email: string;
  contactNumber: string;
  barangay: string;
  street: string;
  municipality: string;
  city: string;
  postalCode: string;
}

export interface UserInterface {
  id: string;
  email: string;
  name: string;
  userRole: string;
}

export interface CategoryInterface {
  id: string;
  categoryName: string;
  description: string;
  imageUrl: string;
}

// orderJsonList: {
//   id: string;
//   imageUrl: string;
//   name: string;
//   description: string;
//   quantity: number;
//   price: number;
// };

export interface OrderInterface {
  id: string;
  userFullName: string;
  email: string;
  totalPrice: number;
  orderJsonList: string;
  status: string;
  modeOfPayment: string;
  dateNow: string;
}

export interface OrderCardInterface {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export interface ProductRatingInterface {
  id: string;
  email: string;
  productId: string;
  rating: number;
}

export interface WishlistInterface {
  id: string;
  productId: string;
  email: string;
  createdDate: string;
}

export interface QrCodeInterface {
  id: string;
  imageQrUrl: string;
}

// types
export type StackNavigatorParamListType = {
  Home: undefined;
  Product: {
    id: string;
    name: string;
    imageUrl: string[];
    description: string;
    price: number;
    quantity: number;
  };
  Cart: undefined;
  Address: undefined;
  Wishlist: undefined;
};

export type ProductStackProps = NativeStackScreenProps<
  StackNavigatorParamListType,
  "Product"
>;

export type AuthStackNavigationType = {
  Login: undefined;
  Register: undefined;
};
