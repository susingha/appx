import AsyncStorage from '@react-native-community/async-storage';

export const writeKeyVal = async (key, val) => {

  try {
    await AsyncStorage.setItem(key, val);
    return true;
  } catch (error) {
    // Error saving data
    console.log('sup: Error saving data');
    return false;
  }
};

export const readKeyVal = async (key) => {

  try {
    const value = await AsyncStorage.getItem(key);
    // We have data!!
    // console.log('sup: read value: ' + key + '-' + value);
    return {succ: true, val: value};
  } catch (error) {
    // Error retrieving data
    console.log('sup: Error retrieving data');
    return {succ: false, val: null};
  }
};