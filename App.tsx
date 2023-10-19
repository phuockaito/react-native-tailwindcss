import * as React from 'react';
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from '@/store';
import { DetailScreen, HistoryScreen, HomeScreen, UploadScreen } from "@/screen";
import Octicons from "react-native-vector-icons/Octicons";

import "react-native-devsettings";

const HomeStack = createNativeStackNavigator();
const TabBottom = createBottomTabNavigator();

function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <TabBottomGroup />
            </NavigationContainer>
        </Provider>
    );
};

const HomeStackGroup = () => {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen
                options={{
                    headerShown: false,
                }}
                name="Home"
                component={HomeScreen}
            />
            <HomeStack.Screen
                name="Detail"
                component={DetailScreen}
            // options={{ presentation: "modal" }}
            />
        </HomeStack.Navigator>
    )
}

const TabBottomGroup = () => {
    return (
        <TabBottom.Navigator
            initialRouteName="HomeStackGroup"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Octicons
                            name={route.name === "HomeStackGroup" ? "home" : route.name.toLowerCase()}
                            color={color}
                            size={size}
                        />
                    )
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: "#21212a",
                    borderTopColor: "#21212a"
                }
            })}
        >
            <TabBottom.Screen
                name="HomeStackGroup"
                component={HomeStackGroup}
                options={{
                    headerShown: false,
                    tabBarLabel: "Home"
                }}
            />
            <TabBottom.Screen name="Upload" component={UploadScreen} />
            <TabBottom.Screen name="History" component={HistoryScreen} />
        </TabBottom.Navigator>
    )
};


export default App;