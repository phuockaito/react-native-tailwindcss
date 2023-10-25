import Slider from "@react-native-community/slider";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { Image, Pressable, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import { CustomText } from "@/components";
import { formatDuration } from "@/constants";
import { ItemMusicType } from "@/type";
import SoundPlayer from "react-native-sound-player";

type IncidentRouteParams = {
    item: ItemMusicType;
};

export const DetailScreen = () => {
    const navigation = useNavigation();
    const {
        params: { item },
    } = useRoute<RouteProp<Record<string, IncidentRouteParams>, string>>();

    const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
    const [currentTime, setCurrentTime] = React.useState<number>(0);

    React.useLayoutEffect(() => {
        (async () => {
            navigation.setOptions({
                title: item.name_music,
                headerStyle: {
                    backgroundColor: "#21212a",
                },
                headerTintColor: "white",
                headerBackTitleVisible: false,
            });
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
        <View className="flex-col justify-center w-full h-full" style={{ backgroundColor: "#21212a" }}>
            <Image
                source={{
                    uri: item.image_music,
                }}
                className="absolute w-full h-full opacity-20"
            />
            <View className="items-center justify-between">
                <Image
                    width={wp(60)}
                    height={wp(60)}
                    resizeMode="cover"
                    className="rounded-full"
                    style={{
                        borderWidth: 5,
                        borderColor: "yellow",
                    }}
                    source={{
                        uri: item.image_music,
                    }}
                />
            </View>
            <View className="absolute bottom-0 flex w-full gap-2 p-4">
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
                        <SimpleLineIcons
                            name={isPlaying ? "control-pause" : "control-play"}
                            size={25}
                            color="#a5a6c4"
                        />
                    </Pressable>
                    <Pressable>
                        <SimpleLineIcons name="control-forward" size={25} color="#a5a6c4" />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};
