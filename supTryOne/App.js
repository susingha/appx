/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StatusBar, StyleSheet, View, Text} from 'react-native';

import LoginScreen from './src/login/login.js';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" translucent={true} />
      <LoginScreen />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
