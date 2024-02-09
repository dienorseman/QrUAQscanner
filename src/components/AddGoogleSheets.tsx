import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { useDispatch } from 'react-redux'; // Importa el hook useDispatch
import { setSheetsId, setSheetsTitle, clearSpreadsheetPages } from '../store/qr/qrSlice'; // Importa la acción setSheetsId
import { getSheetNames } from '../helpers'; // Importa la función getSheetNames
import { Dimensions } from 'react-native';

// Obtén las dimensiones de la ventana
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface AddGoogleSheetProps {
  onAdd: (id: string) => void;
}

export const AddGoogleSheets: React.FC<AddGoogleSheetProps> = ({ onAdd }) => {
  const [sheetsUrl, setSheetsUrl] = useState('');
  const dispatch = useDispatch(); // Obtiene la función dispatch de Redux

  const handleInputChange = (text: string) => {
    setSheetsUrl(text);
  };

  var id = '';

  const handleAddButtonClick = () => {
    const match = sheetsUrl.match(/\/d\/(.+?)\/edit/);
    if (match) {
        id = match[1];
        console.log(`Añadiendo Google Sheets con ID: ${id}`);
        dispatch(setSheetsId(id)); // Despacha la acción setSheetsId con el ID de la hoja de cálculo
        onAdd(id);
        getSheetNames(dispatch); // Llama a getSheetNames después de despachar setSheetsId
        //getSheetTitle(dispatch);
    } else {
      Alert.alert('URL inválida', 'Por favor, introduce una URL válida de Google Sheets.');
    }
  };

  const omitirButton = () => {
    id = '';
    dispatch(setSheetsId(id));
    onAdd(id);
    console.log("Omitir selección");
    dispatch(clearSpreadsheetPages());
  }

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>UAQ</Text>
      <Text style={styles.subtitle}>Escaner de Eventos</Text>
      <TextInput
        style={styles.input}
        value={sheetsUrl}
        onChangeText={handleInputChange}
        placeholder="Introduce la URL de Google Sheets aquí"
      />
      <Button title="Añadir Google Sheets" onPress={handleAddButtonClick} color="#841584" />
      <Text></Text>
      <Button title="Omitir" onPress={omitirButton} color="#841584" />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: windowWidth*0.04,
  },
  title: {
    fontSize: windowWidth*0.08,
    fontWeight: 'bold',
    color: '#841584',
    textAlign: 'center',
    marginBottom: windowHeight*0.02,
  },
  subtitle: {
    fontSize: windowWidth*0.08,
    fontWeight: 'bold',
    color: '#001C99',
    textAlign: 'center',
    marginBottom: windowHeight*0.02,
  },
  input: {
    height: windowHeight * 0.05,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: windowHeight * 0.02,
    paddingLeft: windowWidth * 0.02,
  },
});

