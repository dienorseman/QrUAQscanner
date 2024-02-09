import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      border: 1,
      borderColor: 'red',
      width: '100%',
      height: '100%',
    },
    listItem: {
      fontSize: windowWidth * 0.04, // 4% del ancho de la ventana
      color: '#841584',
      textAlign: 'left',
      marginBottom: windowHeight * 0.01, // 1% de la altura de la ventana
      backgroundColor: '#f8f8f8',
      padding: windowHeight * 0.01, // 1% de la altura de la ventana
      borderRadius: 5,
    },
  });
  

interface ColumnADataListProps {
  columnAData: string[];
}

const ColumnADataList: React.FC<ColumnADataListProps> = ({ columnAData }) => {
    const renderItem = ({ item }: { item: string }) => (
      <Text style={styles.listItem}>
        {item}
      </Text>
    );
  
    return (
      <FlatList
        data={columnAData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };
  

export default ColumnADataList;

