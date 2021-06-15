import React from 'react';

import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {Button, Icon} from 'react-native-elements';

import SCALE from '../javascript/animations';
import styles from '../style/style';

export default function PinlessDialEntry(props) {
  const scaleInAnimated = new Animated.Value(0);
  const scaleOutAnimated = new Animated.Value(0);

  const onCardPress = (idx) => {
    console.log('sup: edit to modal pressed: ' + idx);
    props.onPress(idx);
  };

  const item = props.pd_item;
  const indx = props.pd_indx;

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
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Button
              disabledTitleStyle={{fontSize: 25, color: 'orangered'}}
              disabled
              buttonStyle={styles.speedButton}
              icon={
                <Icon
                  name="person"
                  type="material"
                  size={30}
                  color="orangered"
                />
              }
            />
          </View>

          <View>
            <Text style={styles.cardTitleText}> </Text>
            <Text style={styles.cardDescrText}> </Text>
          </View>

          <View style={{flex: 3, justifyContent: 'center'}}>
            <Text
              style={[styles.cardTitleText, {fontSize: 30, letterSpacing: 5}]}>
              {item.alias}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
