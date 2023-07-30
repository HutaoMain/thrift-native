import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigatorParamListType } from "../Types";
import Home from "../screens/Home";
import Product from "../screens/Product";
import Address from "../screens/Address";
import Cart from "../screens/Cart";

const HomeStackNavigation = () => {
  const HomeStack = createNativeStackNavigator<StackNavigatorParamListType>();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Product"
        component={Product}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Address"
        component={Address}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigation;
