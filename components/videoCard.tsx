import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'
const VideoCard = ({ video }) => {
    const [play, setPlaying] = useState<boolean>()
    return (
        <View className='mb-10'>
            <View className='flex-row justify-between mb-2'>
                <View className='flex-row gap-4'>

                    <View>
                        <Image source={{ uri: video.users.avatar }} className='w-[45px] rounded-lg h-[45px]' />
                    </View>
                    <View>
                        <Text className='text-white font-pregular text-[16px] '>{video.title}</Text>
                        <Text className='text-white font-plight text-[12px] '>{video.users.username}</Text>
                    </View>
                </View>
                <View>
                    <Image source={icons.menu} resizeMode='contain' className='h-[20px] w-[20px]' />
                </View>
            </View>

            {
                play ? <Video
                    source={{ uri: video.video }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    className='w-full h-[300px]'
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
                            <Image source={{ uri: video.thumbnail }} className='w-full rounded-lg h-[300px]' />
                            <View className='w-full h-[300px] justify-center items-center absolute'>
                                <Image source={icons.play} className='h-[40px] rounded-lg w-[40px]' resizeMode='contain' />
                            </View>
                        </View>
                    </TouchableOpacity>
            }
        </View>
    )
}

export default VideoCard