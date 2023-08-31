import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

import { selectSpreadsheetPage } from '../store/qr/qrSlice';
import { useAppDispatch, useAppSelector } from '../store/store';


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
        <View style={[styles.item, { backgroundColor: style.backgroundColor }]}>
            <Text style={[styles.title, { color: style.textColor }]}>{item}</Text>
            <TouchableOpacity style={[styles.button]} onPress={onPress}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/next.png')}
                />
            </TouchableOpacity>
        </View>

    )
}


export const SpreadsheetSelector = () => {

    const [selectedId, setSelectedId] = useState<string>();

    const { spreadsheetPages } = useAppSelector(state => state.qr);

    const dispatch = useAppDispatch();

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
            <FlatList
                data={spreadsheetPages}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                extraData={selectedId}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: '100%',
    },

    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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