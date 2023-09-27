
import { useEffect, useState } from "react"
import { Button, View, Text, Vibration, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';

import { BarCodeScanner } from "expo-barcode-scanner";
import { useToast } from 'react-native-toast-notifications';
import Svg, { G, Path, Rect, Defs, Circle, Mask } from "react-native-svg";

import { addStudentId } from "../helpers/addStudentId";
import { clearTemporalStudentIds, selectSpreadsheetPage } from "../store/qr/qrSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;


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
        console.log(`Tipe: ${type}, Data: ${data}`);
        const validID = /^[1-9]+[0-9]{0,6}$/;
        if (!validID.test(data)||data.length>7){
            console.log('no valido');
            setScanned(false)
            return
        }
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
        askForCamPermission();
    }, [])

    useEffect(() => {
        console.log(HEIGHT, WIDTH);
    }, [HEIGHT, WIDTH])

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
            <SafeAreaView
                style={{flex: 1}}
            />
            <BarCodeScanner
                style={styles.container}
                onBarCodeScanned={scanned ? undefined : handleScan}
            />
            <Svg width="100%" height="100%">
                <Defs>
                    <Mask id="mask" x="0" y="0" width="100%" height="100%">
                        <Rect width="100%" height="100%" fill="#fff" />
                        <Rect
                            x={`${WIDTH * .1}`}
                            y={`${HEIGHT * .3}`}
                            width={`${WIDTH * .8}`} height={`${HEIGHT * .4}`} fill="black" />
                    </Mask>
                </Defs>
                <Rect width="100%" height="100%" fill="rgba(0,0,0,0.44)" mask="url(#mask)" />
                <Rect
                    x={`${WIDTH * .1}`}
                    y={`${HEIGHT * .3}`}
                    width={`${WIDTH * .8}`} height={`${HEIGHT * .4}`} fill="transparent" stroke="white" strokeWidth="2" />
                <G>
                    <Rect
                        x={`${WIDTH * .1}`}
                        y={`${HEIGHT * .3}`}
                        width={`${WIDTH * .8}`} height={`${HEIGHT * .4}`} fill="transparent" stroke="white" strokeWidth="2" />
                </G>

            </Svg>

            <View style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: 20,

            }}>
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
                        <Text style={{ color: 'white', marginTop: 20, fontSize: 20 }}>{currentSpreadsheetPage}</Text>
                    </View>

                    <View style={styles.onlineStatusContainer}>
                        <Image
                            style={styles.onlineStatusIcon}
                            source={online ? require('../../assets/wifi-white.png') : require('../../assets/offline.png')}
                        />
                    </View>
                </View>
                <View style={styles.textScan}>
                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center'}}>{text}</Text>
                </View>
            
            </View>
        </>


    )
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        zIndex: -1,
        position: 'absolute',
    },
    floatingMenuContainer: {
        width: '100%',
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 20,
        padding: 10,
        paddingHorizontal: 24,
        top: `20%`,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backBtn: {
        width: 33,
        height: 33,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    backIcon: {
        width: 16,
        height: 16,
        resizeMode: 'contain'
    },
    eventInfoContainer: {
        width: '50%',
        height: 60,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    onlineStatusContainer: {
        width: 33,
        height: 33,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    onlineStatusIcon: {
        width: 16,
        height: 16,
        marginBottom: 4,
        resizeMode: 'contain'
    },

    textScan: {
        textAlign: 'center',
        top: `20%`,
    },
})