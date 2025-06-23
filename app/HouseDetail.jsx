import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { createClient } from "@supabase/supabase-js";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import Header from "./Components/Header";

const supabaseUrl = "https://aqlztcsukugmsztrrkau.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxbHp0Y3N1a3VnbXN6dHJya2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5NzQyMTgsImV4cCI6MjA1MzU1MDIxOH0.jjefq42swAHHFCfAjE66gDniK4fyJaYOl5iDNBfzmcc";
const supabase = createClient(supabaseUrl, supabaseKey);

const { width } = Dimensions.get("window");

const features = [
  { name: "WiFi", icon: <Ionicons name="wifi" size={24} color="orange" /> },
  { name: "TV", icon: <FontAwesome name="tv" size={24} color="orange" /> },
  { name: "Beds", icon: <FontAwesome name="bed" size={24} color="orange" /> },
  {
    name: "Solar",
    icon: (
      <MaterialCommunityIcons name="solar-power" size={24} color="orange" />
    ),
  },
  {
    name: "Stove",
    icon: <MaterialCommunityIcons name="stove" size={24} color="orange" />,
  },
  {
    name: "Fridge",
    icon: <FontAwesome name="snowflake-o" size={24} color="orange" />,
  },
];

const HouseDetail = () => {
  const route = useRoute();
  const { house } = route.params;
  const [landlordPhone, setLandlordPhone] = useState("Not available");
  const [address, setAddress] = useState("Address not available");
  const [images, setImages] = useState(house.Image ? [house.Image] : []);
  const [description, setDescription] = useState("No description available.");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHouseDetails = async () => {
      if (!house?.id) {
        console.error("Error: house.id is undefined");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("House")
          .select(
            "landlordPhone, address, Description, Image, Image1, Image2, Image3"
          )
          .eq("id", house.id)
          .single();

        if (!error && data) {
          setLandlordPhone(data.landlordPhone || "Not available");
          setAddress(data.address || "Address not available");
          setDescription(data.Description || "No description available.");
          setImages(
            [data.Image, data.Image1, data.Image2, data.Image3].filter(Boolean)
          );
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchHouseDetails();
  }, [house?.id]);

  return (
    <ScrollView>
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <Header title="" />

        {/* Image Carousel */}
        {images.length > 0 ? (
          <Carousel
            loop
            width={width}
            height={300}
            autoPlay
            data={images}
            scrollAnimationDuration={2000}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={tw`w-full h-full rounded-2xl`} />
            )}
          />
        ) : (
          <Image source={{ uri: house.Image }} style={tw`w-full h-80 rounded-2xl`} />
        )}

        {/* Dots */}
        <View style={tw`absolute bottom-4 left-0 right-0 flex-row justify-center`}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                tw`w-2.5 h-2.5 mx-1 rounded-full`,
                index === currentIndex ? tw`bg-blue-500` : tw`bg-gray-300`,
              ]}
            />
          ))}
        </View>

        <View style={tw`px-5 pt-5 pb-10 bg-white`}>
          {/* House Info */}
          <View style={tw`bg-white rounded-2xl p-4 shadow-md mb-5`}>
            <Text style={tw`text-black font-bold text-3xl mb-1`}>{house.name}</Text>
            <Text style={tw`text-orange-500 font-semibold text-lg mb-1`}>
              {house.price}/month
            </Text>
            <Text style={tw`text-gray-500 text-sm`}>{house.distance} to Campus</Text>
          </View>

          {/* Features */}
          <Text style={tw`text-lg font-bold mb-3`}>Available Facilities</Text>
          <View style={tw`flex-row justify-around mb-6`}>
            {features.slice(3, 6).map((feature, index) => (
              <View key={index} style={tw`items-center`}>
                {feature.icon}
                <Text style={tw`text-sm mt-1`}>{feature.name}</Text>
              </View>
            ))}
          </View>

          {/* Landlord Card */}
          {landlordPhone && (
            <View style={tw`bg-white rounded-2xl p-4 shadow-md flex-row items-center mb-6`}>
              <Image
                source={{ uri: house.Image }}
                style={tw`w-16 h-16 rounded-full`}
              />
              <View style={tw`ml-4 flex-1`}>
                <Text style={tw`text-base font-bold`}>Landlord</Text>
                <Text style={tw`text-gray-500`}>{landlordPhone}</Text>
              </View>
              {landlordPhone !== "Not available" && (
                <TouchableOpacity
                  style={tw`bg-green-500 p-2 rounded-full`}
                  onPress={() => Linking.openURL(`tel:${landlordPhone}`)}
                >
                  <FontAwesome name="phone" size={20} color="white" />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Description */}
          <Text style={tw`text-lg font-bold mb-2`}>Description</Text>
          <Text style={tw`text-gray-600 leading-6`}>{description}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HouseDetail;

