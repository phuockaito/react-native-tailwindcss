import Slider from "@react-native-community/slider";
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { Image, Pressable, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Feather from "react-native-vector-icons/Feather";

import { CustomText } from "@/components";
import { formatDuration, formatView } from "@/constants";
import { ItemMusicType } from "@/type";
import SoundPlayer from "react-native-sound-player";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type IncidentRouteParams = {
    item: ItemMusicType;
};

export const DetailScreen = () => {
    const {
        params: { item },
    } = useRoute<RouteProp<Record<string, IncidentRouteParams>, string>>();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
    const [currentTime, setCurrentTime] = React.useState<number>(0);

    React.useLayoutEffect(() => {
        (async () => {
            SoundPlayer.onFinishedLoading((success: boolean) => success);
            SoundPlayer.onFinishedPlaying((success: boolean) => success);
            SoundPlayer.playUrl(item.src_music);
        })();
    }, []);

    React.useEffect(() => {
        const timer = setInterval(async () => {
            const info = await SoundPlayer.getInfo();
            setCurrentTime(info.currentTime);
        }, 500);

        return () => clearInterval(timer);
    }, [isPlaying]);
    React.useEffect(() => {
        if (isPlaying) {
            SoundPlayer.play();
        } else {
            SoundPlayer.pause();
        }
    }, [isPlaying]);
    return (
        <View className="w-full h-full" style={{ backgroundColor: "#21212a" }}>
            <Image
                source={{
                    uri: item.image_music,
                }}
                className="absolute w-full h-full opacity-20"
            />
            <View className="items-center justify-center flex-1 w-full">
                <View className="relative flex flex-row items-center justify-between w-full">
                    <View className="items-center justify-center flex-1">
                        <Image
                            width={wp(60)}
                            height={wp(60)}
                            resizeMode="cover"
                            className="border-[4px] border-yellow-300 rounded-full"
                            source={{
                                uri: item.image_music,
                            }}
                        />
                    </View>
                    <View className="flex h-full gap-10 right-4">
                        <Pressable>
                            <View className="items-center justify-center">
                                <SimpleLineIcons name="heart" size={25} color="#a5a6c4" />
                                <Text className="mt-1 text-white">{formatView(item.favorite)}</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                navigation.navigate("CommentScreen");
                            }}
                        >
                            <SimpleLineIcons name="bubble" size={25} color="#a5a6c4" />
                        </Pressable>
                        <Pressable>
                            <Feather name="list" size={25} color="#a5a6c4" />
                        </Pressable>
                    </View>
                </View>
            </View>
            <View className="justify-end w-full gap-2 px-4 py-5">
                <View className="flex-row items-center justify-between">
                    <CustomText className="text-slate-200">{formatDuration(currentTime)}</CustomText>
                    <Slider
                        style={{ width: "80%", height: 2 }}
                        maximumValue={item.seconds}
                        value={currentTime}
                        minimumTrackTintColor="#00ffe7"
                        maximumTrackTintColor="#ffff"
                        thumbTintColor="#00ffe7"
                        onValueChange={(value) => {
                            SoundPlayer.seek(value);
                        }}
                    />
                    <CustomText className="text-slate-200">{item.time_format}</CustomText>
                </View>
                <View className="flex-row justify-between">
                    <Pressable>
                        <SimpleLineIcons name="control-rewind" size={25} color="#a5a6c4" />
                    </Pressable>
                    <Pressable onPress={() => setIsPlaying((isPlaying) => !isPlaying)}>
                        <SimpleLineIcons name={isPlaying ? "control-pause" : "control-play"} size={25} color="#a5a6c4" />
                    </Pressable>
                    <Pressable>
                        <SimpleLineIcons name="control-forward" size={25} color="#a5a6c4" />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};
