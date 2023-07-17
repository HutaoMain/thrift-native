import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import Home from "./screens/Home";
import Account from "./screens/Account";
import Cart from "./screens/Cart";
import { TouchableOpacity, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductSingleScreen from "./screens/ProductSingleScreen";
import { StackNavigatorParamListType } from "./Types";
import ProductFullImage from "./components/ProductFullImage";

const Stack = createNativeStackNavigator<StackNavigatorParamListType>();

const Tab = createBottomTabNavigator();

// here is the stack navigator

const ProductStack = () => {
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

/* here is the parent bottom tab function */
const TabGroup = () => {
  /* here is the avatar function */
  const renderHeaderRight = () => {
    const avatarUrl =
      "https://aphrodite.gmanetwork.com/imagefiles/1000/1543821638_1647458010_12_ent.jpg";

    return (
      <TouchableOpacity onPress={() => console.log("Avatar pressed")}>
        <Image
          source={{ uri: avatarUrl }}
          style={{ width: 40, height: 40, borderRadius: 15, marginRight: 20 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName: any;

          if (route.name === "ProductStack") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? "#873BFF" : "#DFDFDF"}
            />
          );
        },
        tabBarStyle: {
          height: 60,
        },
        tabBarShowLabel: false,
        headerTitleStyle: {
          display: "none",
        },
        headerBackTitleVisible: false,
        headerRight: () => renderHeaderRight(),
      })}
    >
      <Tab.Screen name="ProductStack" component={ProductStack} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <TabGroup />
    </NavigationContainer>
  );
};

export default Navigation;
