import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductSingleScreen from "../screens/Product";
import { StackNavigatorParamListType } from "../Types";
import ProductFullImage from "../components/ProductFullImage";
import Home from "../screens/Home";
import Product from "../screens/Product";
import Address from "../screens/Address";

const HomeStackNavigation = () => {
  const HomeStack = createNativeStackNavigator<StackNavigatorParamListType>();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Product" component={Product} />
      <HomeStack.Screen name="Address" component={Address} />
      <HomeStack.Screen name="ProductFullImage" component={ProductFullImage} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigation;
