import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../Components/firebaseConfig';
import tw from 'twrnc';

export default function LogoutScreen() {
    const handleLogout = async () => {
        await signOut(auth);
        router.replace('/StudentLogIn');
    };

    return (
        <View style={tw`flex-1 justify-center items-center bg-gray-100 px-4`}>
            <View style={tw`bg-white p-6 rounded-xl shadow-md w-full max-w-sm`}>
                <Text style={tw`text-lg font-semibold text-center text-gray-800 mb-4 `}>
                    Do you want to logout?
                </Text>

                <TouchableOpacity
                    onPress={handleLogout}
                    activeOpacity={0.8}
                    style={tw`self-center`}
                >
                    <Text style={tw`text-blue-600 text-base underline`}>YES</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
