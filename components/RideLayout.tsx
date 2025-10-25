// components/layouts/RideLayout.tsx
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeInDown } from "react-native-reanimated";

import Map from "@/components/Map";
import { icons } from "@/constants";

type RideLayoutProps = {
  title: string;
  snapPoints?: string[];
  children: React.ReactNode;
};

const RideLayout = ({ title, snapPoints, children }: RideLayoutProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, backgroundColor: "#3B82F6" }}>
          <Animated.View
            entering={FadeInDown.duration(400)}
            style={{
              position: "absolute",
              top: 64,
              left: 0,
              right: 0,
              zIndex: 10,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "white",
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  style={{ width: 24, height: 24 }}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "JakartaSemiBold",
                marginLeft: 16,
                color: "white",
              }}
            >
              {title || "Go Back"}
            </Text>
          </Animated.View>

          <Map />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["40%", "85%"]}
          index={0}
          backgroundStyle={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "#fff",
          }}
        >
          {title === "Choose a Rider" ? (
            <BottomSheetView style={{ flex: 1, padding: 20 }}>
              {children}
            </BottomSheetView>
          ) : (
            <BottomSheetScrollView style={{ flex: 1, padding: 20 }}>
              {children}
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
