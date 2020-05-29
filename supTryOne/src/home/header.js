import React from 'react';
import {StatusBar, StyleSheet, View, Text} from 'react-native';

const Header = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{props.title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 100,
    paddingTop: 26,
    backgroundColor: '#f7287b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'black',
    fontSize: 21,
  },
});
