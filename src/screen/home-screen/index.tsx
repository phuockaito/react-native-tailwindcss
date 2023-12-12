import * as React from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";

import { CardItem } from "@/components";
import { useMusic } from "@/hooks";

export const HomeScreen = () => {
    const { fetchGetTopViewsMusic, resultStoreMusic } = useMusic();

    React.useEffect(() => {
        fetchGetTopViewsMusic();
    }, [fetchGetTopViewsMusic]);

    if (resultStoreMusic.loading) {
        return (
            <SafeAreaView style={{ backgroundColor: "#21212a", padding: 20 }}>
                <View className="items-center justify-center h-full">
                    <ActivityIndicator size="large" color="#ffff" className="mr-2" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#21212a", padding: 20 }}>
            <View className="h-full">
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
                    onEndReached={() => {
                        console.log("first item reached")
                    }}
                />
            </View>
        </SafeAreaView>
    );
};
