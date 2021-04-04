/*
backgroundColor: 'cyan'
borderColor: 'green',
borderWidth: 1,
*/

export default {
  topLevelView: {
    flex: 1,
    backgroundColor: 'white'
  },
  titleBarView: {
    marginLeft: -20,
    marginRight: -20,
    marginBottom: 0,
  },
  titleBarText: {
    marginBottom: 10,
    fontSize: 25,
    textAlign: 'center',
  },
  bodyView: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  headerView: {},
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'dodgerblue', // royalblue, dodgerblue, lightskyblue, deepskyblue, cornflowerblue
  },
  iconTitleStyle: {},
  iconTitleStyle: {},

  // sup: card
  cardViewTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 8,

    backgroundColor: '#f0f0f5',

    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,

    /*
    // sup: replace with Card from react-native-paper
    elevation: 3, // android
    shadowColor: '#000000', // ios
    shadowRadius: 1, // ios
    shadowOpacity: 0.1, // ios
    */
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
    
    marginBottom: 5,
  },

  // backgroundColor: '#E65C00',
  // borderColor: '#F07403',
  phoneButton: {
    backgroundColor: 'orangered',
    borderColor: 'darkorange',
    borderWidth: 1,
    borderRadius: 15,
  },
  speedButton: {
    backgroundColor: 'orangered',
    borderColor: 'darkorange',
    borderWidth: 1,
    borderRadius: 15,
    marginLeft: 50,
  },

  // sup: edit modal
  editModalContainer: {
    margin: 0,
    justifyContent: 'flex-start',
    
    // borderColor: 'green',
    // borderWidth: 1,
  },
  editModalContent: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

    // borderColor: 'red',
    // borderWidth: 1,
  },
  editModalHeaderText: {
    fontSize: 17,
    letterSpacing: 1,
  },
  editModalLabelText: {
    margin: 5,
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  logoTextSmall: {
    margin: 5,
    fontSize: 30,
    textAlign: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
  },

  formTextInput: {
    height: 40,    
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gainsboro',
    backgroundColor: '#fafafa',
    padding: 0,
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    color: 'black',
  },
  pickerCountryCode: {
    inputIOS: {
      height: 40,    
      fontSize: 20,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'gainsboro',
      backgroundColor: '#fafafa',
      padding: 0,
      paddingLeft: 10,
      marginTop: 5,
      marginBottom: 5,
      color: 'black',
    },
    inputAndroid: {
      height: 40,    
      fontSize: 20,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'gainsboro',
      backgroundColor: '#fafafa',
      padding: 0,
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


  cancelText: {
    backgroundColor: 'grey',
    borderRadius: 10,
    height: 45,
    marginTop: 5,
    marginBottom: 5,
  },
  saveText: {
    backgroundColor: 'dodgerblue',
    borderRadius: 10,
    height: 45,
    marginTop: 5,
    marginBottom: 5,
  },
};
