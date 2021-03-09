import React, {useState, useRef} from 'react';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from 'react-native-elements';

import styles from '../style/style';
import {performLogin} from '../javascript/browser';


export default function LoginScreen(props) {
  // sup: we dont need the useState for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    console.log('Hello world!');
    console.log('Username: ' + username);
    console.log('Password: ' + password);

    performLogin({
      user: username,
      pass: password,
      succ_cb: null,
      fail_cb: null,
    });
  };

  const handleUsername = (usernametext) => {
    console.log(usernametext);
    setUsername(usernametext);
  };

  const handlePassword = (passwordtext) => {
    console.log(passwordtext);
    setPassword(passwordtext);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>

      <View style={styles.topLevelView}>
      <View style={styles.bodyView}>
        <Text style={styles.logoText}>Instamobile</Text>

        <TextInput
          placeholder="Username"
          placeholderColor="#c4c3cb"
          style={styles.formTextInput}
          onChangeText={handleUsername}
        />

        <TextInput
          placeholder="Password"
          placeholderColor="#c4c3cb"
          style={styles.formTextInput}
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
