
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { auth } from '../Components/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();

    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async () => {
        if (!displayName.trim()) {
            Alert.alert('Validation Error', 'Display name cannot be empty.');
            return;
        }

        setLoading(true);
        try {
            await updateProfile(user!, {
                displayName,
                photoURL,
            });

            await user!.reload(); // 👈 important to reflect updates
            Alert.alert('Success', 'Profile updated successfully!');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={tw`flex-1 bg-white px-6 pt-10`}>
            <Text style={tw`text-2xl font-bold text-black mb-6`}>Edit Profile</Text>

            <Text style={tw`text-gray-700 mb-1`}>Display Name</Text>
            <TextInput
                value={displayName}
                onChangeText={setDisplayName}
                style={tw`border border-gray-300 rounded-md px-4 py-3 mb-4`}
                placeholder="Enter your name"
            />

            <Text style={tw`text-gray-700 mb-1`}>Photo URL</Text>
            <TextInput
                value={photoURL}
                onChangeText={setPhotoURL}
                style={tw`border border-gray-300 rounded-md px-4 py-3 mb-6`}
                placeholder="https://example.com/photo.jpg"
            />

            <TouchableOpacity
                onPress={handleUpdateProfile}
                disabled={loading}
                style={tw`bg-orange-500 rounded-xl py-4 ${loading ? 'opacity-60' : ''}`}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={tw`text-center text-white text-lg font-semibold`}>Save Changes</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default EditProfile;
