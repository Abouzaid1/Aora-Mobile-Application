import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomBtn from '../components/customBtn'
import { StatusBar } from 'expo-status-bar'
import { useRouter, Redirect } from 'expo-router'
import { useEffect } from 'react'
import useStore from '../states/loggedIn'
import { useGlobalContext } from '../provider/globalProvider'
const index = () => {
    const router = useRouter()
    const { isLogged } = useGlobalContext()
    if (isLogged) { return <Redirect href={"/home"} /> }
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>
                <View className='px-4 w-full justify-center items-center h-full'>
                    <Image
                        source={images.logo}
                        className='h-[84px] w-[130px]'
                        resizeMode='contain' />
                    <Image
                        source={images.cards}
                        className='max-w-[340px] w-full h-[300px]'
                        resizeMode='contain' />
                    <View className='relative mt-5'>
                        <Text className='text-white text-[30px] text-center font-psemibold'>
                            Disover Endless Posibilities with{""} <Text className='text-secondary-200'>Aora</Text>
                        </Text>
                        <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                            Where Creativity Meets Innovation: Embark on a Journey of Limitless
                            Exploration with Aora
                        </Text>
                    </View>
                    <CustomBtn btnStyle={"w-full mt-7"}
                        handlePress={() => { router.push("/sign_in") }}
                        text={"Continue with Email"} />
                </View>
            </ScrollView>
            <StatusBar style='light' />
        </SafeAreaView>
    )
}

export default index

