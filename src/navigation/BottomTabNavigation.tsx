import Account from "../screens/Account";
import Cart from "../screens/Cart";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigation from "./HomeStackNavigation";
import Wishlist from "../screens/Wishlist";
import { View, Image, Text } from "react-native";
import useNotificationCountStore from "../zustand/NotificationCountStore";

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  const pendingOrderCount = useNotificationCountStore(
    (state) => state.pendingOrderCount
  );

  const wishlistCount = useNotificationCountStore(
    (state) => state.wishlistCount
  );

  const renderHeaderRight = () => {
    return (
      <View>
        <Image
          source={require("../../assets/logo.png")}
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

            return (
              <>
                <Ionicons
                  name={iconName}
                  size={size}
                  color={focused ? "#00205C" : "#DFDFDF"}
                />
                {wishlistCount !== 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 20,
                      backgroundColor: "red",
                      borderRadius: 10,
                      minWidth: 15,
                      paddingHorizontal: 5,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {wishlistCount}
                    </Text>
                  </View>
                )}
              </>
            );
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
            return (
              <>
                <Ionicons
                  name={iconName}
                  size={size}
                  color={focused ? "#00205C" : "#DFDFDF"}
                />
                {pendingOrderCount !== 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 20,
                      backgroundColor: "red",
                      borderRadius: 10,
                      minWidth: 15,
                      paddingHorizontal: 5,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {pendingOrderCount}
                    </Text>
                  </View>
                )}
              </>
            );
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
