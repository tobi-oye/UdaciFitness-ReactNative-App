import "react-native-gesture-handler";
import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";
import reducer from "./reducers";
import History from "./components/History";
import AddEntry from "./components/AddEntry";
import { white, purple } from "./utils/color";
import EntryDetail from "./components/EntryDetail";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
export default function App() {
  const Tab = createMaterialTopTabNavigator();

  const RouteConfigs = {
    History: {
      name: "History",
      component: History,
      options: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        ),
        title: "History",
      },
    },
    AddEntry: {
      component: AddEntry,
      name: "Add Entry",
      options: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        ),
        title: "Add Entry",
      },
    },
  };

  const TabNavigatorConfig = {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  };
  const TabNav = () => (
    <Tab.Navigator {...TabNavigatorConfig}>
      <Tab.Screen {...RouteConfigs["History"]} />
      <Tab.Screen {...RouteConfigs["AddEntry"]} />
    </Tab.Navigator>
  );
  const StackNavigatorConfig = {
    headerMode: "screen",
  };

  const StackConfig = {
    TabNav: {
      name: "Home",
      component: TabNav,
      options: { headerShown: false },
    },
    EntryDetail: {
      name: "EntryDetail",
      component: EntryDetail,
      options: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
        title: "Entry Detail",
      },
    },
  };

  const Stack = createStackNavigator();
  const MainNav = () => (
    <Stack.Navigator {...StackNavigatorConfig}>
      <Stack.Screen {...StackConfig["TabNav"]} />
      <Stack.Screen {...StackConfig["EntryDetail"]} />
    </Stack.Navigator>
  );
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <UdaciStatusBar backgroundColor={purple} style="light" />
          <MainNav />
        </NavigationContainer>
      </View>
    </Provider>
  );
}
