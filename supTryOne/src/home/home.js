import React, {useEffect, useState} from 'react';

import {Button, Icon} from 'react-native-elements';
import {StatusBar, View, Text} from 'react-native';

import AutoDial from './autodial';
import IconButtonVertical from '../iconButtons/icon-button-vertical';

import styles from '../style/style';
import {
  performLogout,
  performRefresh,
  performInternet,
} from '../javascript/browser';

export default function HomeScreen() {
  console.log('sup: Showing home screen');

  useEffect(() => {
    const refreshon = setInterval(performRefresh, 600000); // 1 minute for android
    return () => {
      clearInterval(refreshon);
    };
  }, []);

  const onLogoutPress = () => {
    console.log('sup: logging out');
    performLogout();
  };

  const onRefreshPress = () => {
    console.log('sup: refresh data');
    performRefresh();
  };

  const onInternetPress = () => {
    console.log('sup: test internet');
    performInternet();
  };

  return (
    <>
      <StatusBar
        barStyle='light-content'
        backgroundColor='darkred'
        translucent={false}
      />

      <View style={styles.topLevelView}>
        <View style={styles.titleBarView}>
          <Text style={styles.logoTextSmall}>Logo</Text>
        </View>
        <View style={styles.bodyView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
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
            <Button
              buttonStyle={styles.loginButton}
              onPress={onInternetPress}
              title="Internet"
            />
          </View>

          <AutoDial />
        </View>
        <View style={styles.footerView}>
          <IconButtonVertical title="Home" icon="home" />
          <IconButtonVertical title="Auto Dial" icon="call" />
          <IconButtonVertical title="Speed Dial" icon="add-call" />
          <IconButtonVertical title="Recents" icon="history" />
          <IconButtonVertical title="Pinless Dial" icon="person-add" />
          <IconButtonVertical title="More" icon="more-horiz" />

          {/* Home, AutoDial, SpeedDial, Recents (History), PinlessDial, More */}
          {/* More: Profile (Update Account tab), Logout */}
        </View>
      </View>
    </>
  );
}
