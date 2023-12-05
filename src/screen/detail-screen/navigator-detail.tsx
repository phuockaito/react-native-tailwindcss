import { ItemMusicType } from "@/type";
import { RouteProp, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { DetailScreen } from ".";
import { CommentScreen } from "./comment-screen";

const DetailStack = createNativeStackNavigator();
type IncidentRouteParams = {
    item: ItemMusicType;
};

export const DetailStackGroup = () => {
    const {
        params: { item },
    } = useRoute<RouteProp<Record<string, IncidentRouteParams>, string>>();

    return (
        <DetailStack.Navigator initialRouteName="Detail">
            <DetailStack.Screen
                name="Detail"
                options={{
                    headerShown: true,
                    headerTintColor: "white",
                    title: item.name_music,
                    headerBackVisible: true,
                    headerStyle: {
                        backgroundColor: "#21212a",
                    },
                }}
                initialParams={{ item }}
                component={DetailScreen}
            />
            <DetailStack.Screen
                name="CommentScreen"
                initialParams={{ _id: item._id }}
                component={CommentScreen}
                options={{
                    headerBackTitleVisible: false,
                    headerShown: true,
                    headerTintColor: "white",
                    title: item.name_music,
                    headerBackVisible: true,
                    headerStyle: {
                        backgroundColor: "#21212a",
                    },
                }}
            />
        </DetailStack.Navigator>
    );
};
