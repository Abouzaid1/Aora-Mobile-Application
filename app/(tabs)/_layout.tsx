import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({ color, focused, icon, name }) => {
    return <View className="items-center justify-center">
        <Image
            source={icon}
            resizeMode='contain'
            tintColor={color}
            className="w-[25px] h-[30px]"
        />
        <Text className={`${focused ? "font-psemibold" : "font-plight"} text-[10px]`}
            style={{ color: color }}
        >
            {name}
        </Text>
    </View>
}

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#ffa001",
                tabBarInactiveTintColor: "#cdcde0",
                tabBarStyle: {
                    backgroundColor: "#161622",
                    height: 84,
                    borderTopWidth: 0
                },
            }}>
            <Tabs.Screen name='home' options={{
                title: "Home",
                headerShown: false,
                tabBarIcon({ color, focused }) {
                    return <TabIcon icon={icons.home}
                        color={color}
                        name={"Home"}
                        focused={focused} />
                },
            }} />
            <Tabs.Screen name='bookMark' options={{
                title: "Book Mark",
                headerShown: false,
                tabBarIcon({ color, focused }) {
                    return <TabIcon icon={icons.bookmark}
                        color={color}
                        name={"Book Mark"}
                        focused={focused} />
                },
            }} />
            <Tabs.Screen name='create' options={{
                title: "Create",
                headerShown: false,
                tabBarIcon({ color, focused }) {
                    return <TabIcon icon={icons.plus}
                        color={color}
                        name={"Create"}
                        focused={focused} />
                },
            }} />
            <Tabs.Screen name='profile' options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon({ color, focused }) {
                    return <TabIcon icon={icons.profile}
                        color={color}
                        name={"Profile"}
                        focused={focused} />
                },
            }} />
        </Tabs>
    )
}

export default TabsLayout