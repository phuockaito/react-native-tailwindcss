import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useCounter } from '../hooks'

export const MainText = () => {
    const { result, handleIncrement } = useCounter();
    console.log('useCounter', result)
    return (
        <SafeAreaView>
            <View className="flex-row gap-2">
                <Text className="text-red-500">Counter: {result.value}</Text>

            </View>
            <View className="flex-row gap-2 m-2">
                <TouchableOpacity onPress={() => handleIncrement(1)}>
                    <Text className="p-2 text-white bg-black rounded">+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleIncrement(1)}>
                    <Text className="p-2 text-white bg-black rounded">+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
