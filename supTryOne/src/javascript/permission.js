import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const checkRequestPermissionContacts = (cb) => {
  checkPermissionContacts(cb);
};

const checkPermissionContacts = (cb) => {
  var perm = null;

  switch (Platform.OS) {
    case 'ios':
      perm = PERMISSIONS.IOS.CONTACTS;
      break;
    case 'android':
      perm = PERMISSIONS.ANDROID.READ_CONTACTS;
      break;
    case 'web':
    default:
  }

  check(perm)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('App: Feature not available (in device / context)');
          requestPermissionContacts(cb);
          break;
        case RESULTS.DENIED:
          console.log('App: Permission not requested / denied but requestable');
          requestPermissionContacts(cb);
          break;
        case RESULTS.LIMITED:
          console.log('App: Ppermission limited: some actions possible');
          requestPermissionContacts(cb);
          break;
        case RESULTS.GRANTED:
          console.log('App: Permission is granted');
          cb(permission_contacts = true);
          break;
        case RESULTS.BLOCKED:
          console.log('App: Permission denied not requestable anymore');
          requestPermissionContacts(cb);
          break;
      }
    })
    .catch((error) => {
      console.log('App: Error requesting permission: ' + perm);
    });
};

const requestPermissionContacts = (cb) => {
  var perm = null;

  switch (Platform.OS) {
    case 'ios':
      perm = PERMISSIONS.IOS.CONTACTS;
      break;
    case 'android':
      perm = PERMISSIONS.ANDROID.READ_CONTACTS;
      break;
    case 'web':
    default:
  }

  request(perm)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('App: Feature not available (in device / context)');
          break;
        case RESULTS.DENIED:
          console.log('App: Permission not requested / denied but requestable');
          break;
        case RESULTS.LIMITED:
          console.log('App: Ppermission limited: some actions possible');
          break;
        case RESULTS.GRANTED:
          console.log('App: Permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('App: Permission denied not requestable anymore');
          break;
      }
    })
    .catch((error) => {
      console.log('App: Error requesting permission: ' + perm);
    });
};
