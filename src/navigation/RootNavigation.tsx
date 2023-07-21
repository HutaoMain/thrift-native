import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./BottomTabNavigation";

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
