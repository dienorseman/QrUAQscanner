
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native';

import { ToastProvider } from 'react-native-toast-notifications';
import { store } from './src/store/store';
import { MainScreen } from './src/screens/MainScreen';





const App = () => {

  return (
    <Provider store={store}>
      <ToastProvider>
        <SafeAreaView />
        <MainScreen />
      </ToastProvider>
    </Provider>
  );
};



export default App;
