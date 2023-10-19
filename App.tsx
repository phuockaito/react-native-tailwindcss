import * as React from 'react';
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from '@/store';
import { HomeScreen } from "@/screen";
import "react-native-devsettings";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;