import React from 'react';


import MainPage from './mainpage';
import AutoDial from './autodial';
import MorePage from './morepage';

export default function Pager(props) {
  var ret = null;

  if (props.pageName == 'main') {
    ret = <MainPage />;
  }
  if (props.pageName == 'auto') {
    ret = <AutoDial />;
  }
  if (props.pageName == 'speed') {
    ret = <AutoDial />;
  }
  if (props.pageName == 'recents') {
    ret = <AutoDial />;
  }
  if (props.pageName == 'pinless') {
    ret = <AutoDial />;
  }
  if (props.pageName == 'more') {
    ret = <MorePage />;
  }

  return ret;
}
