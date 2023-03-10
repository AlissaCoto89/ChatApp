import React, { Component } from "react";
// import the screens we want to navigate
import Welcome from "./components/Start";
import Chat from "./components/Chat";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CustomActions from "./components/CustomActions";

const Stack = createStackNavigator();

export default class App extends Component {
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
