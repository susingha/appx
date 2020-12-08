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
import {firstLoad, getJSLoggedin} from './src/javascript/profile';

var jsloaded = false;

export default function App() {
  var ret; 

  const [redraw, setRedraw] = useState(0);
  const refreshApp = () => {
    console.log('sup: Refresh App');
    setRedraw(1 - redraw);
  };
  
  initAppRefresh(refreshApp);
  initAppStateChange();

  if (jsloaded == false) {
    console.log('sup:1 read profile async');
    firstLoad(); // async
    console.log('sup: First Load Splash');
    ret = <SplashScreen />;
  } else {

    console.log('sup:2 Refresh Load');
    if (getJSLoggedin()) {
      console.log('sup:3 Show Home Screen');
      ret = (
          <HomeScreen />
      );
    } else {
      console.log('sup:4 Show Login Screen');
      ret = (
          <LoginScreen />
      );
    }
  }

  jsloaded = true;
  return ret
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
