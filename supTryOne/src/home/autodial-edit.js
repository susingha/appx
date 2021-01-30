import React, {useState} from 'react';
import {Button, Divider} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import parsePhoneNumber from 'libphonenumber-js';

import {View, Text, TextInput} from 'react-native';

import styles from '../style/style';
import {getAutoDials, setAutoDials} from '../javascript/profile';
import {performSaveAutoDial, performRefresh} from '../javascript/browser';

export default function AutoDialEdit(props) {
  console.log('sup:editing');
  console.log(JSON.stringify(props.ad_item));

  var ad_item_new = {
    account_id: props.ad_item.account_id,
    autodialer_id: props.ad_item.autodialer_id,
    dnis: props.ad_item.dnis,
    destination: null,
    description: null,
  };

  const listCountryCodes = [
    {value: '61', label: 'Australia (+61)'},
    {value: '43', label: 'Austria (+43)'},
    {value: '32', label: 'Belgium (+32)'},
    {value: '86', label: 'China (+86)'},
    {value: '45', label: 'Denmark (+45)'},
    {value: '33', label: 'France (+33)'},
    {value: '49', label: 'Germany (+49)'},
    {value: '852', label: 'Hong Kong (+852)'},
    {value: '91', label: 'India (+91)'},
    {value: '353', label: 'Ireland (+353)'},
    {value: '972', label: 'Israel (+972)'},
    {value: '39', label: 'Italy (+39)'},
    {value: '81', label: 'Japan (+81)'},
    {value: '60', label: 'Malaysia (+60)'},
    {value: '31', label: 'Netherlands (+31)'},
    {value: '64', label: 'New Zealand (+64)'},
    {value: '47', label: 'Norway (+47)'},
    {value: '48', label: 'Poland (+48)'},
    {value: '351', label: 'Portugal (+351)'},
    {value: '65', label: 'Singapore (+65)'},
    {value: '34', label: 'Spain (+34)'},
    {value: '46', label: 'Sweden (+46)'},
    {value: '41', label: 'Switzerland (+41)'},
    {value: '886', label: 'Taiwan (+886)'},
    {value: '66', label: 'Thailand (+66)'},
    {value: '44', label: 'United Kingdom (+44)'},
    {value: '1', label: 'US/Canada (+1)'},
  ];

  const ad_item_idx = props.ad_indx;
  const phone_text =
    ' (' +
    props.ad_item.dnis.substring(0, 3) +
    ') ' +
    props.ad_item.dnis.substring(3, 6) +
    '-' +
    props.ad_item.dnis.substring(6);

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

  const [descriptionText, setDescriptionText] = useState(
    props.ad_item.description,
  );
  const [countryCode, setCountryCode] = useState(
    decodeDestToCC(props.ad_item.destination),
  );
  const [phoneNumber, setPhoneNumber] = useState(
    decodeDestToNo(props.ad_item.destination),
  );

  const handleCountryCode = (value) => {
    setCountryCode(value);
  };
  const handlePhoneNumber = (textinput) => {
    setPhoneNumber(textinput);
  };
  const handleDescriptionText = (textinput) => {
    setDescriptionText(textinput);
  };

  const handleSaveResponse = (res) => {
    var json_res = null;
    try {
      json_res = JSON.parse(res.trim().slice(1, -2)).fields[1].validated
        .field_value.auto[ad_item_idx];
    } catch (e) {
      console.warn('ERROR: bad JSON in response ' + res);
      return;
    }

    if (json_res.dnis != ad_item_new.dnis) {
      console.warn(
        'ERROR: item not updated. dnis mismatch: ' +
          json_res.dnis +
          ' - ' +
          ad_item_new.dnis,
      );
      return;
    }
    if (json_res.description != ad_item_new.description) {
      console.warn(
        'ERROR: item not updated. description mismatch: ' +
          json_res.description +
          ' - ' +
          ad_item_new.description,
      );
      return;
    }
    if (json_res.destination != ad_item_new.destination) {
      console.warn(
        'ERROR: item not updated. destination mismatch: ' +
          json_res.destination +
          ' - ' +
          ad_item_new.destination,
      );
      return;
    }

    if (setAutoDials(ad_item_new, ad_item_idx) == null) return;

    props.onSave(ad_item_new, ad_item_idx);
  };

  const handleSaveRequest = (item_new, item_idx) => {
    var json_head = {
      dialer: {
        auto: JSON.parse(JSON.stringify(getAutoDials())),
      },
    };
    var json_auto = json_head.dialer.auto;

    if (json_auto[item_idx].dnis !== item_new.dnis) {
      console.warn(
        'ERROR: in item ' +
          JSON.stringify(item_new) +
          ' at edit index: ' +
          item_idx +
          ' dnis mismatch: ' +
          json_auto[item_idx].dnis +
          ' !== ' +
          item_new.dnis,
      );
    }
    if (json_auto[item_idx].account_id !== item_new.account_id) {
      console.warn(
        'ERROR: in item ' +
          JSON.stringify(item_new) +
          ' at edit index: ' +
          item_idx +
          ' dnis mismatch: ' +
          json_auto[item_idx].account_id +
          ' !== ' +
          item_new.account_id,
      );
    }
    if (json_auto[item_idx].autodialer_id !== item_new.autodialer_id) {
      console.warn(
        'ERROR: in item ' +
          JSON.stringify(item_new) +
          ' at edit index: ' +
          item_idx +
          ' dnis mismatch: ' +
          json_auto[item_idx].autodialer_id +
          ' !== ' +
          item_new.autodialer_id,
      );
    }

    json_auto[item_idx] = item_new;
    console.log('sup: ' + JSON.stringify(json_head));
    performSaveAutoDial(json_head, handleSaveResponse);
  };

  const handleSavePress = (desc, code, phone) => {
    console.log('sup: saved: ' + desc + ' ' + code + ' ' + phone);
    ad_item_new.description = desc;
    ad_item_new.destination = '011' + code + phone;
    if (code === '1') {
      ad_item_new.destination = phone;
    }

    handleSaveRequest(ad_item_new, ad_item_idx);
  };

  return (
    <View style={styles.editModalList}>
      <View style={styles.phoneNumberView}>
        <Text style={styles.phoneNumberText}>{phone_text}</Text>
      </View>
      <TextInput
        placeholder="Description"
        placeholderColor="#c4c3cb"
        defaultValue={descriptionText}
        style={styles.loginFormTextInput}
        onChangeText={handleDescriptionText}
      />
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
            placeholderColor="#c4c3cb"
            defaultValue={phoneNumber}
            style={styles.textInputPhone}
            onChangeText={handlePhoneNumber}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, marginRight: 5}}>
          <Button
            buttonStyle={styles.cencelButton}
            title="Cancel"
            onPress={props.onCancel}
          />
        </View>
        <View style={{flex: 2, marginLeft: 5}}>
          <Button
            buttonStyle={styles.saveButton}
            title="Save"
            onPress={handleSavePress.bind(
              this,
              descriptionText,
              countryCode,
              phoneNumber,
            )}
          />
        </View>
      </View>
    </View>
  );
}
