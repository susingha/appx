import React from 'react';
import Colors from '../javascript/colors';
import LinearGradient from 'react-native-linear-gradient';
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
  const onCallPress = () => {
    console.log('sup: call button pressed');
  };

  const item = props.ad_item;
  console.log(
    'sup: ' + item.dnis + ' -  ' + item.description + ' -  ' + item.destination,
  );

  const phone_text =
    ' (' +
    item.dnis.substring(0, 3) +
    ') ' +
    item.dnis.substring(3, 6) +
    '-' +
    item.dnis.substring(6);

  return (
    <>
      <View style={styles.cardViewTop}>
        <View style={{flex: 1}}>
          <Text style={styles.cardTitleText}>{item.description}</Text>
          <Text style={styles.cardDescrText}>{item.destination}</Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <Button
            title={phone_text}
            titleStyle={styles.phoneNumberText}
            onPress={onCallPress}
            buttonStyle={styles.phoneButton}
            icon={<Icon name="call" size={15} color="white" />}
          />

          {/* <Button buttonStyle={styles.loginButton} title="Login" /> */}
        </View>
      </View>
    </>
  );
}
