import React from 'react';


import MainPage from './mainpage';
import AutoDial from './autodial';
import SpeedDial from './speeddial';
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
    ret = <SpeedDial />;
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
