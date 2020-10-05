import React from 'react';
import {performLogout} from '../javascript/httpurl';

import styles from './style';
import {StyleSheet, Keyboard, View, Text, TouchableWithoutFeedback} from 'react-native';
import {Button} from 'react-native-elements';

export default function HomeScreen(props) {

  const onLogoutPress = () => {
    console.log('sup: loggin out');
    performLogout(props.onLogout);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.homeScreenContainer}>
        <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Home</Text>
          <Button
            buttonStyle={styles.logoutButton}
            onPress={onLogoutPress}
            title="Logout"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
