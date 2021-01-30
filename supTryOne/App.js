/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StatusBar, StyleSheet, View, Text} from 'react-native';

import HomeScreen from './src/home/home';
import LoginScreen from './src/login/login';
import SplashScreen from './src/splash/splash';

import {initAppRefresh} from './src/javascript/refresh';
import {initAppStateChange} from './src/javascript/state';
import {loadProfile, getJSLoggedin} from './src/javascript/profile';

var jsloaded = false;

console.log('sup: App.js');

export default function App() {
  var ret;

  console.log('sup: ============= App.js ===========');

  const [redraw, setRedraw] = useState(0);
  const refreshApp = () => {
    console.log('sup: Redraw App');
    setRedraw(1 - redraw);
  };

  const firstLoad = () => {
    console.log('sup: First Load');
    loadProfile();
  };

  initAppRefresh(refreshApp);
  initAppStateChange();

  if (jsloaded == false) {
    firstLoad(); // async
    ret = <SplashScreen />;
  } else {
    console.log('sup: Refresh Load');
    if (getJSLoggedin()) {
      ret = <HomeScreen />;
    } else {
      ret = <LoginScreen />;
    }
  }

  jsloaded = true;
  return ret;
}
