import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';


import { StatusBar } from 'expo-status-bar';
import { getNetworkStateAsync } from 'expo-network';

import { useAppDispatch, useAppSelector } from './store/store';
import { CodeScanner, NetworkStatus } from './components';
import { removependingExpediente, switchOnline } from './store/qr/qrSlice';
import { addStudentId } from './helpers/addStudentId';

export const MainScreen = () => {

    const dispatch = useAppDispatch();

    const { unsentPayload, expedientesPormandar, online } = useAppSelector(state => state.qr);

    const checkNetworkStatus = async () => {
        let { isConnected } = await getNetworkStateAsync();
        if (typeof isConnected === 'boolean') {
            dispatch(switchOnline(isConnected));
            if (online && unsentPayload) {
                for (const expediente of expedientesPormandar) {
                    // addStudentId(expediente);
                    console.log('exp: ', expediente);
                    dispatch(removependingExpediente(expediente));
                }
            } 
        }
    };

    useEffect(() => {
        checkNetworkStatus();
        const interval = setInterval(checkNetworkStatus, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <View style={styles.container}>
                <NetworkStatus />
                <CodeScanner />

                {/* {(unSentPayload) ? <Text>{expedientesPormandar.length} : {unSentPayload.toString()}</Text> : <Text>Sin expedientes pendientesr</Text>} */}
                
                 <Text>{expedientesPormandar.length} : {unsentPayload.toString()}</Text>

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
});