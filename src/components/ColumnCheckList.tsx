import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      width: '95%',
      height: '25%',
    },
    listItem: {
      fontSize: windowWidth * 0.04, // 4% del ancho de la ventana
      color: '#841584',
      textAlign: 'left',
      marginBottom: windowHeight * 0.01, // 1% de la altura de la ventana
      backgroundColor: '#B9C6CE',
      padding: windowHeight * 0.01, // 1% de la altura de la ventana
      borderRadius: 5,
    },
  });
  

interface ColumnCheckListProps {
  columnCheckList: string[];
}

const ColumnCheckList: React.FC<ColumnCheckListProps> = ({ columnCheckList }) => {
    const renderItem = ({ item }: { item: string }) => (
      <Text style={styles.listItem}>
        {item}
      </Text>
    );
  
    return (
      <FlatList style={styles.container}
        data={columnCheckList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };
  

export default ColumnCheckList;