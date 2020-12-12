import React from 'react';
import {performLogout, performRefresh} from '../javascript/browser';
import {getAutoDials} from '../javascript/profile';
import Colors from '../javascript/colors';

import styles from '../style/style';
import {
  StatusBar,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import AutoDialEntry from './autodial';

export default function HomeScreen() {
  const onLogoutPress = () => {
    console.log('sup: logging out');
    performLogout();
  };

  const onRefreshPress = () => {
    console.log('sup: refresh data');
    performRefresh();
  };

  const initialArr = [
    {
      id: 1,
      color: 'blue',
      text: 'text1',
    },
    {
      id: 2,
      color: 'red',
      text: 'text2',
    },
  ];
  const list = ['a', 'b', 'c'];

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.logoBackground}
        translucent={false}
      />

      <View style={styles.topLevelView}>
        <View style={styles.titleBarView}>
          <Text style={styles.logoTextSmall}>Logo</Text>
        </View>
        <View style={styles.bodyView}>
          <ScrollView keyboardDismissMode="on-drag">
            <Button
              buttonStyle={styles.loginButton}
              onPress={onLogoutPress}
              title="Logout"
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={onRefreshPress}
              title="Refresh"
            />

            {getAutoDials().map((item) => (
              <AutoDialEntry
                key={item.dnis}
                ad_item={item}
                ad_desc={item.description}
                ad_dest={item.destination}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.footerView}>
          <Text style={styles.logoTextSmall}>Tabs</Text>
        </View>
      </View>
    </>
  );
}
