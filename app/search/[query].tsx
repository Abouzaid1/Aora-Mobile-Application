import { View, Text, SafeAreaView, FlatList, RefreshControl, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import VideoCard from '../../components/videoCard'
import { images } from '../../constants'
import SearchInput from '../../components/searchInput'
import EmptyState from '../../components/emptyState'
import { searchPosts } from '../../lib/appwriter'
import useFetchPosts from '../../lib/useFetchPosts'

const Search = () => {
    const { query } = useLocalSearchParams()
    const { data: posts } = useFetchPosts(() => searchPosts(query))
    return (
        <SafeAreaView className='bg-primary h-full px-5'>
            <StatusBar style="light" />

            <FlatList data={posts}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) =>
                    <VideoCard video={item} />
                }
                ListHeaderComponent={() => (<><View className='mt-[20px] mb-[50px] flex-row justify-between items-center'>
                    <View>
                        <Text className='font-pmedium text-gray-500 text-[14px]'>Search results for</Text>
                        <Text className='font-pmedium text-white text-[24px]'>{query}</Text>
                    </View>
                    <View>
                        <Image source={images.logoSmall} className='w-[40px] h-[40px]' resizeMode='contain' />
                    </View>
                </View></>)}
                ListEmptyComponent={<EmptyState />}
            />
        </SafeAreaView>
    )
}

export default Search