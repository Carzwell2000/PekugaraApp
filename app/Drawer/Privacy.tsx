import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

const Privacy = () => {
    return (
        <ScrollView contentContainerStyle={tw`flex-1 p-6 bg-white`}>
            <Text style={tw`text-2xl font-bold mb-4 text-center`}>Privacy Policy</Text>

            <Text style={tw`text-base text-gray-800 mb-4`}>
                We respect your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, and safeguard your data.
            </Text>

            <Text style={tw`text-lg font-semibold mb-2`}>1. Information Collection</Text>
            <Text style={tw`text-base text-gray-700 mb-4`}>
                We collect basic personal details like name, email, and usage data to improve your experience and provide secure access to your account.
            </Text>

            <Text style={tw`text-lg font-semibold mb-2`}>2. Data Usage</Text>
            <Text style={tw`text-base text-gray-700 mb-4`}>
                Your information is used strictly for authentication, personalization, and improving the functionality of the app. We do not sell or share your data with third parties.
            </Text>

            <Text style={tw`text-lg font-semibold mb-2`}>3. Data Security</Text>
            <Text style={tw`text-base text-gray-700 mb-4`}>
                We implement standard security practices to protect your information. Always ensure your device is secure and do not share your login credentials.
            </Text>

            <Text style={tw`text-base text-gray-800`}>
                By using this app, you agree to the terms outlined in this privacy policy. If you have any concerns or questions, please contact support.
            </Text>
        </ScrollView>
    );
};

export default Privacy;
