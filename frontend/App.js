import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import CityScreen from './screens/CityScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ResourceList from './screens/ResourceList';
import ResourceDetails from './screens/ResourceDetails';
import { Provider } from 'react-redux';
import store from './redux/store';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, headerTitle:'Home' }}
      />
      <HomeStack.Screen
        name="ResourceList"
        component={ResourceList}
        options={{ headerTitle: 'Resources' }}
      />
      <HomeStack.Screen
        name="ResourceDetails"
        component={ResourceDetails}
        options={{ headerTitle: 'Details' }}
      />
    </HomeStack.Navigator>
  );
}

function MapStackScreen() {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
        <MapStack.Screen name="MapScreen" component={MapScreen} />
        <MapStack.Screen name="ResourceDetails" component={ResourceDetails} />
      </MapStack.Navigator>
  );
}

function ChatbotStackScreen() {
  return (
      <ProfileStack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <ProfileStack.Screen name="ChatbotScreen" component={ChatbotScreen} />
        <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
      </ProfileStack.Navigator>
  );
}

function CityStackScreen() {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
          {/* <ProfileStack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
          <ProfileStack.Screen name="CityScreen" component={CityScreen} />
        </ProfileStack.Navigator>
    );
  }




function App() {
  return (
      <Provider store={store}>
        <NavigationContainer>
            <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Map" component={MapStackScreen} />
            <Tab.Screen name="Chatbot" component={ChatbotStackScreen} />
            <Tab.Screen name="Cities" component={CityStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
  );

}

export default App;