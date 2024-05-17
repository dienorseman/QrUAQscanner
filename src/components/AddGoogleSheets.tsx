import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Image } from 'react-native';
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
    <Image style={styles.fif} source={require('../img/fif.png')} />
      <Text style={styles.title}>UAQ</Text>
      <Text style={styles.subtitle}>Escaner de Eventos</Text>
      <TextInput
        style={styles.input}
        value={sheetsUrl}
        onChangeText={handleInputChange}
        placeholder="URL de Google Sheets"
      />
      <View style={styles.access}>
      <Button title="Acceder" onPress={handleAddButtonClick} color="#841584" />
      </View>
      <Text></Text>
      <View style={styles.button}>
      <Button title="Omitir URL" onPress={omitirButton} color='#001C99' />
      </View>
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
    borderRadius: 8,
  },
  fif:{
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  access:{
    width: '70%',
    alignSelf: 'center',
    overflow: 'hidden', 
    borderRadius: 10,
  },
  button:{
    width: '40%',
    borderRadius: 10,
    alignSelf: 'center',
    overflow: 'hidden', 
  }
});

