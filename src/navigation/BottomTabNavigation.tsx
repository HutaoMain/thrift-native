import Account from "../screens/Account";
import Cart from "../screens/Cart";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigation from "./HomeStackNavigation";
import Wishlist from "../screens/Wishlist";
import { View, Image } from "react-native";

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  const renderHeaderRight = () => {
    return (
      <View>
        <Image
          source={require("../../assets/logo.jpg")}
          style={{ width: 40, height: 40, borderRadius: 15, marginRight: 20 }}
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName: any;

          if (route.name === "ProductStack") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Wishlist") {
            iconName = focused ? "list-outline" : "list-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? "#00205C" : "#DFDFDF"}
            />
          );
        },
        tabBarStyle: {
          height: 60,
        },
        tabBarShowLabel: false,
        headerBackTitleVisible: false,
        headerRight: () => renderHeaderRight(),
      })}
    >
      <Tab.Screen
        name="ProductStack"
        component={HomeStackNavigation}
        options={{ headerTitle: "Happy Thrift" }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{ headerTitle: "Happy Thrift" }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{ headerTitle: "Happy Thrift" }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{ headerTitle: "Happy Thrift" }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
