import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { CodeScanner } from './CodeScanner';
import { useAppDispatch, useAppSelector } from '../store/store';
import { clearTemporalStudentIds, selectSpreadsheetPage } from '../store/qr/qrSlice';


export const MaskComponent = () => {

    const { currentSpreadsheetPage, online } = useAppSelector(state => state.qr);

    const dispatch = useAppDispatch();

    return (
        <>
            <CodeScanner />
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
    },
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
        borderColor: 'blue',
        borderWidth: 1,
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
    }


});