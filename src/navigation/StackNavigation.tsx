import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductSingleScreen from "../screens/ProductSingleScreen";
import { StackNavigatorParamListType } from "../Types";
import ProductFullImage from "../components/ProductFullImage";
import Home from "../screens/Home";

const StackNavigation = () => {
  const Stack = createNativeStackNavigator<StackNavigatorParamListType>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductSingleScreen"
        component={ProductSingleScreen}
      />
      <Stack.Screen name="ProductFullImage" component={ProductFullImage} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
