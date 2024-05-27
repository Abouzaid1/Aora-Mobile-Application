import { View, Text, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import CustomBtn from '../../components/customBtn'
import { StatusBar } from 'expo-status-bar'
import { Link, useRouter } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwriter'
import useStore from '../../states/loggedIn'
import { useGlobalContext } from '../../provider/globalProvider'
const SignIn = () => {
    const { setIsLogged, setUser } = useGlobalContext()
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleClick = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert("Error", "Please enter your email and password")
        } else {
            setSubmitting(true)
            try {
                await signIn(formData.email, formData.password)
                const result = await getCurrentUser()
                console.log("result", result);
                setUser(result)
                router.replace("/home")
                setIsLogged(true)
            } catch (err) {
                Alert.alert("Error", err.message)
            }
            finally {
                setSubmitting(false)
            }
        }
    }
    return (
        <SafeAreaView className='bg-primary h-full'>
            <View className='px-4 w-full justify-center min-h-full'>
                <Image
                    source={images.logo}
                    className='h-[84px] w-[110px]'
                    resizeMode='contain' />

                <View className=' my-5'>
                    <Text className='text-white text-[22px] font-psemibold'>
                        Sign In
                    </Text>
                </View>
                <View className='gap-8'>
                    <View>

                        <Text className='text-[16px] font-pregular text-gray-100'>Email</Text>
                        <TextInput value={formData.email} onChangeText={(e) => setFormData({ ...formData, email: e })} className='focus:border-secondary-100 focus:border w-full bg-black-200 p-5 rounded-xl text-white text-[16px] font-pregular' placeholderTextColor={"white"} placeholder='Email' />
                    </View>
                    <View>

                        <Text className='text-[16px] font-pregular text-gray-100'>Password</Text>
                        <TextInput value={formData.password} onChangeText={(e) => setFormData({ ...formData, password: e })} className='focus:border-secondary-100 focus:border w-full bg-black-200 p-5 rounded-xl text-white text-[16px] font-pregular' placeholderTextColor={"white"} placeholder='Password' />
                        <Text className='text-gray-100 w-full text-[14px] my-4 text-right font-plight'>Forgot Password</Text>
                    </View>
                    <View>
                        <CustomBtn
                            handlePress={handleClick}
                            text={submitting ? "Logging..." : "Log In"}
                            btnStyle={""}
                        />
                        <View className='my-5'>
                            <Text className='text-gray-100 text-center text-[14px] font-plight'>Dont have an account{"  "}
                                <Link href="/sign_up">
                                    <Text className='text-secondary-100 text-[14px] font-pbold'>Sign Up</Text>
                                </Link>
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <StatusBar style='light' />
        </SafeAreaView>
    )
}

export default SignIn