import { color } from 'react-native-reanimated';
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
    borderBottomRightRadius:15,
    borderBottomLeftRadius:15,
  },
  bodyView: {
    
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  headerView: {
  },
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
    padding: 11,

    elevation: 5, // sup: use shadow for IOS
  },

  cardHeaderText: {},
  cardTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "left",
  },
  cardDescrText: {
    fontSize: 15,
    color: 'grey',
    fontWeight: 'bold', 
    textAlign: "left",
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
    borderColor: "#AC4509",
    borderWidth: 4,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },







};
