import React, {useState} from 'react';
import {performLogout, performRefresh} from '../javascript/browser';
import {getAutoDials} from '../javascript/profile';
import Colors from '../javascript/colors';
import Enums from '../javascript/enums';
import Modal from 'react-native-modal';

import styles from '../style/style';
import {
  StatusBar,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import AutoDialEntry from './autodial-card';
import AutoDialEdit from './autodial-edit';

export default function HomeScreen() {
  const [editIndex, setEditIndex] = useState(0);
  const [editVisible, setEditVisible] = useState(true);

  // sup: Edit Modal
  const editDismiss = () => {
    setEditVisible(false);
  };
  const editShow = (idx) => {
    console.log('sup: show edit modal for ' + idx);
    setEditIndex(idx);
    setEditVisible(true);
  };
  const editOnSave = (item_new) => {
    console.log('sup: new:1 ' + item_new.dnis);
    console.log('sup: new:2 ' + item_new.description);
    console.log('sup: new:3 ' + item_new.destination);
    editDismiss();
  }
  




  const onLogoutPress = () => {
    console.log('sup: logging out');
    performLogout();
  };

  const onRefreshPress = () => {
    console.log('sup: refresh data');
    performRefresh();
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
        />
      </Modal>

      <View style={styles.topLevelView}>
        <View style={styles.titleBarView}>
          <Text style={styles.logoTextSmall}>Logo</Text>
        </View>
        <View style={styles.bodyView}>
          <ScrollView keyboardDismissMode="on-drag">
            <View
              style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
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
