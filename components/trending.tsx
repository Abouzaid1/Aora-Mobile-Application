import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import EmptyState from './emptyState'
import * as Animatable from 'react-native-animatable'
import { Video, ResizeMode } from 'expo-av'
import { icons } from "../constants";

const zoomIn = {
    0: {
        scale: 0.9,
    },
    1: {
        scale: 1,
    },
};

const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,
    },
};

const TrendingItem = ({ activeItem, item }) => {
    const [play, setPlaying] = useState(false)

    return (
        <Animatable.View className='mr-5 mb-10' animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={200}>
            {
                play ? <Video
                    source={{ uri: item.video }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    className='w-[200px] h-[300px]'
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlaying(false)
                        }
                    }
                    }
                /> :
                    <TouchableOpacity onPress={() => setPlaying(true)} activeOpacity={0.8} className='h-[300px] w-full'>
                        <View>
                            <Image source={{ uri: item.thumbnail }} className='w-[200px] rounded-lg h-[300px]' />
                            <View className='w-[200px] h-full justify-center items-center absolute'>
                                <Image source={icons.play} className='h-[40px] rounded-lg w-[40px]' resizeMode='contain' />
                            </View>
                        </View>
                    </TouchableOpacity>
            }
        </Animatable.View>
    )
}


const Trending = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[1])
    const viewableItemChanged = ({ viewableItems }) => {

        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].item.$id);
        }
    };

    return (
        <FlatList data={posts}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // keyExtractor={(item) => item.$id}
            renderItem={({ item }) =>
                <TrendingItem activeItem={activeItem} item={item} />
            }
            onViewableItemsChanged={viewableItemChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 100,
            }}
            contentOffset={{ x: 120, y: 0 }}
            horizontal
        />
    )
}

export default Trending