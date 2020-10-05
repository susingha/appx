import React, {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import { performRequestStatus } from './httpurl';
import { setLoggedOut } from './profileData';


const HandleAppActive = () => {
  console.log('sup: App is active. check for login');
};

export const initAppStateChange = () => {
  // App State Change Event Handler
  const [appState, setAppState] = useState(AppState.currentState);
  const handleAppStateChange = (state) => {
    setAppState(state);
  };
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
  useEffect(() => {
    console.log('sup: ' + appState);
    switch (appState) {
      case 'active':
        HandleAppActive();
        break;
      default:
        break;
    }
  });
};



const performLoginAutoResponse = (res) => {
  if (res) {
    // we are good. do nothing    
  } else {
    setLoggedOut();
    reDrawScreen();
  }

}

const performRequestStatusResponse = (res) => {
  if (res) {
    // we are good. do nothing
  } else {
    // we need to perform login with username and password
    performLoginAuto(performLoginAutoResponse);

  }

}

const validateLoginState = () => {
  if (findLogin()) {
    performRequestStatus(performRequestStatusResponse);
  }
}