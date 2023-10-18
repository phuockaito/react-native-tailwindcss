import { formatView } from "@/constants";
import { useMusic } from "@/hooks";
import { ItemMusicType } from "@/type";
import * as React from "react";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";

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
        <SafeAreaView style={{ backgroundColor: "#21212a", padding: 20 }}>
            <View>
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
                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row items-center gap-2">
                                        <EvilIcons
                                            name="eye"
                                            size={20}
                                            color="#a5a6c4"
                                        />
                                        <Text style={{ color: "#a5a6c4" }}>{formatView(item.view)}</Text>
                                    </View>
                                    <View className="flex-row items-center gap-2 ml-1">
                                        <EvilIcons
                                            name="heart"
                                            size={20}
                                            color="#a5a6c4"
                                        />
                                        <Text style={{ color: "#a5a6c4" }}>{formatView(item.favorite)}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={item => item._id}
                />
            </View>
        </SafeAreaView>
    );
};
