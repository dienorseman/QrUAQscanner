// IMPORTS
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Interface fot the navigator options
interface NavBarProps {
  onPress: () => void;
  onPressExit: () => void;
  onPressAdd: () => void;
}

// Navigator's constructor
export const NavBar: React.FC<NavBarProps> = ({ onPress, onPressAdd, onPressExit }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Añadir Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressAdd}>
        <Text style={styles.text}>Enviar Expedientes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressExit}>
        <Text style={styles.text}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

// Navigator's Styles
const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  button: {
    backgroundColor: '#841584',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    position: 'relative',
    width: '95%',
    margin: 10,
},
});
