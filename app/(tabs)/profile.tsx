import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import { useGlobalContext } from '../../provider/globalProvider'
import useFetchPosts from '../../lib/useFetchPosts'
import { getUserPosts, signOut } from '../../lib/appwriter'
import VideoCard from '../../components/videoCard'
import EmptyState from '../../components/emptyState'
import { useRouter } from 'expo-router'
const profile = () => {
    const router = useRouter()
    const data = useGlobalContext()
    const logOut = async () => {
        await signOut()
        router.replace('/sign_in')
        data.setUser(null)
    }
    const userPosts = useFetchPosts(() => getUserPosts(data.user.$id))
    console.log(userPosts);

    return (
        <SafeAreaView className='bg-primary h-full w-full'>

            <View className=' h-full p-5'>

                <FlatList data={userPosts.data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }) =>
                        <VideoCard video={item} />
                    }
                    ListEmptyComponent={<EmptyState />}
                    ListHeaderComponent={() => {
                        return (
                            <>
                                <View className='my-[20px] w-full items-end justify-end'>
                                    <TouchableOpacity onPress={() => logOut()}>
                                        <Image source={icons.logout} className='w-[30px] h-[30px]' resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                                <View className='w-full items-center'>
                                    <Image className='w-[50px] h-[50px] mb-2 rounded-lg  ' resizeMode='contain' source={{ uri: data.user.avatar }} />
                                    <Text className='font-psemibold text-[16px] text-white mb-[20px]'>{data.user.username}</Text>
                                </View>
                            </>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default profile