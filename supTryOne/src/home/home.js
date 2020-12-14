import React, {useState} from 'react';
import {performLogout, performRefresh} from '../javascript/browser';
import {getAutoDials} from '../javascript/profile';
import Colors from '../javascript/colors';
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
import AutoDialEntry from './autodial';

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const menuDismiss = () => {
    setMenuVisible(false);
  };
  const menuShow = (idx) => {
    console.log(
      'sup: showing menu for item: ' + idx + ' ' + getAutoDials()[idx].dnis,
    );
    setEditIndex(idx);
    setMenuVisible(true);
  };

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

      <Modal
        isVisible={menuVisible}
        onSwipeComplete={menuDismiss}
        onBackdropPress={menuDismiss}
        onBackButtonPress={menuDismiss}
        swipeDirection={['down']}
        style={styles.menuModalFull}>
        <View style={styles.menuModalList}>
          <TouchableOpacity activeOpacity={0.2} style={styles.menuModalHeader}>
            <Text style={styles.menuModalTitle}>
              {getAutoDials()[editIndex].description} -{' '}
              {getAutoDials()[editIndex].dnis}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} onPress={menuDismiss}>
            <Text style={styles.menuModalOption}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} onPress={menuDismiss}>
            <Text style={styles.menuModalOption}>Import from Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} onPress={menuDismiss}>
            <Text style={styles.menuModalOption}>Save to Contact</Text>
          </TouchableOpacity>

          <Divider />

          <TouchableOpacity activeOpacity={0.2} onPress={menuDismiss}>
            <Text style={styles.menuModalOption}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.topLevelView}>
        <View style={styles.titleBarView}>
          <Text style={styles.logoTextSmall}>Logo</Text>
        </View>
        <View style={styles.bodyView}>
          <ScrollView keyboardDismissMode="on-drag">
            <View style={{flex: 1, flexDirection: 'row', justifyContent: true}}>
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
                onPress={menuShow}
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
