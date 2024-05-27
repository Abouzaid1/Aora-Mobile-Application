import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomBtn = ({ text, handlePress, btnStyle }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handlePress} className={`${btnStyle} h-[58px] justify-center rounded-[10px] items-center bg-secondary-100`}>
            <Text className='text-[16px] font-pmedium'>{text}</Text>
        </TouchableOpacity >
    )
}

export default CustomBtn