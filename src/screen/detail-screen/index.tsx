import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { Image, Pressable, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';

import { ItemMusicType } from "@/type";
import SoundPlayer from "react-native-sound-player";
import { formatDuration } from "@/constants";

type IncidentRouteParams = {
    item: ItemMusicType;
};

export const DetailScreen = () => {

    const navigation = useNavigation();
    const {
        params: { item },
    } = useRoute<RouteProp<Record<string, IncidentRouteParams>, string>>();

    const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
    const [currentTime, setCurrentTime] = React.useState<number>(0)
    const start = async () => {
        // Set up the player
        await TrackPlayer.setupPlayer();

        // Add a track to the queue
        await TrackPlayer.add({
            id: 'trackId',
            url: item.src_music,
            title: 'Track Title',
            artist: 'Track Artist',
            artwork: item.image_music
        });

        // Start playing it
        await TrackPlayer.play();
    };

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
            // SoundPlayer.onFinishedLoading((success: boolean) => success);
            // SoundPlayer.onFinishedPlaying((success: boolean) => success);
            // SoundPlayer.playUrl(item.src_music);
        })()
    }, []);
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
                    source={{
                        uri: item.image_music,
                    }}
                />
            </View>
            <View className="absolute bottom-0 flex w-full gap-2 p-4">
                <View className="flex-row items-center justify-between">
                    <Text className="text-slate-200">{formatDuration(currentTime)}</Text>
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
                    <Text className="text-slate-200">{item.time_format}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Pressable>
                        <SimpleLineIcons name="control-rewind" size={25} color="#a5a6c4" />
                    </Pressable>
                    <Pressable onPress={start}>
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
