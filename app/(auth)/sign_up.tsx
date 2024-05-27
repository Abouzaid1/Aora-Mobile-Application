import { View, Text, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import CustomBtn from '../../components/customBtn'
import { StatusBar } from 'expo-status-bar'
import { Link, useRouter } from 'expo-router'
import { createUser } from '../../lib/appwriter'
import { useGlobalContext } from '../../provider/globalProvider'
const SignUp = () => {
    const router = useRouter()
    const { setUser } = useGlobalContext()
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
    })
    const handleClick = async () => {
        if (!formData.email || !formData.password || !formData.username) {
            Alert.alert("Error", "Please enter your email and password")
        } else {
            setSubmitting(true)
            try {
                const result = await createUser(formData.email, formData.password, formData.username)
                setUser(result)
                router.replace("/home")
            } catch (err) {
                Alert.alert("Error", "err")
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
                        Sign Up
                    </Text>
                </View>
                <View className='gap-8'>
                    <View>

                        <Text className='text-[16px] font-pregular text-gray-100'>UserName</Text>
                        <TextInput value={formData.username} onChangeText={(e) => setFormData({ ...formData, username: e })} className='w-full focus:border-secondary-100 focus:border bg-black-200 p-5 rounded-xl text-white text-[16px] font-pregular' placeholderTextColor={"white"} placeholder='UserName' />
                    </View>
                    <View>

                        <Text className='text-[16px] font-pregular text-gray-100'>Email</Text>
                        <TextInput value={formData.email} onChangeText={(e) => setFormData({ ...formData, email: e })} className='w-full focus:border-secondary-100 focus:border bg-black-200 p-5 rounded-xl text-white text-[16px] font-pregular' placeholderTextColor={"white"} placeholder='Email' />
                    </View>
                    <View>

                        <Text className='text-[16px] font-pregular text-gray-100'>Password</Text>
                        <TextInput value={formData.password} onChangeText={(e) => setFormData({ ...formData, password: e })} className='w-full focus:border-secondary-100 focus:border bg-black-200 p-5 rounded-xl text-white text-[16px] font-pregular' placeholderTextColor={"white"} placeholder='Password' />
                    </View>
                    <View>
                        <CustomBtn
                            handlePress={handleClick}
                            text={submitting ? "Submitting..." : "Sign Up"}
                            btnStyle={""}
                        />
                        <View className='my-5'>
                            <Text className='text-gray-100 text-center text-[14px] font-plight'>Already have an account{"  "}
                                <Link href={"/sign_in"}>
                                    <Text className='text-secondary-100 text-[14px] font-pbold'>Sign In</Text>
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

export default SignUp

