import Account from "../screens/Account";
import Cart from "../screens/Cart";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigation from "./StackNavigation";

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="ProductStack" component={StackNavigation} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
