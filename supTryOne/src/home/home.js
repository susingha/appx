import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';

import {Button, Divider} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {StatusBar, Keyboard, View, Text} from 'react-native';


import AutoDialEntry from './autodial-card';
import AutoDialEdit from './autodial-edit';

import Colors from '../javascript/colors';
import styles from '../style/style';
import {performLogout, performRefresh, performInternet} from '../javascript/browser';
import {getAutoDials} from '../javascript/profile';


export default function HomeScreen() {
  console.log('sup: showing home screen');

  useEffect(() => {
    this.refreshon = setInterval(performRefresh, 600000); // 10 minutes
    return () => {
      clearInterval(this.refreshon);
    };
  }, []);

  const [editIndex, setEditIndex] = useState(0);
  const [editVisible, setEditVisible] = useState(false);

  // sup: Edit Modal
  const editDismiss = () => {
    setEditVisible(false);
  };
  const editShow = (idx) => {
    setEditIndex(idx);
    setEditVisible(true);
  };
  const editOnSave = (item_new, item_idx) => {
    editDismiss();
  };

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
        barStyle="dark-content"
        backgroundColor={Colors.logoBackground}
        translucent={false}
      />

      {/* Edit Page Modal */}
      <Modal
        isVisible={editVisible}
        onBackdropPress={editDismiss}
        onBackButtonPress={editDismiss}
        swipeDirection={['down']}
        style={styles.editModalFull}>
        <AutoDialEdit
          onSave={editOnSave}
          onCancel={editDismiss}
          ad_item={getAutoDials()[editIndex]}
          ad_indx={editIndex}
        />
      </Modal>

      <View style={styles.topLevelView}>
        <View style={styles.titleBarView}>
          <Text style={styles.logoTextSmall}>Logo</Text>
        </View>
        <View style={styles.bodyView}>
          <ScrollView keyboardDismissMode="on-drag">
            <View
              style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>

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

            {getAutoDials().map((item, index) => (
              <AutoDialEntry
                key={item.dnis}
                ad_indx={index}
                ad_item={item}
                ad_desc={item.description}
                ad_dest={item.destination}
                onPress={editShow}
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
