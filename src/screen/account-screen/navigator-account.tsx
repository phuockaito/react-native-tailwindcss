import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AccountScreen, RegisterScreen } from "@/screen";

const AccountStack = createNativeStackNavigator();

export const AccountStackGroup = () => {
    return (
        <AccountStack.Navigator initialRouteName="Person">
            <AccountStack.Screen
                options={{
                    headerShown: false,
                }}
                name="Person"
                component={AccountScreen}
            />
            <AccountStack.Screen name="Register" component={RegisterScreen} />
        </AccountStack.Navigator>
    );
};
