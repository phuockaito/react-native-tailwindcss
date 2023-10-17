import React from 'react';
import { Provider } from "react-redux";

import { MainText, store } from './src';

const App = () => {
    return (
        <Provider store={store}>
            <MainText />
        </Provider>
    );
};
export default App;
