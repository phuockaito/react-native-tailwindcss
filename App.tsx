// import * as React from 'react';
// import SplashScreen from 'react-native-splash-screen'
// import { Provider } from "react-redux";
// import { Platform } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { store } from '@/store';
// import { DetailScreen, HistoryScreen, HomeScreen, UploadScreen } from "@/screen";
// import Octicons from "react-native-vector-icons/Octicons";

// import "react-native-devsettings";

// const HomeStack = createNativeStackNavigator();
// const TabBottom = createBottomTabNavigator();

// function App() {

//     React.useEffect(() => {
//         if (Platform.OS === "android")
//             SplashScreen.hide();
//     }, []);

//     return (
//         <Provider store={store}>
//             <NavigationContainer>
//                 <TabBottomGroup />
//             </NavigationContainer>
//         </Provider>
//     );
// };

// const HomeStackGroup = () => {
//     return (
//         <HomeStack.Navigator initialRouteName="Home">
//             <HomeStack.Screen
//                 options={{
//                     headerShown: false,
//                 }}
//                 name="Home"
//                 component={HomeScreen}
//             />
//             <HomeStack.Screen
//                 name="Detail"
//                 component={DetailScreen}
//             // options={{ presentation: "modal" }}
//             />
//         </HomeStack.Navigator>
//     )
// }

// const TabBottomGroup = () => {
//     return (
//         <TabBottom.Navigator
//             initialRouteName="HomeStackGroup"
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ color, size }) => {
//                     return (
//                         <Octicons
//                             name={route.name === "HomeStackGroup" ? "home" : route.name.toLowerCase()}
//                             color={color}
//                             size={size}
//                         />
//                     )
//                 },
//                 tabBarActiveTintColor: "#fff",
//                 tabBarInactiveTintColor: "gray",
//                 tabBarStyle: {
//                     backgroundColor: "#21212a",
//                     borderTopColor: "#21212a"
//                 }
//             })}
//         >
//             <TabBottom.Screen
//                 name="HomeStackGroup"
//                 component={HomeStackGroup}
//                 options={{
//                     headerShown: false,
//                     tabBarLabel: "Home"
//                 }}
//             />
//             <TabBottom.Screen name="Upload" component={UploadScreen} />
//             <TabBottom.Screen name="History" component={HistoryScreen} />
//         </TabBottom.Navigator>
//     )
// };


// export default App;

import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Button,
    ActivityIndicator,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { setupPlayer, addTracks } from './trackPlayerServices';

function App() {

    const [isPlayerReady, setIsPlayerReady] = useState(false);

    useEffect(() => {
        async function setup() {
            const isSetup = await setupPlayer();

            const queue = await TrackPlayer.getQueue();
            if (isSetup && queue.length <= 0) {
                await addTracks();
            }

            setIsPlayerReady(isSetup);
        }

        setup();
    }, []);

    if (!isPlayerReady) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#bbb" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button title="Play" color="#777" onPress={() => TrackPlayer.play()} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#112'
    },
});

export default App;