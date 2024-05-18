import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import ResourceList from './screens/ResourceList';
import { Provider } from 'react-redux';
import store from './redux/store';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="ResourceList" component={ResourceList} />
        {/* <HomeStack.Screen name="ShelterScreen" component={ShelterScreen} /> */}
      </HomeStack.Navigator>
  );
}

function MapStackScreen() {
  return (
      <MapStack.Navigator>
        <MapStack.Screen name="MapScreen" component={MapScreen} />
      </MapStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen name="MyProfileScreen" component={ProfileScreen} />
        <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
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
            <Tab.Screen name="MyProfile" component={ProfileStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
  );
  
}

export default App;