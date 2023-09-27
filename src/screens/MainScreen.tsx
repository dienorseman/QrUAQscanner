import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//components
import { CodeScanner, SpreadsheetSelector } from '../components';
// redux 
import { useAppSelector } from '../store/store';


// hooks
import { useCheckNetwork } from '../hooks/useCheckNetwork';
import { useUploadStudents } from '../hooks/useUploadStudents';

//components
import { Tittle } from '../components/Tittle';
import { MaskComponent } from '../components/MaskComponent';

export const MainScreen = () => {

    const {
        currentSpreadsheetPage,
    } = useAppSelector(state => state.qr);

    useCheckNetwork();

    useUploadStudents();



    return (
        <>

                {
                    (currentSpreadsheetPage !== '')
                        ? <>
                            <CodeScanner />
                            {/* <MaskComponent /> */}
                        </>

                        : (<>
                            <SafeAreaView />
                            <Tittle />
                            <SpreadsheetSelector />
                        </>)
                }
                <StatusBar style="auto" />

        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
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