import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../Components/firebaseConfig'; // adjust path if needed
import tw from 'twrnc';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';
import Header from "../Components/Header";
export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Reauthenticate user with current password, then update password
    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New password and confirmation do not match.');
            return;
        }

        setLoading(true);
        const user = auth.currentUser;

        if (user && user.email) {
            try {
                // Re-authenticate the user
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);

                // Update password
                await updatePassword(user, newPassword);

                Alert.alert('Success', 'Password changed successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } catch (error: any) {
                // Handle errors
                if (error.code === 'auth/wrong-password') {
                    Alert.alert('Error', 'Current password is incorrect.');
                } else if (error.code === 'auth/weak-password') {
                    Alert.alert('Error', 'New password is too weak.');
                } else {
                    Alert.alert('Error', error.message);
                }
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert('Error', 'No user is currently logged in.');
            setLoading(false);
        }
    };

    return (
        <View style={tw`flex-1 bg-white px-6 pt-10`}>
            <Text style={tw`text-2xl font-bold mb-6`}>Change Password</Text>
            <Header title="" />
            <TextInput
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
                style={tw`border border-gray-300 rounded-md px-4 py-3 mb-4`}
            />

            <TextInput
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                style={tw`border border-gray-300 rounded-md px-4 py-3 mb-4`}
            />

            <TextInput
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={tw`border border-gray-300 rounded-md px-4 py-3 mb-6`}
            />

            <TouchableOpacity
                onPress={handleChangePassword}
                disabled={loading}
                style={tw`bg-orange-400 rounded-xl py-4 ${loading ? 'opacity-50' : ''}`}
            >
                <Text style={tw`text-center text-white text-lg font-semibold`}>
                    {loading ? 'Changing...' : 'Change Password'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
