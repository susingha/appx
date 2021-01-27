import React from 'react';
import {Button, Icon} from 'react-native-elements';

import {
  StatusBar,
  StyleSheet,
  Keyboard,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
  Animated,
  TouchableNativeFeedback,
} from 'react-native';

import SCALE from '../javascript/animations';
import styles from '../style/style';

export default function AutoDialEntry(props) {
  const scaleInAnimated = new Animated.Value(0);
  const scaleOutAnimated = new Animated.Value(0);

  const onCardPress = (idx) => {
    console.log('sup: edit to modal pressed: ' + idx);
    props.onPress(idx);
  };

  const onCallPress = (item) => {
    console.log('sup: call ' + item.dnis);
  };

  const item = props.ad_item;
  const indx = props.ad_indx;

  const phone_text =
    ' (' +
    item.dnis.substring(0, 3) +
    ') ' +
    item.dnis.substring(3, 6) +
    '-' +
    item.dnis.substring(6);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onLongPress={onCardPress.bind(this, indx)}
      onPressIn={() => {
        SCALE.pressInAnimation(scaleInAnimated);
      }}
      onPressOut={() => {
        SCALE.pressOutAnimation(scaleInAnimated);
      }}
      style={SCALE.getScaleTransformationStyle(scaleInAnimated, 1, 0.97)}>
      <Animated.View>
        <View style={styles.cardViewTop}>
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
              icon={
                <Icon name="call" type="material" size={17} color="white" />
              }
            />
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
