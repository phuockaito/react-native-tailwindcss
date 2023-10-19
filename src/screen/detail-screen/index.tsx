import * as React from 'react'
import { RouteProp } from '@react-navigation/native';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'

import { ItemMusicType } from "@/type";
import { CardItem } from '@/components';

type IncidentRouteParams = {
    item: ItemMusicType;
}

export const DetailScreen = () => {
    const navigation = useNavigation();
    const { params: { item } } = useRoute<RouteProp<Record<string, IncidentRouteParams>, string>>();;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: item.name_music,
            headerStyle: {
                backgroundColor: "#21212a",
            },
            headerTintColor: "white",
            headerBackTitleVisible: false,
        })
    }, []);

    return (
        <View
            className="items-center justify-center w-full h-full"
            style={{ backgroundColor: "#21212a" }}
        >
            <CardItem item={item} />
        </View>
    )
}
