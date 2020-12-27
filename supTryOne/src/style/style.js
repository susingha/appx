import {color} from 'react-native-reanimated';
import Colors from '../javascript/colors';
const React = require('react-native');

const {StyleSheet} = React;

export default {
  topLevelView: {
    flex: 1,
    margin: 1,
    backgroundColor: '#FFFFFA',
  },
  titleBarView: {
    backgroundColor: Colors.logoBackground,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  bodyView: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  headerView: {},
  footerView: {
    backgroundColor: '#50B9AA',
  },

  // sup: card
  cardViewTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 17,
    marginTop: 8,
    marginBottom: 8,

    backgroundColor: Colors.cardBackground,

    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,

    elevation: 3,
    shadowColor: '#000000',
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },

  cardHeaderText: {},
  cardTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 3,
  },
  cardDescrText: {
    fontSize: 15,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 3,
  },
  cardBodyText: {},
  cardFooterText: {},

  phoneNumberText: {
    fontSize: 15,
    letterSpacing: 1,
    textAlign: 'center',
  },
  phoneNumberView: {
    backgroundColor: '#E65C00',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  phoneButton: {
    backgroundColor: '#E65C00',
    borderColor: '#F07403',
    borderWidth: 1,
    borderRadius: 15,
  },

  // sup: edit modal
  editModalFull: {
    margin: 0,
  },
  editModalList: {
    backgroundColor: '#e6e6e6',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },

  logoTextSmall: {
    fontSize: 30,
    fontWeight: '800',
    marginTop: 2,
    marginBottom: 5,
    textAlign: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
  },

  loginFormTextInput: {
    height: 50,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  textInputPhone: {
    height: 50,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  pickerCountryCode: {
    inputIOS: {
      height: 50,
      fontSize: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#eaeaea',
      backgroundColor: '#fafafa',
      paddingLeft: 10,
      marginTop: 5,
      marginBottom: 5,
      color: 'black',
    },
    inputAndroid: {
      height: 50,
      fontSize: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#eaeaea',
      backgroundColor: '#fafafa',
      paddingLeft: 10,
      marginTop: 5,
      marginBottom: 5,
      color: 'black',
    },
  },

  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 10,
    height: 45,
    marginTop: 5,
    marginBottom: 5,
  },
  cencelButton: {
    backgroundColor: 'grey',
    borderRadius: 10,
    height: 45,
    marginTop: 5,
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#3897f1',
    borderRadius: 10,
    height: 45,
    marginTop: 5,
    marginBottom: 5,
  },
};
