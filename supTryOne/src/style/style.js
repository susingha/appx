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

    borderRadius: 17,
    marginTop: 8,
    marginBottom: 8,

    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
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
  phoneButton: {
    backgroundColor: '#E65C00',
    borderColor: '#F07403',
    borderWidth: 1,
    borderRadius: 15,
  },


  // sup: modal menu
  menuModalFull: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  menuModalList: {
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  menuModalHeader: {
    backgroundColor: '#cccccc',
    borderRadius: 5,
  },
  menuModalTitle: {
    fontSize: 25,
    color: '#4d4d4d',
    padding: 8,
    textAlign: 'left',
    paddingLeft: 20,
  },
  menuModalOption: {
    fontSize: 18,
    color: '#4d4d4d',
    padding: 8,
    textAlign: 'left',
    paddingLeft: 20,
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
    height: 43,
    fontSize: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 5,
    marginBottom: 5,
  },

  // sup: unused
  linearGradient: {
    borderColor: '#AC4509',
    borderWidth: 4,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
};
