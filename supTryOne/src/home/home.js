import React, {useEffect, useState} from 'react';
import {StatusBar, View, Text} from 'react-native';

import TitleBar from './titlebar';
import Pager from './pager';
import styles from '../style/style';
import IconButtonVertical from '../iconButtons/icon-button-vertical';

import {performRefresh} from '../javascript/browser';
import {getJSPage, setJSPage} from '../javascript/profile';

var waitToRefresh = 5;
const fiveMinuteRefresh = () => {
  if (waitToRefresh) {
    waitToRefresh -= 1;
  } else {
    waitToRefresh = 5;
    performRefresh();
  }
};

export default function HomeScreen() {
  console.log('sup: Showing home screen');

  useEffect(() => {
    const refreshon = setInterval(fiveMinuteRefresh, 60000); // 60000 is 1 minute
    return () => {
      clearInterval(refreshon);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(getJSPage());
  const showPage = (pagename) => {
    console.log('sup: page ' + pagename);
    setJSPage(pagename);
    setCurrentPage(pagename);
  };

  return (
    <>
      <View style={styles.topLevelView}>
        <View style={styles.bodyView}>
          <Pager pageName={currentPage} />
        </View>
        <View style={styles.footerView}>
          <IconButtonVertical
            title="Main"
            icon="home"
            onTap={showPage.bind(this, 'main')}
          />
          <IconButtonVertical
            title="Auto Dial"
            icon="call"
            onTap={showPage.bind(this, 'auto')}
          />
          <IconButtonVertical
            title="Speed Dial"
            icon="add-call"
            onTap={showPage.bind(this, 'speed')}
          />
          <IconButtonVertical
            title="Recents"
            icon="history"
            onTap={showPage.bind(this, 'recents')}
          />
          <IconButtonVertical
            title="Pinless Dial"
            icon="person-add"
            onTap={showPage.bind(this, 'pinless')}
          />
          <IconButtonVertical
            title="More"
            icon="more-horiz"
            onTap={showPage.bind(this, 'more')}
          />

          {/* Home, AutoDial, SpeedDial, Recents (History), PinlessDial, More */}
          {/* More: Profile (Update Account tab), Logout */}
        </View>
      </View>
    </>
  );
}
