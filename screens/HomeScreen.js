import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { themeColors } from "./../theme/index";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { categories, shortVideos } from "./../constants/index";
import ShortVideoCard from "../components/shortVideoCard";
import VideoCard from "../components/videoCard";
import { fetchTrendingVideos } from "../api/youtube";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchTrendingVideos();
    console.log("video: ", data[0]);
    setVideos(data);
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={{ backgroundColor: themeColors.bgColor }} className="flex-1">
        {/* Header  */}
        <SafeAreaView className="flex-row justify-between m-4">
          <View className="flex-row items-center space-x-1">
            <Image
              source={require("../assets/icons/youtubeIcon.png")}
              className="h-7 w-10"
            />
            <Text className="text-white font-semibold text-xl tracking-tighter">
              YouTube
            </Text>
          </View>
          <View className="flex-row items-center space-x-3">
            <Icon.Cast stroke="white" strokeWidth={1.2} height="22" />
            <Icon.Bell stroke="white" strokeWidth={1.2} height="22" />
            <Icon.Search stroke="white" strokeWidth={1.2} height="22" />
            <TouchableOpacity>
              <Image
                source={require("../assets/images/profile.png")}
                className="h-7 w-7 rounded-full"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Categories  */}
          <View className="py-2 pb-5">
            <ScrollView
              className="px-4"
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {categories.map((category, index) => {
                let isActive = category == activeCategory;
                let textClass = isActive ? "text-black" : "text-white";

                return (
                  <TouchableOpacity
                    onPress={() => setActiveCategory(category)}
                    key={index}
                    style={{
                      backgroundColor: isActive
                        ? "white"
                        : "rgba(255, 255, 255, 0.1)",
                    }}
                    className="rounded-md py-1 px-3 mr-2"
                  >
                    <Text className={textClass}>{category}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Suggested Videos  */}
          {/* <VideoCard video={videos[0]} /> */}

          {/* Short Videos  */}
          <View className="mt-2 py-5 space-y-3 border-t-zinc-700 border-b-zinc-700 border-4 border-l-0 border-r-0">
            <View className="mx-4 flex-row items-center space-x-2">
              <Image
                source={require("../assets/icons/shortsIcon.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-lg tracking-tighter">
                Shorts
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-4"
            >
              {shortVideos.map((item, index) => (
                <ShortVideoCard item={item} key={index} />
              ))}
            </ScrollView>
          </View>

          {/* Long Videos  */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {videos?.map((video, index) => (
              <VideoCard video={video} key={index} />
            ))}
          </ScrollView>
        </ScrollView>
      </View>
    </>
  );
}
