import * as React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

import { useMusic } from "@/hooks";
import { CardItem } from "./card-item";

export const MainText = () => {
    const { fetchGetTopViewsMusic, resultStoreMusic } = useMusic();

    React.useEffect(() => {
        fetchGetTopViewsMusic();
    }, [fetchGetTopViewsMusic]);

    if (resultStoreMusic.loading) {
        return (
            <SafeAreaView>
                <View className="items-center justify-center">
                    <Text>Loading....</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#21212a", padding: 20 }}>
            <View className="">
                <FlatList
                    horizontal={false}
                    numColumns={2}
                    columnWrapperStyle={{
                        marginTop: 20,
                        justifyContent: "center",
                        gap: 15,
                    }}
                    data={resultStoreMusic.data}
                    renderItem={({ item }) => <CardItem item={item} />}
                    keyExtractor={(item) => item._id}
                />
            </View>
        </SafeAreaView>
    );
};
