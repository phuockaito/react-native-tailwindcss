import { Pressable, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { formatView } from "@/constants";
import { ItemMusicType } from "@/type";

export const CardItem = ({ item }: { item: ItemMusicType }) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return (
        <Pressable
            onPress={() => {
                navigation.navigate("Detail", { item });
            }}
        >
            <View className="gap-1">
                <FastImage
                    style={{ width: wp(45), height: wp(45) }}
                    source={{
                        uri: item.image_music,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                    }}
                    className="rounded-xl"
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text className="text-sm text-white">{item.name_music.length > 25 ? `${item.name_music.slice(0, 25)}...` : item.name_music}</Text>
                <Text style={{ color: "#01aaed" }} className="text-xs">
                    {item.name_singer.length > 25 ? item.name_singer.slice(0, 25) : item.name_singer}
                </Text>
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-1">
                        <EvilIcons name="eye" size={20} color="#a5a6c4" />
                        <Text style={{ color: "#a5a6c4" }}>{formatView(item.view)}</Text>
                    </View>
                    <View className="ml-1 flex-row items-center gap-1">
                        <EvilIcons name="heart" size={20} color="#a5a6c4" />
                        <Text style={{ color: "#a5a6c4" }}>{formatView(item.favorite)}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};
