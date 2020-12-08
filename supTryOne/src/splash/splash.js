import React from 'react';
import {Keyboard, Text, View, TouchableWithoutFeedback} from 'react-native';

import styles from '../style/style';

export default function SplashScreen() {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.topLevelContainer}>
        <Text style={styles.logoText}>SPLASH JPG</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
