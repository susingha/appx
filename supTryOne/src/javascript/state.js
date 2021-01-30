import React, {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import {performRefresh} from './browser';
import {getJSLoggedin} from './profile';

export const initAppStateChange = (cb) => {
  refreshScreenCallback = cb;

  // App State Change Event Handler
  const handleAppStateChange = (state) => {
    console.log('sup: state: ' + state);

    switch (state) {
      case 'active':
        if (getJSLoggedin()) performRefresh();
      default:
    }
  };

  useEffect(() => {
    // console.log('sup: mounted');
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      // console.log('sup: un-mounted');
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
};
