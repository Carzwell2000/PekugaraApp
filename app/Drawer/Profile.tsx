import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { auth } from '../Components/firebaseConfig';
import tw from 'twrnc';
import { Link, router } from 'expo-router';

const Profile = () => {
    const user = auth.currentUser;

    return (
        <View style={tw`flex-1 bg-white px-6 pt-12`}>
            <View style={tw`items-center`}>
                <Image
                    source={{ uri: user?.photoURL || 'https://i.pravatar.cc/150?img=12' }}
                    style={tw`w-28 h-28 rounded-full border-4 border-orange-400 shadow-lg`}
                />
                <Text style={tw`text-2xl font-extrabold mt-5 text-gray-900`}>
                    {user?.displayName || 'Carzwell Chimanyiwa'}
                </Text>
                <Text style={tw`text-gray-600 mt-1 text-base tracking-wide`}>
                    {user?.email || 'user@example.com'}
                </Text>
            </View>

            <View style={tw`mt-10 px-2`}>
                <TouchableOpacity
                    style={tw`bg-orange-500 rounded-xl p-4 mb-5 shadow-md`}
                    activeOpacity={0.7}
                    onPress={() => router.push('/(Services)/EditProfile')}
                >
                    <Text style={tw`text-center text-white text-lg font-semibold`}>Edit Profile</Text>
                </TouchableOpacity>

                {/* Center the Change Password link */}
                <View style={tw`items-center`}>
                    <Link href="/(Services)/ChangePassword" style={tw`bg-gray-100 rounded-xl p-4 shadow-sm w-48`}>
                        <Text style={tw`text-center text-gray-800 text-lg font-semibold`}>Change Password</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
};

export default Profile;
