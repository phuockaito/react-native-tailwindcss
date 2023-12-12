import { CardItem } from "@/components";
import { useMusic } from "@/hooks";
import { ItemPlayHistory } from "@/type";
import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const HistoryScreen = () => {
    const { handlePlayHistoryMusic } = useMusic();
    const [data, setData] = React.useState<ItemPlayHistory[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await handlePlayHistoryMusic();
                const payload = await unwrapResult(response);
                setData(payload.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        })()
    }, [handlePlayHistoryMusic]);

    if (loading) {
        return (
            <SafeAreaView style={{ backgroundColor: "#21212a", padding: 20 }}>
                <View className="items-center justify-center h-full">
                    <ActivityIndicator size="large" color="#ffff" className="mr-2" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#21212a" }}>
            <View className="items-center h-full">
                <FlatList
                    horizontal={false}
                    numColumns={2}
                    columnWrapperStyle={{
                        marginTop: 20,
                        justifyContent: "flex-start",
                        gap: 10,
                    }}
                    data={data}
                    renderItem={({ item }) => <CardItem item={item.music} />}
                    keyExtractor={(item) => item._id}
                />
            </View>
        </SafeAreaView>
    );
};
