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

function App() {

    React.useEffect(() => {
        if (Platform.OS === "android")
            SplashScreen.hide();
    }, []);

    return (
        <Provider store={store}>
            <ProviderAntDesign>
                <NavigationContainer>
                    <TabBottomGroup />
                </NavigationContainer>
                <ContainerModal />
            </ProviderAntDesign>
        </Provider>
    );
};

export default App;
