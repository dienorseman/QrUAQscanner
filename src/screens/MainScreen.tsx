import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Components
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
        /*
        * Container. SafeAreaView is the main view to contain the others.
        * Container. SafeAreaView es la vista padre, aquella que se encarga de contener las demás vistas.
        */
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
    //Main Container - Contenedor Principal
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#ffff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        border: 1,
        //borderWidth: 5,
        borderColor: 'red',
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