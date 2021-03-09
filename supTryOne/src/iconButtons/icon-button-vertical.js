import {useLinkProps} from '@react-navigation/native';
import React from 'react';
import {Button, Icon} from 'react-native-elements';

import styles from '../style/style';

export default function IconButtonVertical(props) {
  return (
    <Button
      type="clear"
      buttonStyle={{flexDirection: 'column'}}
      title={props.title}
      titleStyle={{color: 'white', fontSize: 10}}
      icon={<Icon name={props.icon} type="material" size={20} color="white" />}
      onPress={props.onTap}
    />
  );
}
