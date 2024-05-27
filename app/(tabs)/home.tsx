import { View, Text, Image, TextInput, FlatList, RefreshControl, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useStore from '../../states/loggedIn'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { icons, images } from '../../constants'
import Trending from '../../components/trending'
import { getAllPosts, getLatestPosts } from '../../lib/appwriter'
import useFetchPosts from '../../lib/useFetchPosts'
import VideoCard from '../../components/videoCard'
import EmptyState from '../../components/emptyState'
import { useRouter } from 'expo-router'
import SearchInput from '../../components/searchInput'
import { useGlobalContext } from '../../provider/globalProvider'
const home = () => {
    const router = useRouter()
    const { data: posts, loading, refetch } = useFetchPosts(getAllPosts)
    const { data: latestPosts } = useFetchPosts(getLatestPosts)
    const { user } = useGlobalContext()
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }
    return (
        <SafeAreaView className='bg-primary h-full px-5'>
            <StatusBar style="light" />

            <FlatList data={posts}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) =>
                    <VideoCard video={item} />
                }
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListHeaderComponent={() => (<><View className='mt-[20px] flex-row justify-between items-center'>
                    <View>
                        <Text className='font-pmedium text-gray-500 text-[14px]'>Welcome Back</Text>
                        <Text className='font-pmedium text-white text-[24px]'>Ahmed Abouzaid</Text>
                    </View>
                    <View>
                        <Image source={images.logoSmall} className='w-[40px] h-[40px]' resizeMode='contain' />
                    </View>
                </View>
                    <SearchInput />
                    <View>
                        <Text className='font-plight text-gray-100 text-[18px] mb-5 mt-[20px]'>Trending Videos</Text>
                    </View><Trending posts={latestPosts} /></>)}
                ListEmptyComponent={<EmptyState />}
            />
        </SafeAreaView>
    )
}

export default home