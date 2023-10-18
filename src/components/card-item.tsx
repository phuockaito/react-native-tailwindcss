import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { formatView } from "@/constants";
import { ItemMusicType } from "@/type";

export const CardItem = ({ item }: { item: ItemMusicType }) => {
    return (
        <View className="gap-1">
            <Image
                width={wp(45)}
                height={hp(20)}
                className="rounded-lg"
                source={{
                    uri: item.image_music,
                }}
            />
            <Text className="text-sm text-white">
                {item.name_music.length > 25 ? `${item.name_music.slice(0, 25)}...` : item.name_music}
            </Text>
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
    );
};
