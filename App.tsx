
import { Provider } from 'react-redux';
import { store } from './store/store';
import { MainScreen } from './MainScreen';



const App = () => {




  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};



export default App;
