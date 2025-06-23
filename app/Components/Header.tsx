import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "twrnc";

const Header: React.FC<{ title: string }> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex flex-row items-center justify-between py-3 px-2`}>
      {/* Back Button with Text */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw`flex flex-row items-center p-2`}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={tw`ml-1 text-base text-black`}>Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={tw`text-lg font-bold text-black`}>{title}</Text>

      {/* Settings / Notification Icon */}
      <TouchableOpacity
        style={tw`w-10 h-10 rounded-full flex justify-center items-center border border-gray-200`}
      >
        <Ionicons name="notifications" size={24} color="orange" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;