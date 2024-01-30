import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux'; // Importa el hook useDispatch
import { setSheetsId } from '../store/qr/qrSlice'; // Importa la acción setSheetsId
import { getSheetNames } from '../helpers'; // Importa la función getSheetNames

interface AddGoogleSheetProps {
  onAdd: (id: string) => void;
}

export const AddGoogleSheets: React.FC<AddGoogleSheetProps> = ({ onAdd }) => {
  const [sheetsUrl, setSheetsUrl] = useState('');
  const dispatch = useDispatch(); // Obtiene la función dispatch de Redux

  const handleInputChange = (text: string) => {
    setSheetsUrl(text);
  };

  const handleAddButtonClick = () => {
    const match = sheetsUrl.match(/\/d\/(.+?)\/edit/);
    if (match) {
      const id = match[1];
      console.log(`Añadiendo Google Sheets con ID: ${id}`);
      dispatch(setSheetsId(id)); // Despacha la acción setSheetsId con el ID de la hoja de cálculo
      onAdd(id);
      getSheetNames(dispatch); // Llama a getSheetNames después de despachar setSheetsId
    } else {
      Alert.alert('URL inválida', 'Por favor, introduce una URL válida de Google Sheets.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={sheetsUrl}
        onChangeText={handleInputChange}
        placeholder="Introduce la URL de Google Sheets aquí"
      />
      <Button title="Añadir Google Sheets" onPress={handleAddButtonClick} color="#841584" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

