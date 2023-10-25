import * as React from 'react';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from "react-redux";
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ProviderAntDesign } from '@ant-design/react-native';

import { store } from '@/store';

import "react-native-devsettings";
import { TabBottomGroup } from '@/navigator';
import { ContainerModal } from '@/modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAccount } from '@/hooks';

function App() {

    return (
        <Provider store={store}>
            <MainComponent />
        </Provider>
    );
};

const MainComponent = () => {
    const { handleGetProfile } = useAccount();
    React.useEffect(() => {
        if (Platform.OS === "android")
            SplashScreen.hide();
    }, []);

    React.useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                handleGetProfile();
            }
        })()
    }, [handleGetProfile]);
    return (
        <ProviderAntDesign>
            <NavigationContainer>
                <TabBottomGroup />
            </NavigationContainer>
            <ContainerModal />
        </ProviderAntDesign>
    )
}

export default App;
