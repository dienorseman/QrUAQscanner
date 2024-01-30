import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface AddGoogleSheetProps {
  onAdd: () => void;
}

export const AddGoogleSheets: React.FC<AddGoogleSheetProps> = ({ onAdd }) => {
    const [sheetsUrl, setSheetsUrl] = useState('');
  
    const handleInputChange = (text: string) => {
      setSheetsUrl(text);
    };
  
    const handleAddButtonClick = () => {
      console.log(`Añadiendo Google Sheets con URL: ${sheetsUrl}`);
      onAdd();
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

