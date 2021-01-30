import React, {useEffect, useState} from 'react';
import {View, Text, Platform} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import AutoDialEntry from './autodial-card';
import AutoDialEdit from './autodial-edit';

import styles from '../style/style';
import {getAutoDials} from '../javascript/profile';

export default function AutoDial() {
  console.log('sup: showing auto dial screen');

  const [editIndex, setEditIndex] = useState(0);
  const [editVisible, setEditVisible] = useState(true);

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

  return (
    <>
      <Modal
        isVisible={editVisible}
        {...(Platform.OS === 'ios'
          ? {
              presentationStyle: 'pageSheet',
            }
          : {})}
        {...(Platform.OS === 'android'
          ? {
              statusBarTranslucent: false,
            }
          : {})}
        animationType="slide" // sup: fade or slide
        onBackdropPress={editDismiss}
        onBackButtonPress={editDismiss}
        transparent={false}

        style={styles.editModalFull}>
          <Text>Ok Google</Text>
          {/* 
        <AutoDialEdit
          onSave={editOnSave}
          onCancel={editDismiss}
          ad_item={getAutoDials()[editIndex]}
          ad_indx={editIndex}
        />
        */}
      </Modal>

      <ScrollView keyboardDismissMode="on-drag">
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
