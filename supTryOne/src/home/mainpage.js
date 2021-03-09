import React, {useEffect, useState} from 'react';
import {StatusBar, View, Text} from 'react-native';

import styles from '../style/style';

export default function MainPage() {
  console.log('sup: showing main page screen');
  return (
    <>
      <Text style={styles.logoTextSmall}>MAIN PAGE</Text>
    </>
  );
}
