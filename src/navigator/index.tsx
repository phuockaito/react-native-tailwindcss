import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HistoryScreen, ModalScreen, UploadScreen } from "@/screen";
import Octicons from "react-native-vector-icons/Octicons";

import { AccountStackGroup } from "@/screen/account-screen/navigator-account";
import { HomeStackGroup } from "@/screen/home-screen/navigator-home";

const TabBottom = createBottomTabNavigator();

export const TabBottomGroup = () => {
    return (
        <TabBottom.Navigator
            initialRouteName="HomeStackGroup"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    return <Octicons name={checkIcon(route.name)} color={color} size={size} />;
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: "#21212a",
                    borderTopColor: "#21212a",
                },
            })}
        >
            <TabBottom.Screen
                name="HomeStackGroup"
                component={HomeStackGroup}
                options={{
                    headerShown: false,
                    tabBarLabel: "Trang chủ",
                }}
            />
            <TabBottom.Screen
                name="Upload"
                component={UploadScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "Tải lên",
                }}
            />
            <TabBottom.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "Đã nghe",
                }}
            />
            <TabBottom.Screen
                name="browser"
                component={ModalScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "Modal",
                }}
            />
            <TabBottom.Screen
                name="AccountStackGroup"
                component={AccountStackGroup}
                options={{
                    headerShown: false,
                    tabBarLabel: "Cá Nhân",
                }}
            />
        </TabBottom.Navigator>
    );
};

const checkIcon = (name: string) => {
    switch (name) {
        case "HomeStackGroup":
            return "home";
        case "AccountStackGroup":
            return "person";
        default:
            return name.toLowerCase();
    }
};
