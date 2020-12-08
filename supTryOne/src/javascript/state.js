import React, {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import { getLoggedInLocal, setLoggedOut } from './profile';

var refreshScreenCallback = null;

const loginAutoResponse = (loggedinStatus) => {
  if (loggedinStatus) {
    // we signed in. do nothing
    console.log("sup: loginAutoResponse remote signed in. with user pass. refresh screen");
    refreshScreenCallback(null);
  } else {
    console.log("sup: LoggedinResponse remote signed out with pass change. logout local");
    setLoggedOut();
    refreshScreenCallback(null);
  }

}

const LoggedinResponse = (loggedinStatus) => {
  if (loggedinStatus) {
    // we are still signed in. do nothing
    console.log("sup: LoggedinResponse remote signed in. ok");
    refreshScreenCallback(null);
  } else {
    console.log("sup: LoggedinResponse remote signed out. try with user pass");
    performLoginAuto({data: null, func: loginAutoResponse});
  }
}

const HandleAppActive = () => {
  console.log('sup: App is active. check for login');
  if (getLoggedInLocal()) {
    performLoggedinCheck({data: null, func: LoggedinResponse});
  }
};


export const initAppStateChange = (cb) => {
  refreshScreenCallback = cb;

  // App State Change Event Handler
  const handleAppStateChange = (state) => {
    console.log('sup:2 ' + state);
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      console.log('sup:6');
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
};
