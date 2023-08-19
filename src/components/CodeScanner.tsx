
import { useEffect, useState } from "react"
import { Button, View, Pressable, Text, Vibration } from 'react-native';

import { BarCodeScanner } from "expo-barcode-scanner";
import { useToast } from 'react-native-toast-notifications';

import { addStudentId } from "../helpers/addStudentId";
import { clearTemporalStudentIds, selectSpreadsheetPage } from "../store/qr/qrSlice";
import { useAppDispatch, useAppSelector } from "../store/store";


export const CodeScanner = () => {

    const { currentSpreadsheetPage, temporalStundetIds } = useAppSelector(state => state.qr);
    const dispatch = useAppDispatch();

    const toast = useToast();

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Sin Escanear.');

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
            toast.show('Ya se ha agregado este estudiante', { type: 'warning', placement: 'top', style: { marginTop: 80 }, duration: 2999});
            setTimeout(() => {
                setText('sin escanear');
                setScanned(false);
            }, 3000);
        
            return;
        }

        addStudentId(data, dispatch, currentSpreadsheetPage);
        toast.show('Se ha agregado un estudiante', { type: 'success', placement: 'top', style: { marginTop: 80 }, duration: 2999 });
        Vibration.vibrate(600, false);
        setTimeout(() => {
            setText('sin escanear');
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
            <BarCodeScanner
                style={{
                    borderColor: 'red',
                    height: 220,
                    width: 220
                }}
                onBarCodeScanned={scanned ? undefined : handleScan}
            />
            <Text
                style={{ marginTop: 12 }}
            >
                {text}
            </Text>
            <View
                style={{
                    display: 'flex',
                    width: '100%',
                    // borderColor: 'blue', 
                    // borderWidth: 1, 
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-evenly',
                    marginTop: 24
                }}
            >
                <Button title="Cambiar evento" onPress={
                    () => {
                        dispatch(selectSpreadsheetPage(''));
                        dispatch(clearTemporalStudentIds());
                    }
                } />
            </View>

        </>
    )
}
