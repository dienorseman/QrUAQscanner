
import { useEffect, useState } from "react"
import { Button, View, Text, Vibration, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Image } from 'react-native';

import MaskedView from "@react-native-masked-view/masked-view";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useToast } from 'react-native-toast-notifications';

import { addStudentId } from "../helpers/addStudentId";
import { clearTemporalStudentIds, selectSpreadsheetPage } from "../store/qr/qrSlice";
import { useAppDispatch, useAppSelector } from "../store/store";




export const CodeScanner = () => {

    const { currentSpreadsheetPage, temporalStundetIds, online } = useAppSelector(state => state.qr);
    const dispatch = useAppDispatch();

    const toast = useToast();

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    const textDefault = 'Escanea para registrar';

    const [text, setText] = useState(textDefault);

    const askForCamPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    }

    interface scanTypes {
        data: string,
        type: string,
    }

    const handleScan = ({ data, type }: scanTypes) => {
        setScanned(true);
        setText(data);
        console.log(`Tipe: ${type}, Data: ${data}`);
        if (temporalStundetIds.includes(data)) {
            toast.show('Ya se ha agregado este estudiante', { type: 'warning', placement: 'bottom', style: { marginBottom: 40 }, duration: 2999 });
            setTimeout(() => {
                setText(
                    textDefault
                );
                setScanned(false);
            }, 3000);

            return;
        }

        addStudentId(data, dispatch, currentSpreadsheetPage);
        toast.show('Se ha agregado un estudiante', { type: 'success', placement: 'bottom', style: { marginBottom: 40 }, duration: 2999 });
        Vibration.vibrate(600, false);
        setTimeout(() => {
            setText(
                textDefault
            );
            setScanned(false);
        }, 3000);
    }

    useEffect(() => {
        askForCamPermission()
    }, [])

    if (hasPermission === null) {
        return (
            <Text>Pidiendo acceso a la camara ...</Text>
        )
    }

    if (hasPermission == false) {
        return (
            <>
                <Text>No hay permiso para la camara</Text>
                <Button title={'Dar Permiso'} onPress={askForCamPermission} />
            </>
        )
    }

    return (
        <>
            <StatusBar
                barStyle={'light-content'}

            />
            <BarCodeScanner
                style={{
                    position: 'absolute',
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    zIndex: -2,
                }}
                onBarCodeScanned={scanned ? undefined : handleScan}
            />
            <SafeAreaView />
            <View
                style={styles.floatingMenuContainer}
            >
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={
                        () => {
                            dispatch(selectSpreadsheetPage(''));
                            dispatch(clearTemporalStudentIds());
                        }
                    }
                >
                    <Image style={styles.backIcon} source={require('../../assets/back-white.png')} />
                </TouchableOpacity>

                <View style={styles.eventInfoContainer}>
                    <Text style={{ color: 'white' }}>Evento</Text>
                    <Text style={{ color: 'white' }}>{currentSpreadsheetPage}</Text>
                </View>

                <View style={styles.onlineStatusContainer}>
                    <Image
                        style={styles.onlineStatusIcon}
                        source={online ? require('../../assets/wifi-white.png') : require('../../assets/offline.png')}
                    />
                </View>


            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: -1,
                }}
            >
                <MaskedView
                    style={{ flex: 1, flexDirection: 'row', height: '100%', width: '100%' }}
                    maskElement={
                        <View
                            style={{
    
                                backgroundColor: 'transparent',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}

                        >
                            <Text style={{ fontSize: 60, color: 'white', fontWeight: 'bold' }}>
                                {text}
                            </Text>
                        </View>
                    }
                >
                    <View style={{ flex: 1, height: '100%', backgroundColor: 'transparent' }} />
                    
                </MaskedView>
            </View>


        </>
    )
}


const styles = StyleSheet.create({
    floatingMenuContainer: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        marginTop: 20,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },



    backBtn: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    backIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    eventInfoContainer: {
        width: '50%',
        height: 60,
        borderColor: 'blue',
        borderWidth: 1,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    onlineStatusContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    onlineStatusIcon: {
        width: 30,
        height: 30,
        marginBottom: 4,
        resizeMode: 'contain'
    }
})