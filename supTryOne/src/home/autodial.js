import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, FlatList, Platform, RefreshControl} from 'react-native';

import {Button, Icon} from 'react-native-elements';
import Modal from 'react-native-modal';

import TitleBar from './titlebar';
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

  const DATA = getAutoDials();
  const renderItem = ({item, index}) => (
    <AutoDialEntry
      key={item.dnis}
      ad_indx={index}
      ad_item={item}
      onPress={editShow}
    />
  );

  return (
    <>
      <TitleBar text="Auto Dial" color="darkblue" barstyle="light-content" />

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
        <AutoDialEdit
          onSave={editOnSave}
          onCancel={editDismiss}
          ad_item={getAutoDials()[editIndex]}
          ad_indx={editIndex}
        />
      </Modal>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.dnis}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
