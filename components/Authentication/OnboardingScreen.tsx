import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Asset } from "expo-asset";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const IMAGES = [
  require("@/assets/images/rider.jpg"),
  require("@/assets/images/rider.jpg"),
  require("@/assets/images/rider.jpg"),
];

const OnboardingScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        const assets = IMAGES.map((image) =>
          Asset.fromModule(image).downloadAsync()
        );
        await Promise.all(assets);
        setIsLoading(false);
      } catch (error) {
        console.warn("Error loading assets:", error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  const handleContinue = () => {
    router.push("/(auth)/phone-screen");
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        data={IMAGES}
        loop
        autoPlay
        autoPlayInterval={3000}
        renderItem={({ item }) => (
          <ImageBackground
            source={item}
            style={styles.imageBackground}
            resizeMode="cover"
            blurRadius={2}
          />
        )}
        mode="parallax"
        pagingEnabled
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 0,
          parallaxAdjacentItemScale: 1.2,
        }}
      />

      <LinearGradient
        colors={["rgba(3,0,0,0.1)", "rgba(3,26,50,0.9)", "rgba(3,26,50,1)"]}
        locations={[0.4, 0.7, 1]}
        style={styles.overlay}
      >
        <SafeAreaView style={styles.rydoContainer}>
          <Text style={{ fontSize: 24 }}>🛵</Text>
          <Text style={styles.rydoText}>rydo</Text>
        </SafeAreaView>
        <View style={styles.content}>
          <View style={styles.text}>
            <Text style={styles.mainTitle}>Welcome to Rydo</Text>
            <Text style={styles.subtitle}>
              Drive, earn & ride with confidence
            </Text>
          </View>

          <Button onPress={handleContinue}>Continue</Button>

          <Text style={styles.agreementText}>
            By continuing, you agree to our{" "}
            <Text
              onPress={() =>
                Linking.openURL("https://rekord.in/terms-and-conditions")
              }
              style={styles.linkText}
            >
              Terms
            </Text>{" "}
            and{" "}
            <Text
              onPress={() =>
                Linking.openURL("https://rekord.in/privacy-policy")
              }
              style={styles.linkText}
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  content: {
    alignItems: "flex-start",
    gap: 24,
  },
  text: {
    gap: 8,
  },
  mainTitle: {
    fontSize: Platform.OS === "ios" ? 30 : 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#DDDDDD",
  },
  agreementText: {
    color: "#B0B0B0",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 12,
  },
  linkText: {
    color: "#FFFFFF",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#031A32",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ffffff",
    marginTop: 8,
  },
  rydoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    paddingHorizontal: 24,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },

  rydoText: {
    color: "Green",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
