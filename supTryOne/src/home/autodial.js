import React from 'react';
import {Button, Icon} from 'react-native-elements';
import styles from '../style/style';
import {
  StatusBar,
  StyleSheet,
  Keyboard,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

export default function AutoDialEntry(props) {
  const onCardPress = (idx) => {
    console.log('sup: edit to modal pressed: ' + idx);
    props.onPress(idx);
  };

  const onCallPress = (item) => {
    console.log('sup: call ' + item.dnis);
  };

  const item = props.ad_item;
  const indx = props.ad_indx;
  console.log(
    'sup: ' + indx + ' - ' + item.dnis + ' -  ' + item.description + ' -  ' + item.destination,
  );

  const phone_text =
    ' (' +
    item.dnis.substring(0, 3) +
    ') ' +
    item.dnis.substring(3, 6) +
    '-' +
    item.dnis.substring(6);

  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={onCardPress.bind(this, indx)}
      style={styles.cardViewTop}>
      <View style={{flex: 1}}>
        <Text style={styles.cardTitleText}>{item.description}</Text>
        <Text style={styles.cardDescrText}>{item.destination}</Text>
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button
          title={phone_text}
          titleStyle={styles.phoneNumberText}
          onPress={onCallPress.bind(this, item)}
          buttonStyle={styles.phoneButton}
          icon={<Icon name="call" type="material" size={17} color="white" />}
        />
      </View>
    </TouchableOpacity>
  );
}
