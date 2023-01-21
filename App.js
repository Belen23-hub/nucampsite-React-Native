import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react';
import { store } from './redux/store';

export default function App() {
    return (
      <Provider store={store}>
        <NavigationContainer>
            <Main />
        </NavigationContainer>
      </Provider>
    );
}