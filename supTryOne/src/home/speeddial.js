import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Platform, ScrollView, RefreshControl} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import Modal from 'react-native-modal';

import TitleBar from './titlebar';
import SpeedDialEntry from './speeddial-card';
import SpeedDialEdit from './speeddial-edit';

import styles from '../style/style';
import {
  getSpeedDials,
  addSpeedDials,
  getAccountId,
} from '../javascript/profile';
import {
  performRefresh,
  disableRefresh,
  enableRefresh,
} from '../javascript/browser';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function SpeedDial() {
  console.log('sup: showing speed dial screen');

  const [editIndex, setEditIndex] = useState(0);
  const [editVisible, setEditVisible] = useState(false);

  const editDismiss = () => {
    setEditVisible(false);
    enableRefresh();
  };
  const editShow = (idx) => {
    setEditIndex(idx);
    disableRefresh();
    setEditVisible(true);
  };
  const editShowAdd = () => {
    var new_dummy_item = {
      account_id: null,
      entry: '',
      number: '',
      description: '',
    };
    var last_index = addSpeedDials(new_dummy_item);
    setEditIndex(last_index);
    disableRefresh();
    setEditVisible(true);
  };
  const editOnSave = (item_new, item_idx) => {
    if (item_new != null)
      getSpeedDials()[editIndex].account_id = getAccountId();
    editDismiss();
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    performRefresh();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <>
      <TitleBar text="Speed Dial" color="darkblue" barstyle="light-content" />

      <Modal
        isVisible={editVisible}
        {...(Platform.OS === 'ios'
          ? {
              presentationStyle: 'pageSheet',
              transparent: false,
            }
          : {})}
        {...(Platform.OS === 'android'
          ? {
              statusBarTranslucent: false,
              transparent: true,
            }
          : {})}
        animationType="slide"
        onBackdropPress={editDismiss}
        onBackButtonPress={editDismiss}
        onSwipeComplete={editDismiss}
        swipeDirection="down"
        style={styles.editModalContainer}>
        <SpeedDialEdit
          onSave={editOnSave}
          onCancel={editDismiss}
          sd_item={getSpeedDials()[editIndex]}
          sd_indx={editIndex}
        />
      </Modal>

      <Button
        onPress={editShowAdd}
        buttonStyle={styles.addButton}
        containerStyle={styles.floatingButton}
        icon={<Icon name="add" type="material" size={30} color="black" />}
      />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        {getSpeedDials()
          .filter((item, index) => item.account_id != null)
          .map((item, index) => (
            <SpeedDialEntry
              key={item.entry}
              sd_indx={index}
              sd_item={item}
              onPress={editShow}
            />
          ))}
      </ScrollView>
    </>
  );
}
