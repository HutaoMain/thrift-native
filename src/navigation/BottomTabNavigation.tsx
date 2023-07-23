import Account from "../screens/Account";
import Cart from "../screens/Cart";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigation from "./HomeStackNavigation";

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  // const renderHeaderRight = () => {
  //   const avatarUrl =
  //     "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png";

  //   return (
  //     <TouchableOpacity onPress={() => console.log("Avatar pressed")}>
  //       <Image
  //         source={{ uri: avatarUrl }}
  //         style={{ width: 40, height: 40, borderRadius: 15, marginRight: 20 }}
  //       />
  //     </TouchableOpacity>
  //   );
  // };

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
              color={focused ? "#00205C" : "#DFDFDF"}
            />
          );
        },
        tabBarStyle: {
          height: 60,
        },
        headerShown: false,
        tabBarShowLabel: false,
        // headerTitleStyle: {
        //   display: "none",
        // },
        // headerBackTitleVisible: false,
        // headerRight: () => renderHeaderRight(),
      })}
    >
      <Tab.Screen name="ProductStack" component={HomeStackNavigation} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
