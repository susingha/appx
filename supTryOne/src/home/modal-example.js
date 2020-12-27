import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import Modal from 'react-native-modal';

export default function HomeScreen() {
  const [menuOption, setMenuOption] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

  const enums = {
    noSelect: 0,
    editOption: 1,
    importOption: 2,
    exportOption: 3,
  };

  // sup: menu Modal
  const menuDismiss = () => {
    setMenuVisible(false);
  };
  const menuDismissToEdit = () => {
    setMenuOption(Enums.editOption);
    menuDismiss();
  };
  const menuDismissToImport = () => {
    setMenuOption(Enums.importOption);
    menuDismiss();
  };
  const menuDismissToExport = () => {
    setMenuOption(Enums.exportOption);
    menuDismiss();
  };
  const menuShow = () => {
    setMenuVisible(true);
  };

  const processMenuOption = () => {
    switch (menuOption) {
      case Enums.editOption:
        console.log('sup: process option edit');
        break;
      case Enums.importOption:
        console.log('sup: process option import');
        break;
      case Enums.exportOption:
        console.log('sup: process option export');
        break;
    }
  };

  return (
    <>
      <Button
        buttonStyle={styles.loginButton}
        onPress={menuShow}
        title="Options"
      />

      {/* Options Menu Modal */}
      <Modal
        isVisible={menuVisible}
        onSwipeComplete={menuDismiss}
        onBackdropPress={menuDismiss}
        onBackButtonPress={menuDismiss}
        swipeDirection={['down']}
        onModalHide={processMenuOption}
        style={styles.menuModalFull}>
        <View style={styles.menuModalList}>
          <TouchableOpacity activeOpacity={0.2} style={styles.menuModalHeader}>
            <Text style={styles.menuModalTitle}>sup: Modal Title</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} onPress={menuDismissToEdit}>
            <Text style={styles.menuModalOption}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} onPress={menuDismissToImport}>
            <Text style={styles.menuModalOption}>Import from Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} onPress={menuDismissToExport}>
            <Text style={styles.menuModalOption}>Save to Contact</Text>
          </TouchableOpacity>

          <Divider />

          <TouchableOpacity activeOpacity={0.2} onPress={menuDismiss}>
            <Text style={styles.menuModalOption}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 10,
    height: 45,
    marginTop: 5,
    marginBottom: 5,
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
});
