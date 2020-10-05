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
import {getLoggedIn} from './src/javascript/profileData';
// import {initAppStateChange} from './src/javascript/appState';



export default function App() {

  // initAppStateChange(); 
  const [redraw, setRedraw] = useState(0);
  const refreshScreen = () => {
    console.log('sup: refreshScreen');
    setRedraw(1 - redraw);
  };
  const findLogin = () => {
    console.log('sup: finding login status: ' + getLoggedIn());
    return getLoggedIn();
  };

  if (false /*findLogin()*/) {
    return (
      <>
        <StatusBar barStyle="dark-content" translucent={true} />
        <HomeScreen onLogout={refreshScreen} />
      </>
    );
  } else {
    return (
      <>
        <StatusBar barStyle="dark-content" translucent={true} />
        <LoginScreen onLogin={refreshScreen} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
