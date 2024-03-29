import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { SONGS } from '../data/Songs';
import { FavouritesContext } from '../store/context/favourite-context';

const PreviewScreen = ({ route, navigation }) => {
    const favouriteSongCtx = useContext(FavouritesContext);

    const songId = route.params.songId;

    const previewSong = SONGS.filter((songItem) => songItem.id === songId);

    const songIsFavourite = favouriteSongCtx.favouriteSongIds.includes(songId);

    function favouriteSongHandler() {
        if (songIsFavourite) {
            favouriteSongCtx.removeFavourite(songId);
        } else {
            favouriteSongCtx.addFavourite(songId);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={favouriteSongHandler}>
                        <Ionicons
                            name="heart-sharp"
                            color={songIsFavourite ? '#DB5461' : 'white'}
                            size={20}
                        />
                    </TouchableOpacity>
                );
            },
        });
    }, [navigation, favouriteSongHandler]);

    const Footer = () => {
        return (
            <View className=" justify-end items-center mb-3">
                <Text className="font-[poppins-bold] text-[10px] text-center ">
                    &copy; Adwil Media Services
                </Text>
                <Text className="font-[poppins] text-[10px] text-center ">
                    App designed & built by nuges😎
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView className=" bg-[#F9F6F0] flex-1">
            <FlatList
                data={previewSong}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="flex-1 items-center">
                        <View>
                            <Text className="font-[poppins-bold] my-3 mt-8">
                                {item.title}
                            </Text>
                            <Text className="font-[poppins-bold] text-center mb-5">
                                {item.scripture}
                            </Text>
                        </View>
                        <View>
                            <Text className="font-[poppins] text-[12px] text-left">
                                {item.verses[0]}
                            </Text>
                            <Text className="font-[poppins] text-left text-[12px] text-[#DB5461]">
                                {item.chorus}
                            </Text>
                            <Text className="font-[poppins] text-left text-[12px] mt-4">
                                {item.verses[1]}
                            </Text>
                            <Text className="font-[poppins] text-left text-[12px] mt-4">
                                {item.verses[2]}
                            </Text>
                            <Text className="font-[poppins] text-left text-[12px] mt-4">
                                {item.verses[3]}
                            </Text>
                            <Text className="font-[poppins] text-left text-[12px] mt-4">
                                {item.verses[4]}
                            </Text>
                        </View>
                        <Text className="font-[poppins] text-left text-[12px] mt-4">
                            {item.verses[6]}
                        </Text>
                    </View>
                )}
                ListFooterComponent={Footer}
            />
            {/* <View className=" justify-end items-center mb-3">
                <Text className="font-[poppins-bold] text-[10px] text-center ">
                    &copy; Adwil Media Services
                </Text>
                <Text className="font-[poppins] text-[10px] text-center ">
                    App designed & built by nuges😎
                </Text>
            </View> */}
        </SafeAreaView>
    );
};

export default PreviewScreen;
