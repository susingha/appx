import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Platform, ScrollView, RefreshControl} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import Modal from 'react-native-modal';

import TitleBar from './titlebar';
import PinlessDialEntry from './pinlessdial-card';
import PinlessDialEdit from './pinlessdial-edit';

import styles from '../style/style';
import {
  getPinlessDials,
  addPinlessDials,
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

export default function PinlessDial() {
  console.log('sup: showing pinless dial screen');

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
      alias: '',
    };
    //
    //
    var last_index = addPinlessDials(new_dummy_item);
    setEditIndex(last_index);
    disableRefresh();
    setEditVisible(true);
  };
  const editOnSave = (item_new, item_idx) => {
    if (item_new != null)
      getPinlessDials()[editIndex].account_id = getAccountId();
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
      <TitleBar text="Pinless Dial" color="darkblue" barstyle="light-content" />

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
        <PinlessDialEdit
          onSave={editOnSave}
          onCancel={editDismiss}
          pd_item={getPinlessDials()[editIndex]}
          pd_indx={editIndex}
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
        {getPinlessDials()
          .filter((item, index) => item.account_id != null)
          .map((item, index) => (
            <PinlessDialEntry
              key={item.alias}
              pd_indx={index}
              pd_item={item}
              onPress={editShow}
            />
          ))}
      </ScrollView>
    </>
  );
}
