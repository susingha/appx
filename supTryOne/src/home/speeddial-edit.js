import React, {useState} from 'react';
import {Button, Divider} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import parsePhoneNumber from 'libphonenumber-js';

import {View, Text, TextInput} from 'react-native';

import styles from '../style/style';
import {
  getSpeedDials,
  setSpeedDials,
  getAccountId,
} from '../javascript/profile';
import {listCountryCodes} from '../javascript/codes';
import {performSaveSpeedDial, performRefresh} from '../javascript/browser';
import {ScrollView} from 'react-native-gesture-handler';

import {checkRequestPermissionContacts} from '../javascript/permission';
import {Platform} from 'react-native';
import {selectContactPhone} from 'react-native-select-contact';
import Contacts from 'react-native-contacts';

//////////////////////////////////////////////////////////////////////////////////// Parsing functions
const parseValidDest = (dest) => {
  var no;
  if (dest[0] === '0' && dest[1] === '1' && dest[2] === '1') {
    no = '+' + dest.substring(3);
  } else {
    no = '+1' + dest;
  }
  return parsePhoneNumber(no);
};
const decodeDestToCC = (no) => {
  var valid = parseValidDest(no);
  if (valid) {
    return valid.countryCallingCode;
  }
  return '0';
};
const decodeDestToNo = (no) => {
  var valid = parseValidDest(no);
  if (valid) {
    return valid.nationalNumber;
  }
  return '0';
};

//////////////////////////////////////////////////////////////////////////////////// Component starts here
export default function SpeedDialEdit(props) {
  console.log('sup: editing: ' + JSON.stringify(props.sd_item));

  const sd_item_idx = props.sd_indx;
  const header_text = 'Speed Dial: ' + props.sd_item.entry;
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
    performSaveSpeedDial(json_head, handleSaveResponse);
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
  //////////////////////////////////////////////////////////////////////////////////// Save functionality end

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
          disabled={true}
          type="clear"
          title={header_text}
          titleStyle={styles.editModalHeaderText}
        />

        <Button
          type="clear"
          title="Save"
          titleStyle={styles.editModalHeaderText}
          onPress={handleSavePress.bind(this, null, null, null, null)}
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
      </ScrollView>
    </View>
  );
}
