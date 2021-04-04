import React from 'react';
import {Button, Icon} from 'react-native-elements';

import {View, Text, TouchableOpacity, Animated} from 'react-native';

import SCALE from '../javascript/animations';
import styles from '../style/style';

export default function SpeedDialEntry(props) {
  const scaleInAnimated = new Animated.Value(0);
  const scaleOutAnimated = new Animated.Value(0);

  const onCardPress = (idx) => {
    console.log('sup: edit to modal pressed: ' + idx);
    props.onPress(idx);
  };

  const item = props.sd_item;
  const indx = props.sd_indx;

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
          <View style={{flex: 2}}>
            <Text style={styles.cardTitleText}>{item.description}</Text>
            <Text style={styles.cardDescrText}>{item.number}</Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            
            <Button
              title={item.entry}
              titleStyle={{fontSize: 25}}
              buttonStyle={styles.speedButton}
              disabled
            />
            
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
