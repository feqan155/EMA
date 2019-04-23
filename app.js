'use strict';
import {
  AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import Search from './components/Search';
import Rooms from './components/Rooms.js';
import Home from './components/Home.js';
import Messages from './components/Messages.js';
import Materials from './components/Materials.js';

const RootNavigator = StackNavigator(
  {
    SignIn: { name: 'SignIn', screen: SignIn },
    SignUp: { name: 'SignUp', screen: SignUp },
    Rooms: { name: 'Rooms', screen: Rooms },
    Search: { name: 'Search', screen: Search },
    Home: { name: 'Home', screen: Home },
    Messages: { name: 'Messages', screen: Messages},
    Materials: { name: 'Materials', screen: Materials}
  },
  {
      initialRouteName: 'SignIn',
      headerMode: 'screen'
  }
);

AppRegistry.registerComponent('RNFirebaseChat', () => RootNavigator);
