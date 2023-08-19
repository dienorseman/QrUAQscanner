
import { Provider } from 'react-redux';
import { store } from './store/store';

import { SafeAreaView } from 'react-native';

import { ToastProvider } from 'react-native-toast-notifications';

import { MainScreen } from './MainScreen';



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
