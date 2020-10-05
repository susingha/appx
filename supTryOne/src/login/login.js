import React, {useState} from 'react';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  ImagePropTypes,
} from 'react-native';
import {Button} from 'react-native-elements';

import styles from './style';
import {performLogin, performRequestStatus} from '../javascript/httpurl';


export default function LoginScreen (props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const onRequestStatus = () => {
    console.log('Request Status Page');
    performRequestStatus(props.onLogin);
  }

  const onLoginPress = () => {
    console.log('Hello world!');
    console.log('Username: ' + username);
    console.log('Password: ' + password);

    performLogin(username, password, props.onLogin);
  };

  const handleUsername = usernametext => {
    console.log(usernametext);
    setUsername(usernametext);
  };

  const handlePassword = passwordtext => {
    console.log(passwordtext);
    setPassword(passwordtext);
  };

  const onWritePress = async () => {
    console.log('sup: attempting write');
    
      try {
        await AsyncStorage.setItem('TASKS', 'I like to save it.');
      } catch (error) {
        // Error saving data
        console.log('sup: Error saving data');
      }
    
  };

  const onReadPress = async () => {
    console.log('sup: attempting read');
      try {
        const value = await AsyncStorage.getItem('TASKS');
        if (value !== null) {
          // We have data!!
          console.log(value);
        } else {
          console.log("sup: data was null");
        }
      } catch (error) {
        // Error retrieving data
        console.log('sup: Error retrieving data');
      }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.loginScreenContainer}>
        <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Instamobile</Text>
          <TextInput
            placeholder="Username"
            placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
            onChangeText={handleUsername}
          />
          <TextInput
            placeholder="Password"
            placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
            onChangeText={handlePassword}
            secureTextEntry={true}
          />

          <Button
            buttonStyle={styles.loginButton}
            onPress={onLoginPress}
            title="Login"
          />
          <Button
            buttonStyle={styles.loginButton}
            onPress={onRequestStatus}
            title="Request Status"
          />
          <Button
            buttonStyle={styles.loginButton}
            onPress={onWritePress}
            title="Write"
          />
          <Button
            buttonStyle={styles.loginButton}
            onPress={onReadPress}
            title="Read"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
