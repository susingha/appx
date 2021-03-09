import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Platform} from 'react-native';

//port {ScrollView, RefreshControl} from 'react-native-gesture-handler';
import {ScrollView, RefreshControl} from 'react-native';
import Modal from 'react-native-modal';

import AutoDialEntry from './autodial-card';
import AutoDialEdit from './autodial-edit';

import styles from '../style/style';
import {getAutoDials} from '../javascript/profile';
import {performRefresh} from '../javascript/browser';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function AutoDial() {
  console.log('sup: showing auto dial screen');

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
        <AutoDialEdit
          onSave={editOnSave}
          onCancel={editDismiss}
          ad_item={getAutoDials()[editIndex]}
          ad_indx={editIndex}
        />
      </Modal>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
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
    </>
  );
}
