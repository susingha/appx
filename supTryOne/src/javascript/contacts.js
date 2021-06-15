
import Contacts from 'react-native-contacts';
import parsePhoneNumber from 'libphonenumber-js';
import {selectContactPhone} from 'react-native-select-contact';

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
export const decodeDestToCC = (no) => {
  var valid = parseValidDest(no);
  if (valid) {
    return valid.countryCallingCode;
  }
  return '0';
};
export const decodeDestToNo = (no) => {
  var valid = parseValidDest(no);
  if (valid) {
    return valid.nationalNumber;
  }
  return '0';
};

//////////////////////////////////////////////////////////////////////////////////// Contacts functions
export const onContactsPressIm = (selectedcb) => {
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

export const onContactsPressEx = (phone) => {
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
