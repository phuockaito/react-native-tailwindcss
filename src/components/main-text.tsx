import { useMusic } from "@/hooks";
import { ItemMusicType } from "@/type";
import * as React from "react";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";


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
        )
    };

    return (
        <SafeAreaView style={{ backgroundColor: "#21212a" }}>
            <View className="p-1">
                <FlatList
                    horizontal={false}
                    numColumns={2}
                    columnWrapperStyle={{ marginTop: 10 }}
                    data={resultStoreMusic.data}
                    renderItem={({ item }: { item: ItemMusicType }) => {
                        return (
                            <View className="gap-1 p-2">
                                <Image
                                    width={200}
                                    height={200}
                                    className="rounded-lg"
                                    source={{
                                        uri: item.image_music
                                    }}
                                />
                                <Text
                                    className="text-sm text-white">
                                    {item.name_music.length > 25 ? `${item.name_music.slice(0, 25)}...` : item.name_music}
                                </Text>
                                <Text
                                    style={{ color: "#01aaed" }}
                                    className="text-xs">
                                    {item.name_singer.length > 25 ? item.name_singer.slice(0, 25) : item.name_singer}
                                </Text>
                            </View>
                        )
                    }}
                    keyExtractor={item => item._id}

                />
            </View>
        </SafeAreaView>
    );
};
