import React, {useState} from 'react';
import {Button, Divider} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import parsePhoneNumber from 'libphonenumber-js';

import {View, Text, TextInput} from 'react-native';

import styles from '../style/style';
import {getAutoDials, setAutoDials} from '../javascript/profile';
import {listCountryCodes} from '../javascript/codes';
import {performSaveAutoDial, performRefresh} from '../javascript/browser';
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

//////////////////////////////////////////////////////////////////////////////////// Contacts functions
const onContactsPressIm = (selectedcb) => {
  console.log('sup: Contacts Import');
  return selectContactPhone().then((selection) => {
    if (!selection) {
      return null;
    }

    let {contact, selectedPhone} = selection;
    console.log(
      'App: Contact selected' +
        selectedPhone.type +
        ' - ' +
        selectedPhone.number +
        ' - ' +
        contact.name,
    );

    selectedcb(contact.name, selectedPhone.number);
    return selectedPhone.number;
  });
};

const onContactsPressEx = (phone) => {
  console.log('sup: Contacts Export');
  var newPerson = {
    phoneNumbers: [
      {
        number: phone,
        label: 'IndiaLD',
      },
    ],
    /*
    displayName: 'Friedrich Nietzsche', // Android
    familyName: 'Jung', // Ios
    givenName: 'Carl',
    middleName: '',
    */
  };
  Contacts.openContactForm(newPerson).then((contact) => {
    // console.log('App: contact saved');
  });
};

//////////////////////////////////////////////////////////////////////////////////// Component starts here
export default function AutoDialEdit(props) {
  console.log('sup: editing: ' + JSON.stringify(props.ad_item));

  const ad_item_idx = props.ad_indx;
  const phone_text =
    ' (' +
    props.ad_item.dnis.substring(0, 3) +
    ') ' +
    props.ad_item.dnis.substring(3, 6) +
    '-' +
    props.ad_item.dnis.substring(6);
  var ad_item_new = {
    account_id: props.ad_item.account_id,
    autodialer_id: props.ad_item.autodialer_id,
    dnis: props.ad_item.dnis,
    destination: null,
    description: null,
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
  const handleContactExport = () => {
    onContactsPressEx(phone_text);
  };

  //////////////////////////////////////////////////////////////////////////////////// Save functionality begin
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
    console.log('sup: saving: ' + desc + ' ' + code + ' ' + phone);
    ad_item_new.description = desc;
    ad_item_new.destination = '011' + code + phone;
    if (code === '1') {
      ad_item_new.destination = phone;
    }

    handleSaveRequest(ad_item_new, ad_item_idx);
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
          title={phone_text}
          titleStyle={styles.editModalHeaderText}
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

        <View style={{margin: 5}} />

        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Button
            type="clear"
            title="Contact import"
            titleStyle={styles.editModalHeaderText}
            onPress={handleContactImport.bind(permission_contacts = false)}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Button
            type="clear"
            title="Contact export"
            titleStyle={styles.editModalHeaderText}
            onPress={handleContactExport}
          />
        </View>
      </ScrollView>
    </View>
  );
}
