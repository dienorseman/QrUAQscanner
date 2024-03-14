import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface NavBarProps {
  onPress: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onPress }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <TouchableOpacity onPress={onPress}>
        <Text>Añadir Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text>Enviar Expedientes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

