import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";

import { CardItem } from "@/components";
import { ItemMusicType } from "@/type";

type IncidentRouteParams = {
    item: ItemMusicType;
};

export const DetailScreen = () => {
    const navigation = useNavigation();
    const {
        params: { item },
    } = useRoute<RouteProp<Record<string, IncidentRouteParams>, string>>();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: item.name_music,
            headerStyle: {
                backgroundColor: "#21212a",
            },
            headerTintColor: "white",
            headerBackTitleVisible: false,
        });
    }, []);

    return (
        <View className="h-full w-full items-center justify-center" style={{ backgroundColor: "#21212a" }}>
            <CardItem item={item} />
        </View>
    );
};
