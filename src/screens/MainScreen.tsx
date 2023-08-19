import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//components
import { CodeScanner, NetworkStatus, SpreadsheetSelector } from '../components';
// redux 
import { useAppSelector } from '../store/store';


// hooks
import { useCheckNetwork } from '../hooks/useCheckNetwork';
import { useUploadStudents } from '../hooks/useUploadStudents';
import { useLoadSheetNames } from '../hooks/useLoadSheetNames';

export const MainScreen = () => {

    const {
        expedientesPormandar,
        currentSpreadsheetPage,
    } = useAppSelector(state => state.qr);

    useCheckNetwork();

    useUploadStudents();

    useLoadSheetNames();


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