import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Image,
  StatusBar,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import TitleBar from './titlebar';
import styles from '../style/style';
import {getJSON1, getJSON2} from '../javascript/profile';

const logoimagestr = require('../images/logo.png');

export default function MainPage() {
  console.log('sup: showing main page screen');
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={localstyles.logoImageView}>
        <Image source={logoimagestr} style={localstyles.logoImage} />
      </View>

      <Text style={localstyles.nameText}>
        {getJSON1().customer_record.FIRST_NAME}{' '}
        {getJSON1().customer_record.LAST_NAME}
      </Text>

      <View style={localstyles.accountInfoView}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={localstyles.contentText}>Plan</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={localstyles.contentText}>
              {getJSON1().customer_record.cos}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={localstyles.contentText}>Account</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={localstyles.contentText}>
              {getJSON1().customer_record.ACCOUNT}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={localstyles.contentText}>Minutes</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={localstyles.contentText}>
              {getJSON1().customer_record.minutes}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={localstyles.contentText}>Renews On</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={localstyles.contentText}>
              {getJSON1().customer_record.NEXT_RENEWAL_DATE}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={localstyles.contentText}>Member Since</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={localstyles.contentText}>
              {getJSON1().customer_record.ACTIVATION_DATE_TIME_adjusted}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={localstyles.contentText}>Access Number</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={localstyles.contentText}>
              {getJSON1().customer_record.ACCESS_NUMBER}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const localstyles = StyleSheet.create({
  logoImageView: {
    alignItems: 'center',
    paddingTop: 50,
  },
  logoImage: {
    height: 82,
    width: 208,
    resizeMode: 'cover',
  },
  nameText: {
    color: 'orangered',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  contentText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 5,
    textAlign: 'left',
  },
  accountInfoView: {
    backgroundColor: 'whitesmoke',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
});
