import { DetailStackGroup, HomeScreen } from "@/screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeStack = createNativeStackNavigator();

export const HomeStackGroup = () => {
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
                options={{
                    headerShown: false,
                }}
                name="DetailStackGroup"
                component={DetailStackGroup}
            // options={{ presentation: "modal" }}
            />
        </HomeStack.Navigator>
    );
};
