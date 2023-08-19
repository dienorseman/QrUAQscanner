import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import NetInfo from '@react-native-community/netinfo';

//components
import { CodeScanner, NetworkStatus, SpreadsheetSelector } from './components';
// redux 
import { useAppDispatch, useAppSelector } from './store/store';
import { removependingExpediente, switchOnline } from './store/qr/qrSlice';

// helpers
import { addStudentId, getSheetNames } from './helpers';

export const MainScreen = () => {

    const dispatch = useAppDispatch();

    const { unsentPayload, expedientesPormandar, online, currentSpreadsheetPage, spreadsheetPages } = useAppSelector(state => state.qr);

    useEffect(() => {
        const hanldeNetworkChange = NetInfo.addEventListener(state => (state.isConnected !== null) ? dispatch(switchOnline(state.isConnected)) : undefined)
        return () => hanldeNetworkChange();
    }, []);

    useEffect(() => {
        if (online && unsentPayload) {
            for (const expediente of expedientesPormandar) {
                addStudentId(expediente, dispatch, currentSpreadsheetPage);
                dispatch(removependingExpediente(expediente));
            }
        }
    }, [online, unsentPayload, expedientesPormandar,]);

    useEffect(() => {
        const fetchSheetNames = async () => {
            await getSheetNames(dispatch);
        }
        fetchSheetNames();
    }, []);


    return (
        <>
            <View style={styles.container}>
                <NetworkStatus />
                {
                    (currentSpreadsheetPage !== '')
                        ? <>
                            <Text>Evento: {currentSpreadsheetPage}</Text>
                            <CodeScanner />
                        </>
                        : <SpreadsheetSelector />
                }
                <View style={styles.floatingStudentIdCounterContainer} >
                    <Text
                        style={styles.floatingStudentIdCounter}
                    >{expedientesPormandar.length} </Text>
                </View>


                <StatusBar style="auto" />
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingStudentIdCounterContainer: {
        position: 'absolute',
        top: 0,
        right: 8,
        backgroundColor: 'red',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingStudentIdCounter: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    }
});