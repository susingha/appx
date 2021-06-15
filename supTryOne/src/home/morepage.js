import React, {useEffect, useState} from 'react';

import {Button, Icon} from 'react-native-elements';
import {StatusBar, View, Text, TouchableOpacity} from 'react-native';

import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {selectContactPhone} from 'react-native-select-contact';
import Contacts from 'react-native-contacts';
import parsePhoneNumber from 'libphonenumber-js';

import TitleBar from './titlebar';
import styles from '../style/style';
import {
  performLogout,
  performRefresh,
  performInternet,
} from '../javascript/browser';

export default function MorePage() {
  console.log('sup: Showing more screen');

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
  const onPermissionPress = () => {
    /*
     * IOS does not need permissions to open the contacts form both import and export
     * Android needs permission to open the contacts form for import. not for export
     */

    console.log('sup: test Permission');
    var perm = null;

    switch (Platform.OS) {
      case 'ios':
        perm = PERMISSIONS.IOS.CONTACTS;
        break;
      case 'android':
        perm = PERMISSIONS.ANDROID.READ_CONTACTS;
        break;
      case 'web':
      default:
    }

    request(perm)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log('sup: error');
      });
  };
  const onContactsPressIm = () => {
    console.log('sup: test Contacts Import');
    return selectContactPhone().then((selection) => {
      if (!selection) {
        return null;
      }

      let {contact, selectedPhone} = selection;
      console.log(
        `Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`,
      );
      return selectedPhone.number;
    });
  };
  const onContactsPressEx = () => {
    console.log('sup: test Contacts Export');
    var newPerson = {
      phoneNumbers: [
        {
          label: 'mobile',
          number: '(555) 555-5555',
        },
      ],
      // Android
      displayName: 'Friedrich Nietzsche',
      // Ios
      familyName: 'Jung',
      givenName: 'Carl',
      middleName: '',
    };

    Contacts.openContactForm(newPerson).then((contact) => {
      console.log('sup: contact has been saved');
    });
  };

  const onParsePhone = () => {
    var no = '0543432342346612';
    console.log(no.substr(-10));
  };

  return (
    <View>
      <TitleBar text="More" color="white" barstyle="dark-content" />
      
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
      <Button
        buttonStyle={styles.loginButton}
        onPress={onPermissionPress}
        title="Permission"
      />
      <Button
        buttonStyle={styles.loginButton}
        onPress={onContactsPressIm}
        title="Contacts Import"
      />
      <Button
        buttonStyle={styles.loginButton}
        onPress={onContactsPressEx}
        title="Contacts Export"
      />
      <Button
        buttonStyle={styles.loginButton}
        onPress={onParsePhone}
        title="Parse Phone No"
      />
    </View>
  );
}
