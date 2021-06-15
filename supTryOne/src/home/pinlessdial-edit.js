import React, {useState} from 'react';
import {Button, Divider} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

import {View, Text, TextInput, Platform, Alert} from 'react-native';

import styles from '../style/style';
import {
  getPinlessDials,
  setPinlessDials,
  delPinlessDials,
  getAccountId,
} from '../javascript/profile';
import {performSaveStatusPage} from '../javascript/browser';
import {checkRequestPermissionContacts} from '../javascript/permission';
import {decodeDestToNo, onContactsPressIm} from '../javascript/contacts';

//////////////////////////////////////////////////////////////////////////////////// Component starts here
export default function PinlessDialEdit(props) {
  if (typeof props.pd_item === 'undefined') return <View/>;

  console.log('sup: editing: ' + JSON.stringify(props.pd_item));

  const pd_item_idx = props.pd_indx;
  const header_text = 'Pinless Dial';
  const delete_text = 'Delete ' + props.pd_item.alias;
  const account_id = getAccountId();
  var pd_item_new = {
    account_id: account_id,
    alias: props.pd_item.alias,
  };

  const [phoneNumber, setPhoneNumber] = useState(
    decodeDestToNo(props.pd_item.alias),
  );

  const handlePhoneNumber = (textinput) => {
    setPhoneNumber(textinput);
  };

  const handleSelectedContact = (name, number) => {
    number = number.match(/\d/g).join('').substr(-10);
    setPhoneNumber(number);
  };
  const handleContactImport = (permission_contacts = false) => {
    if (Platform.OS == 'android' && permission_contacts == false) {
      console.log('App: Permission Contacts Check');
      checkRequestPermissionContacts(handleContactImport);
      return;
    }
    console.log('App: Permission Contacts OK');
    onContactsPressIm(handleSelectedContact); // Android needs permission
  };

  //////////////////////////////////////////////////////////////////////////////////// Save functionality begin
  const handleSaveResponse = (res) => {
    var json_res = null;

    try {
      json_res = JSON.parse(res.trim().slice(1, -2)).fields[1].validated
        .field_value.alias[pd_item_idx];
    } catch (e) {
      console.warn('ERROR: bad JSON in response ' + res);
      return;
    }

    if (json_res != pd_item_new.alias) {
      console.warn(
        'ERROR: item not updated. alias mismatch: ' +
          json_res +
          ' - ' +
          pd_item_new.alias,
      );
      return;
    }

    if (setPinlessDials(pd_item_new, pd_item_idx) == null) return;

    props.onSave(pd_item_new, pd_item_idx);
  };

  const handleSaveRequest = (item_new, item_idx) => {
    var json_head = {
      dialer: {
        alias: JSON.parse(
          JSON.stringify(getPinlessDials().map((item) => item.alias)),
        ),
      },
    };

    var json_alias = json_head.dialer.alias;
    json_alias[item_idx] = item_new.alias;
    console.log('sup: ' + JSON.stringify(json_head));
    performSaveStatusPage(json_head, handleSaveResponse);
  };

  const handleSavePress = (phone) => {
    console.log('sup: saving: ' + phone);
    pd_item_new.alias = phone;
    handleSaveRequest(pd_item_new, pd_item_idx);
  };

  //////////////////////////////////////////////////////////////////////////////////// Delete functionality begin
  const handleDeleteResponse = (res) => {
    var json_res = null;

    try {
      json_res = JSON.parse(res.trim().slice(1, -2)).fields[1].validated
        .field_value.alias;
    } catch (e) {
      console.warn('ERROR: bad JSON in response ' + res);
      return;
    }

    if (json_res.length == getPinlessDials().length - 1) {
      if (delPinlessDials(pd_item_idx) == null) return;
    } else {
      console.log('App: item not deleted: ' + props.pd_item.alias);
      return;
    }

    props.onSave(null, pd_item_idx);
  };

  const handleDeleteRequest = (item, index) => {
    var pd_array_local = JSON.parse(JSON.stringify(getPinlessDials()));
    if (item.alias != pd_array_local[index].alias) {
      console.log(
        'App: delete candidate: ' +
          item.alias +
          ' not same as entry ' +
          pd_array_local[index].alias,
      );
      return;
    }

    pd_array_local.splice(index, 1); // deletes the entry at index

    var json_head = {
      dialer: {
        alias: JSON.parse(
          JSON.stringify(pd_array_local.map((item) => item.alias)),
        ),
      },
    };

    console.log('sup: ' + JSON.stringify(json_head));
    performSaveStatusPage(json_head, handleDeleteResponse);
  };

  const handleDeletePress = () => {
    console.log(
      'sup: deleting: ' + props.pd_item.alias + ' at index: ' + pd_item_idx,
    );
    handleDeleteRequest(props.pd_item, pd_item_idx);
  };

  const confirmDeleteAlert = () =>
    Alert.alert('Delete Pinless Dial', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Remove ' + props.pd_item.alias, onPress: handleDeletePress},
    ]);

  return (
    <View style={styles.editModalContent}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          type="clear"
          title="Cancel"
          titleStyle={styles.editModalHeaderText}
          onPress={props.onCancel}
        />

        <Button
          type="clear"
          title={header_text}
          disabledTitleStyle={styles.editModalHeaderText}
          disabled
        />

        <Button
          type="clear"
          title="Save"
          titleStyle={styles.editModalHeaderText}
          onPress={handleSavePress.bind(this, phoneNumber)}
        />
      </View>

      <Divider style={{margin: 5}} />

      <ScrollView>
        <Text style={styles.editModalLabelText}>Phone Number:</Text>
        <TextInput
          placeholder="Phone number"
          placeholderColor="#c4c3cb"
          defaultValue={phoneNumber}
          style={styles.formTextInput}
          onChangeText={handlePhoneNumber}
        />

        <View style={{margin: 5}} />

        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Button
            type="clear"
            title="Contact import"
            titleStyle={styles.editModalHeaderText}
            onPress={handleContactImport.bind((permission_contacts = false))}
          />
        </View>

        <View style={{margin: 5}} />

        {props.pd_item.account_id != null &&
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Button
            type="clear"
            title={delete_text}
            titleStyle={[styles.editModalHeaderText, {color: 'red'}]}
            onPress={confirmDeleteAlert}
          />
        </View>
        }

      </ScrollView>
    </View>
  );
}
