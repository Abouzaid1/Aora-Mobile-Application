import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomBtn from './customBtn'
const EmptyState = () => {
    return (
        <View>
            <Image source={images.empty} className='w-full h-[300px]' resizeMode='contain' />
            <Text className='font-pbold text-white w-full text-center text-[20px]'>No Trending Videos</Text>
            <Text className='font-plight text-white w-full text-center'>Be the first one to uplaod a video</Text>
            <CustomBtn
                handlePress={() => { }}
                text={"Create a Video"}
                btnStyle={"mt-10"}
            />
        </View>
    )
}

export default EmptyState