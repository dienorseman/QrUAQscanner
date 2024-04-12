// IMPORTS
// React
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from 'react-native';
// Components
import  ColumnADataList  from './ColumnADataList';
import ColumnCheckList from './ColumnCheckList';
// Hooks
import { useLoadColumnAData } from '../hooks/useLoadSheetColumnAData';
import { useUploadStudents } from '../hooks/useUploadStudents';
// Store
import { selectSpreadsheetPage, setColumnAData, addTemporalSpreadSheet } from '../store/qr/qrSlice';
import { useAppDispatch, useAppSelector, store } from '../store/store';

// Dimensions to make the app portable to different devices
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SpreadsheetSelector = () => {

    const [selectedId, setSelectedId] = useState<string>('Offline');
    const { spreadsheetPages, loading, columnAData, expedientesPormandar } = useAppSelector(state => state.qr);
    const dispatch = useAppDispatch();
    const { fetchColumnAData } = useLoadColumnAData(selectedId);
    const { uploadStudents } = useUploadStudents();

    // UseEffect to fetch the column data from the selected sheet.
    useEffect(() => {
        if (selectedId) {
            fetchColumnAData();
            // console.log(fetchColumnAData);
        }
    }, [selectedId]);

    // Loads the Spreadsheet's pages or sheets
    useEffect(() => {

    }, [spreadsheetPages])

    // UseEffect to create the temporal data to send
    useEffect(() => {
        //console.log("Alumnos Temporales: " + expedientesPormandar);
    }, [expedientesPormandar])

    return (
        // Main Container
        <View style={styles.container}> 
            {
                // Conditional to manage when app is loading
                (loading) ?
                    <Text>Loading...</Text> :
                    // View to load when complete loading
                    <View style={styles.container}>
                        {/* Picker Container */}
                        <View style={styles.pickerContainer}>
                            {/* The Picker to manage the spreadSheet's pages */}
                            <Picker
                                selectedValue={selectedId}
                                onValueChange={(itemValue) => {
                                    setSelectedId(itemValue);
                                    dispatch(addTemporalSpreadSheet(itemValue));
                                    console.log('Hoja: ' + store.getState().qr.temporalSpreadSheetPage);
                                }}
                            >
                                {/* Picker wich load when No page was selected */}
                                <Picker.Item label="Expedientes Sin Enviar" value="Offline" color='black' />
                                {spreadsheetPages.map((item, index) => (
                                    <Picker.Item key={index} label={item} value={item} color='black' />
                                ))}
                            </Picker>
                        </View>
                        { (
                            // Scanner Button
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#841584',
                                    padding: 10,
                                    borderRadius: 5,
                                    alignSelf: 'center',
                                    width: '95%'
                                }}
                                onPress={() => {
                                    dispatch(selectSpreadsheetPage(selectedId));
                                }}
                            >
                                <Text style={{color: 'white', textAlign: 'center'}}>Scannear</Text>
                            </TouchableOpacity>
                        )}
                        {/* Conditionals according to the page selected and their data */}
                        {selectedId && selectedId != "Offline" && expedientesPormandar.length>0 && <ColumnCheckList columnCheckList={expedientesPormandar}  />}
                        {selectedId && selectedId != "Offline" && <ColumnADataList columnAData={columnAData}  />}
                        {selectedId === "Offline" &&  <ColumnADataList columnAData={expedientesPormandar} />}
                    </View>
            }
        </View>
    )
}

//Contenedor principal para la lista de elementos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        borderColor: 'red',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'relative',
        width: '95%',
        margin: 10,
    },
    // Style of the picker container
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 10,
        width: '95%',
        alignSelf: 'center',
    },
    // Picker's style
    picker: {
        height: 50,
        width: '100%',
    },
    picker_text: {
        fontSize: 20,
    },

    // List's Style
    lista: {
        //border: 1,
        //borderWidth: 5,
        borderColor: 'purple',
        alignItems: 'center',
    },

    // Item's Style
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

    // Title's Style
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
        marginTop: '10%'
    },

    tinyLogo: {
        width: 25,
        height: 25,
        objectFit: 'cover',
    },

    // List of Items - Data from the selected sheet.
    listItem: {
        fontSize: windowWidth * 0.04, // 4% del ancho de la ventana
        color: '#841584',
        textAlign: 'center',
        marginBottom: windowHeight * 0.01, // 1% de la altura de la ventana
        backgroundColor: '#f8f8f8',
        padding: windowHeight * 0.01, // 1% de la altura de la ventana
        borderRadius: 5,
    },
});