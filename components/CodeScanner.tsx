import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react"
import { Button, View, Pressable } from 'react-native';
import { Text } from "react-native"
import { addStudentId } from "../helpers/addStudentId";

export const CodeScanner = () => {

    const [ hasPermission, setHasPermission ] = useState< boolean | null >( null );
    const [ scanned, setScanned ] = useState( false );
    const [ text, setText ] = useState( 'Sin Escanear.' );

    const askForCamPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    }

    interface scanTypes {
        data: string,
        type: string,
    }

    const handleScan = ( { data, type }: scanTypes ) => {
        setScanned( true );
        setText( data );
        console.log( `Tipe: ${ type }, Data: ${ data }` );
    }

    useEffect(() => {
        askForCamPermission()
    }, [])

    if ( hasPermission === null  ) {
        return (
            <Text>Pidiendo acceso a la camara ...</Text>
        )
    }

    if ( hasPermission == false ) {
        return (
            <>
                <Text>No hay permiso para la camara</Text>
                <Button title={'Dar Permiso'}  onPress={askForCamPermission}/>
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
                onBarCodeScanned={ scanned ? undefined : handleScan}
            />
            <Text
                style={{marginTop:12}}
            >
                { text }
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
                <Pressable  
                    onPress={() => {
                        setScanned( false );
                        setText( 'Sin escanear ...');
                    }}
                    style={{borderColor: 'red', height: 50}}
                >
                    <Text style={{color: '#e97451'}}>Volver a escanear</Text>
                </Pressable>
                <Pressable 
                    onPress={() => {
                        addStudentId();
                        setScanned( false )
                        setText('sin escanear ...');
                    }} 
                    style={{borderColor: 'red', height: 50}}
                >
                    <Text style={{color: '#001eff'}}>Validar Entrada</Text>
                </Pressable>
            </View>

        </>
    )
}
