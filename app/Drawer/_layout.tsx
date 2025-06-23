import tw from 'twrnc';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { withLayoutContext } from 'expo-router';
import { AntDesign, Entypo, MaterialIcons, Feather } from '@expo/vector-icons'; // ⬅️ Added icons

const { Navigator, Screen } = createDrawerNavigator();
const Drawer = withLayoutContext(Navigator);

function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={tw`flex-1`}>
            <View style={tw`px-5`}>
                {/* Home */}
                <TouchableOpacity onPress={() => props.navigation.navigate('Main')} style={tw`flex-row items-center my-4`}>
                    <Entypo name="home" size={24} color="black" />
                    <Text style={tw`text-lg ml-3`}>Home</Text>
                </TouchableOpacity>

                {/* Profile */}
                <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style={tw`flex-row items-center my-4`}>
                    <AntDesign name="profile" size={24} color="black" />
                    <Text style={tw`text-lg ml-3`}>Profile</Text>
                </TouchableOpacity>

                {/* About */}
                <TouchableOpacity onPress={() => props.navigation.navigate('About')} style={tw`flex-row items-center my-4`}>
                    <AntDesign name="infocirlceo" size={24} color="black" />
                    <Text style={tw`text-lg ml-3`}>About Us</Text>
                </TouchableOpacity>

                {/* Settings */}
                <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} style={tw`flex-row items-center my-4`}>
                    <Feather name="settings" size={24} color="black" />
                    <Text style={tw`text-lg ml-3`}>Settings</Text>
                </TouchableOpacity>

                {/* Privacy */}
                <TouchableOpacity onPress={() => props.navigation.navigate('Privacy')} style={tw`flex-row items-center my-4`}>
                    <MaterialIcons name="privacy-tip" size={24} color="black" />
                    <Text style={tw`text-lg ml-3`}>Privacy</Text>
                </TouchableOpacity>
            </View>

            {/* Logout */}
            <View style={tw`mt-auto px-5 pb-5`}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Logout')} style={tw`flex-row items-center`}>
                    <AntDesign name="logout" size={24} color="black" />
                    <Text style={tw`text-lg ml-3`}>Logout</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}

export default function DrawerLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: true }}
        >
            <Drawer.Screen name="Main" options={{ title: 'Home' }} />
            <Drawer.Screen name="About" options={{ title: 'About Us' }} />
            <Drawer.Screen name="Profile" options={{ title: 'Profile' }} />
            <Drawer.Screen name="Settings" options={{ title: 'Settings' }} />
            <Drawer.Screen name="Privacy" options={{ title: 'Privacy' }} />
            <Drawer.Screen name="Logout" options={{ title: 'Logout' }} />
        </Drawer>
    );
}

