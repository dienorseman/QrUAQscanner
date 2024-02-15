import React, { useState } from 'react';
import { FlatList, Text, StyleSheet, RefreshControl } from 'react-native';
import { Dimensions } from 'react-native';
import { useLoadColumnAData } from '../hooks/useLoadSheetColumnAData';
import { store } from '../store/store';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      width: '95%',
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

const itemValue = store.getState().qr.temporalSpreadSheetPage;
const { fetchColumnAData } = useLoadColumnAData(itemValue);
const fetch = fetchColumnAData()

const ColumnADataList: React.FC<ColumnADataListProps> = ({ columnAData }) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetch;
        setRefreshing(false);
    }, []);

    const renderItem = ({ item }: { item: string }) => (
      <Text style={styles.listItem}>
        {item}
      </Text>
    );
  
    return (
      <FlatList 
        style={styles.container}
        data={columnAData}
        extraData={columnAData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    );
};

export default ColumnADataList;


