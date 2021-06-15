import React, {useState} from 'react';
import {Button, Divider} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import {ScrollView} from 'react-native-gesture-handler';

import {View, Text, TextInput, Platform, Alert} from 'react-native';

import styles from '../style/style';
import {
  getSpeedDials,
  setSpeedDials,
  delSpeedDials,
  getAccountId,
} from '../javascript/profile';
import {performSaveStatusPage} from '../javascript/browser';
import {listCountryCodes} from '../javascript/codes';
import {checkRequestPermissionContacts} from '../javascript/permission';
import {
  decodeDestToCC,
  decodeDestToNo,
  onContactsPressIm,
} from '../javascript/contacts';

//////////////////////////////////////////////////////////////////////////////////// Component starts here
export default function SpeedDialEdit(props) {
  if (typeof props.sd_item === 'undefined') return <View />;

  console.log('sup: editing: ' + JSON.stringify(props.sd_item));

  const sd_item_idx = props.sd_indx;
  const header_text = 'Speed Dial: ' + props.sd_item.entry;
  const delete_text =
    'Delete ' + props.sd_item.description + ' - ' + props.sd_item.entry;
  const account_id = getAccountId();
  var sd_item_new = {
    account_id: account_id,
    entry: props.sd_item.entry,
    number: null,
    description: null,
  };

  const [descriptionText, setDescriptionText] = useState(
    props.sd_item.description,
  );
  const [countryCode, setCountryCode] = useState(
    decodeDestToCC(props.sd_item.number),
  );
  const [phoneNumber, setPhoneNumber] = useState(
    decodeDestToNo(props.sd_item.number),
  );
  const [entryText, setEntryText] = useState(props.sd_item.entry);

  const handleCountryCode = (value) => {
    setCountryCode(value);
  };
  const handlePhoneNumber = (textinput) => {
    setPhoneNumber(textinput);
  };
  const handleDescriptionText = (textinput) => {
    setDescriptionText(textinput);
  };
  const handleEntryText = (textinput) => {
    setEntryText(textinput);
  };
  const handleSelectedContact = (name, number) => {
    number = number.match(/\d/g).join('').substr(-10);
    setPhoneNumber(number);
    setDescriptionText(name);
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
        .field_value.speed[sd_item_idx];
    } catch (e) {
      console.warn('ERROR: bad JSON in response ' + res);
      return;
    }

    if (json_res.entry != sd_item_new.entry) {
      console.warn(
        'ERROR: item not updated. entry mismatch: ' +
          json_res.entry +
          ' - ' +
          sd_item_new.entry,
      );
      return;
    }
    if (json_res.description != sd_item_new.description) {
      console.warn(
        'ERROR: item not updated. description mismatch: ' +
          json_res.description +
          ' - ' +
          sd_item_new.description,
      );
      return;
    }
    if (json_res.number != sd_item_new.number) {
      console.warn(
        'ERROR: item not updated. number mismatch: ' +
          json_res.number +
          ' - ' +
          sd_item_new.number,
      );
      return;
    }

    if (setSpeedDials(sd_item_new, sd_item_idx) == null) return;

    props.onSave(sd_item_new, sd_item_idx);
  };

  const handleSaveRequest = (item_new, item_idx) => {
    var json_head = {
      dialer: {
        speed: JSON.parse(JSON.stringify(getSpeedDials())),
      },
    };
    var json_speed = json_head.dialer.speed;
    json_speed[item_idx] = item_new;
    console.log('sup: ' + JSON.stringify(json_head));
    performSaveStatusPage(json_head, handleSaveResponse);
  };

  const handleSavePress = (desc, code, phone, entry) => {
    console.log(
      'sup: saving: ' + desc + ' ' + code + ' ' + phone + ' ' + entry,
    );
    sd_item_new.entry = entry;
    sd_item_new.description = desc;
    sd_item_new.number = '011' + code + phone;
    if (code === '1') {
      sd_item_new.number = phone;
    }
    handleSaveRequest(sd_item_new, sd_item_idx);
  };

  //////////////////////////////////////////////////////////////////////////////////// Delete functionality begin
  const handleDeleteResponse = (res) => {
    var json_res = null;
    try {
      json_res = JSON.parse(res.trim().slice(1, -2)).fields[1].validated
        .field_value.speed;
    } catch (e) {
      console.warn('ERROR: bad JSON in response ' + res);
      return;
    }

    if (json_res.length == getSpeedDials().length - 1) {
      if (delSpeedDials(sd_item_idx) == null) return;
    } else {
      console.log(
        'App: item not deleted: ' +
          props.sd_item.entry +
          ' - ' +
          props.sd_item.number +
          ' - ' +
          props.sd_item.description,
      );
      return;
    }

    props.onSave(null, sd_item_idx);
  };
  const handleDeleteRequest = (item, index) => {
    var sd_array_local = JSON.parse(JSON.stringify(getSpeedDials()));
    if (item.entry != sd_array_local[index].entry) {
      console.log(
        'App: delete candidate: ' +
          item.entry +
          ' not same as entry ' +
          sd_array_local[index].entry,
      );
      return;
    }
    if (item.description != sd_array_local[index].description) {
      console.log(
        'App: delete candidate: ' +
          item.description +
          ' not same as entry ' +
          sd_array_local[index].description,
      );
      return;
    }
    if (item.number != sd_array_local[index].number) {
      console.log(
        'App: delete candidate: ' +
          item.number +
          ' not same as entry ' +
          sd_array_local[index].number,
      );
      return;
    }

    sd_array_local.splice(index, 1); // deletes the entry at index

    var json_head = {
      dialer: {
        speed: JSON.parse(JSON.stringify(sd_array_local)),
      },
    };

    console.log('sup: ' + JSON.stringify(json_head));
    performSaveStatusPage(json_head, handleDeleteResponse);
  };
  const handleDeletePress = () => {
    console.log(
      'sup: deleting: ' +
        props.sd_item.description +
        ' at index: ' +
        sd_item_idx,
    );
    handleDeleteRequest(props.sd_item, sd_item_idx);
  };

  const confirmDeleteAlert = () =>
    Alert.alert('Delete Speed Dial', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text:
          'Remove ' + props.sd_item.description + ' - ' + props.sd_item.entry,
        onPress: handleDeletePress,
      },
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
          onPress={handleSavePress.bind(
            this,
            descriptionText,
            countryCode,
            phoneNumber,
            entryText,
          )}
        />
      </View>

      <Divider style={{margin: 5}} />

      <ScrollView>
        <Text style={styles.editModalLabelText}>Description:</Text>
        <TextInput
          placeholder="Description"
          placeholderColor="#c4c3cb"
          defaultValue={descriptionText}
          style={styles.formTextInput}
          onChangeText={handleDescriptionText}
        />
        <Text style={styles.editModalLabelText}>Destination:</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, marginRight: 5}}>
            <RNPickerSelect
              style={styles.pickerCountryCode}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => handleCountryCode(value)}
              value={countryCode}
              items={listCountryCodes}
            />
          </View>
          <View style={{flex: 2, marginLeft: 5}}>
            <TextInput
              placeholder="Destination"
              telephoneNumber="telephoneNumber"
              placeholderColor="#c4c3cb"
              defaultValue={phoneNumber}
              style={styles.formTextInput}
              onChangeText={handlePhoneNumber}
            />
          </View>
        </View>
        <Text style={styles.editModalLabelText}>Entry:</Text>
        <TextInput
          placeholder="Entry"
          placeholderColor="#c4c3cb"
          defaultValue={entryText}
          style={styles.formTextInput}
          onChangeText={handleEntryText}
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

        {props.sd_item.account_id != null && (
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Button
              type="clear"
              title={delete_text}
              titleStyle={[styles.editModalHeaderText, {color: 'red'}]}
              onPress={confirmDeleteAlert}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
