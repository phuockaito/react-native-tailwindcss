import { DetailStackGroup, HistoryScreen } from "@/screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HistoryStack = createNativeStackNavigator();

export const HistoryStackGroup = () => {
    return (
        <HistoryStack.Navigator initialRouteName="HistoryScreen">
            <HistoryStack.Screen
                options={{
                    headerShown: false,
                }}
                name="HistoryScreen"
                component={HistoryScreen}
            />
            <HistoryStack.Screen
                options={{
                    headerShown: false,
                    // presentation: "modal",
                }}
                name="DetailStackGroup"
                component={DetailStackGroup}
            />
        </HistoryStack.Navigator>
    );
};
