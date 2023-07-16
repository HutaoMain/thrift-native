import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Home from "./screens/Home";

const TabGroup = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
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

const styles = StyleSheet.create({});
