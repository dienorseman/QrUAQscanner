import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';

import { selectSpreadsheetPage } from '../store/qr/qrSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getSheetNames } from '../helpers';
import { useLoadSheetNames } from '../hooks/useLoadSheetNames';


type ItemProps = {
    item: string;
    onPress: () => void;
    style: {
        backgroundColor: string,
        textColor: string,
    }
}

const Item = ({ item, onPress, style }: ItemProps) => {

    return (
        //Contenedor de la lista de eventos.
       <View style={styles.lista}>
            <View style={[styles.item, { backgroundColor: style.backgroundColor }]}>
                <Text style={[styles.title, { color: style.textColor }]}>{item}</Text>
                <TouchableOpacity style={[styles.button]} onPress={onPress}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/next.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
        /*<View style={[styles.item, { backgroundColor: style.backgroundColor }]}>
            <Text style={[styles.title, { color: style.textColor }]}>{item}</Text>
            <TouchableOpacity style={[styles.button]} onPress={onPress}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/next.png')}
                />
            </TouchableOpacity>
        </View>*/

    )
}


export const SpreadsheetSelector = () => {

    const [selectedId, setSelectedId] = useState<string>();

    const { spreadsheetPages, loading } = useAppSelector(state => state.qr);

    const dispatch = useAppDispatch();
    
   const {fetchSheetNames} = useLoadSheetNames();

    useEffect(() => {

    }, [spreadsheetPages])



    const renderItem = ({ item }: { item: string }) => {
        const backgroundColor = item === selectedId ? "#fff" : "#fff";
        const color = item === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item);
                    dispatch(selectSpreadsheetPage(item));
                }}
                style={{ backgroundColor, textColor: color }}
            />
        );
    };

    return (
        <View style={styles.container}>

            {
                (loading) ?
                    <Text>Loading...</Text> :
                    <FlatList
                        onMomentumScrollEnd={fetchSheetNames}
                        data={spreadsheetPages}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        extraData={selectedId}
                    />
            }
        </View>
    )
}

//Contenedor principal para la lista de elementos
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        border: 1,
        //borderWidth: 5,
        borderColor: 'red',
        width: '100%',
        height: '100%',
    },

    //Style para la lista de elementos
    lista: {
        border: 1,
        //borderWidth: 5,
        borderColor: 'purple',
        alignItems: 'center',
    },

    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 0,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
    },

    button: {
        alignItems: "center",
        borderColor: '#CCCCCC',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },

    tinyLogo: {
        width: 25,
        height: 25,
        objectFit: 'cover',
    },

});