import React from 'react';
import { Provider } from "react-redux";

import { store } from '@/store';
import { MainText } from "@/components"
import "react-native-devsettings";


const App = () => {
    return (
        <Provider store={store}>
            <MainText />
        </Provider>
    );
};
export default App;
