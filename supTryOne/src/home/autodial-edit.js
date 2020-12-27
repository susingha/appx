import React, {useState} from 'react';
import {Button} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import parsePhoneNumber from 'libphonenumber-js';
import styles from '../style/style';
import {
  StatusBar,
  StyleSheet,
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

export default function AutoDialEdit(props) {
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

  const handleSavePress = (desc, code, phone) => {
    var ad_item_new = {dnis: null, description: null, destination: null};
    console.log('sup: saved: ' + desc + ' ' + code + ' ' + phone);
    ad_item_new.dnis = props.ad_item.dnis;
    ad_item_new.description = desc;
    ad_item_new.destination = '011' + code + phone;
    if (code === '1') {
      ad_item_new.destination = phone;
    }
    props.onSave(ad_item_new);
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
