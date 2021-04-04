import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Platform} from 'react-native';

import {ScrollView, RefreshControl} from 'react-native';
import Modal from 'react-native-modal';

import TitleBar from './titlebar';
import SpeedDialEntry from './speeddial-card';
import SpeedDialEdit from './speeddial-edit';

import styles from '../style/style';
import {getSpeedDials} from '../javascript/profile';
import {performRefresh} from '../javascript/browser';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function SpeedDial() {
  console.log('sup: showing speed dial screen');

  const [editIndex, setEditIndex] = useState(0);
  const [editVisible, setEditVisible] = useState(false);

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
        style={styles.editModalContainer}>
        <SpeedDialEdit
          onSave={editOnSave}
          onCancel={editDismiss}
          sd_item={getSpeedDials()[editIndex]}
          sd_indx={editIndex}
        />
      </Modal>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        {getSpeedDials().map((item, index) => (
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
