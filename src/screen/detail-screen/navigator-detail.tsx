import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Pressable } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { ItemMusicType } from "@/type";
import { DetailScreen } from ".";
import { CommentScreen } from "./comment-screen";

const DetailStack = createNativeStackNavigator();
type IncidentRouteParams = {
    item: ItemMusicType;
};

export const DetailStackGroup = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const {
        params: { item },
    } = useRoute<RouteProp<Record<string, IncidentRouteParams>, string>>();

    return (
        <DetailStack.Navigator initialRouteName="Detail">
            <DetailStack.Screen
                name="Detail"
                options={{
                    headerLeft: () => <Pressable
                        onPress={() => {
                            navigation.navigate("Home");
                        }}
                    >
                        <Feather name="chevron-left" size={28} color="#ffff" />
                    </Pressable>,
                    headerShown: true,
                    headerBackVisible: true,
                    headerTintColor: "white",
                    title: item.name_music,
                    headerTransparent: true,
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
                    headerLargeTitleShadowVisible: false,
                    headerShown: true,
                    headerTintColor: "white",
                    title: "Bình luận",
                    headerBackVisible: true,
                    headerStyle: {
                        backgroundColor: "#21212a",
                    },
                }}
            />
        </DetailStack.Navigator>
    );
};
