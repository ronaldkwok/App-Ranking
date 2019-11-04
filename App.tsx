import React from 'react'
import MainScreen from './src/screens/MainScreen'
import mainStore from './src/stores/mainStore'
import { Provider } from 'react-redux'

const App = () => {
    return (
        <Provider store={mainStore}>
            <MainScreen />
        </Provider>
    );
};

export default App;
