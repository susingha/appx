import React, {useState} from 'react';
import {performLogin} from '../javascript/httpurl';

import styles from './style';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from 'react-native-elements';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const consoleLog = log => {
    console.log(log);
  };

  const handleUsername = usernametext => {
    consoleLog(usernametext);
    setUsername(usernametext);
  };

  const handlePassword = passwordtext => {
    consoleLog(passwordtext);
    setPassword(passwordtext);
  };

  const onLoginPress = () => {
    consoleLog('Hello world!');
    consoleLog('Username: ' + username);
    consoleLog('Password: ' + password);

    performLogin(username, password);
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
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
