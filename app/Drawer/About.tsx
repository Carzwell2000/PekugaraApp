import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

const About = () => {
    return (
        <ScrollView contentContainerStyle={tw`flex-1 p-6 bg-white`}>
            <Text style={tw`text-2xl font-bold mb-4 text-center`}>About Us</Text>
            <Text style={tw`text-base leading-6 text-gray-800 mb-4`}>
                Welcome to our app! We are committed to providing students with a streamlined way to manage their academic life, housing needs, and communication with the administration.
            </Text>
            <Text style={tw`text-base leading-6 text-gray-800 mb-4`}>
                Our mission is to build tools that simplify tasks and improve campus engagement. This app is designed to be easy to use, secure, and always evolving based on your feedback.
            </Text>
            <Text style={tw`text-base leading-6 text-gray-800`}>
                Thank you for choosing us. If you have any suggestions or feedback, don’t hesitate to reach out through the contact section!
            </Text>
        </ScrollView>
    );
};

export default About;
