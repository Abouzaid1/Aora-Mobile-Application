import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import { StatusBar } from 'expo-status-bar'
import { ResizeMode, Video } from 'expo-av'
import CustomBtn from '../../components/customBtn'
import * as DocumentPicker from 'expo-document-picker'
import { useRouter } from 'expo-router'
import { createVideo } from '../../lib/appwriter'
import { useGlobalContext } from '../../provider/globalProvider'
const Create = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { user } = useGlobalContext()
    const [formData, setFormData] = useState({
        title: "",
        video: null,
        thumbnail: null,
        prompt: ""
    })
    const openPicker = async (type) => {
        const result = await DocumentPicker.getDocumentAsync({
            type: type === "image" ? ['image/png', 'image/jpg', 'image/jpeg'] : ['video/mp4', 'video/gif']
        })
        if (!result.canceled) {
            if (type === "image") {
                setFormData({ ...formData, thumbnail: result.assets[0] })
                console.log(result);

            } else if (type === "video") {
                setFormData({ ...formData, video: result.assets[0] })
            }
        } else {
            Alert.alert("Error", "Please select a file")
        }
    }
    const submit = async () => {
        if (formData.prompt || formData.thumbnail || formData.title || formData.video) {
            try {
                console.log(user.$id);
                setLoading(true)
                await createVideo({ ...formData, userId: user.$id })
                Alert.alert("Uploaded", "Thank you, enjoy :)")
            } catch (error) {
                throw new Error(error)
            } finally {
                setFormData({
                    title: "",
                    video: null,
                    thumbnail: null,
                    prompt: ""
                })
                setLoading(false)
                router.replace("/home")
            }
        } else {
            Alert.alert("Error", "Please fill in the data")
        }
    }
    const cancel = () => {
        setFormData({
            title: "",
            video: null,
            thumbnail: null,
            prompt: ""
        })
    }
    return (
        <SafeAreaView className='bg-primary h-full'>
            <StatusBar style='light' />
            <ScrollView>

                <Text className='font-pmedium text-[20px] text-white mt-[20px] p-5'>Upload Video</Text>
                <View className='p-5'>
                    <Text className='font-plight text-[18px] text-white mt-[20px]'>video title</Text>
                    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
                        <TextInput
                            value={formData.title}
                            onChangeText={(e) => setFormData({ ...formData, title: e })}
                            className="text-base mt-0.5 text-white flex-1 font-pregular"
                            placeholder="Give your video a catchy title"
                            placeholderTextColor="#CDCDE0"
                        />
                    </View>
                </View>
                <View className='p-5'>
                    <Text className='font-plight text-[18px] text-white mt-[20px]'>Upload video</Text>
                    {
                        formData.video ?
                            <View>
                                <Video
                                    source={formData.video}
                                    useNativeControls
                                    resizeMode={ResizeMode.CONTAIN}
                                    className='w-full h-[300px]'
                                    shouldPlay

                                />
                            </View>
                            : <TouchableOpacity onPress={() => { openPicker('video') }}>
                                <View className="flex flex-row justify-center items-center space-x-4 w-full h-[200px] px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
                                    <View className='border-dashed border-secondary border p-5 rounded-lg'>
                                        <Image source={icons.upload} resizeMode='contain' className='w-[20px] h-[20px]' />
                                    </View>
                                </View>
                            </TouchableOpacity>
                    }

                </View>
                <View className='p-5'>
                    <Text className='font-plight text-[18px] text-white mt-[20px]'>Upload thumbnail</Text>
                    {formData.thumbnail ?
                        <View>
                            <Image
                                source={formData.thumbnail}
                                resizeMode='contain'
                                className='w-full h-[300px]'

                            />
                        </View>
                        :
                        <TouchableOpacity onPress={() => { openPicker('image') }}>
                            <View className="flex flex-row justify-center items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
                                <View className='flex-row gap-2'>
                                    <Image source={icons.upload} resizeMode='contain' className='w-[20px] h-[20px]' />
                                    <Text className='font-pregular text-white'>Choose file</Text>
                                </View>
                            </View>
                        </TouchableOpacity>}
                </View>
                <View className='p-5'>
                    <Text className='font-plight text-[18px] text-white mt-[20px]'>AI prompt</Text>
                    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
                        <TextInput
                            value={formData.prompt}
                            onChangeText={(e) => setFormData({ ...formData, prompt: e })}
                            className="text-base mt-0.5 text-white flex-1 font-pregular"
                            placeholder="The Prompt of your video"
                            placeholderTextColor="#CDCDE0"
                        />
                    </View>
                </View>
                <View className='p-5'>
                    <CustomBtn text={"Cancel"} handlePress={cancel} btnStyle={"bg-primary border my-5"} />
                    <CustomBtn text={loading ? "Uploading...." : "Upload"} handlePress={submit} btnStyle={""} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create