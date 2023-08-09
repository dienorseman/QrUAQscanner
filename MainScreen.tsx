import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';


import { StatusBar } from 'expo-status-bar';
import { getNetworkStateAsync } from 'expo-network';

import { useAppDispatch } from './store/store';
import { CodeScanner, NetworkStatus } from './components';
import { switchOnline } from './store/qr/qrSlice';

export const MainScreen = () => {

    const dispatch = useAppDispatch();

    const checkNetworkStatus = async () => {
        let { isConnected } = await getNetworkStateAsync();
        if (typeof isConnected === 'boolean') {
            dispatch(switchOnline( isConnected ));
        }
    };

    useEffect(() => {
        // Ejecutar una vez al montar el componente
        checkNetworkStatus();

        // Configurar intervalo para comprobar el estado de la red cada 1000 ms
        const interval = setInterval(checkNetworkStatus, 1000);

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <View style={styles.container}>
                <NetworkStatus />
                <CodeScanner />
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