import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

export default function AdsContent() {
  return (
    <View style={styles.adsContainer}>
      <ImageBackground
        source={require("@/assets/images/rider.jpg")}
        resizeMode="cover"
        style={styles.image}
        imageStyle={{ borderRadius: 12 }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.1)"]}
          style={styles.gradient}
        >
          <View style={styles.textContainer}>
            <Text style={styles.adText}>Earn Money with Rydo</Text>
            <Text style={styles.adText}>Become a Captain!</Text>
          </View>
          <Pressable style={styles.ctaButton}>
            <Text style={styles.ctaText}>Join Now</Text>
          </Pressable>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  adsContainer: {
    height: 140,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 16,
  },
  image: {
    flex: 1,
    justifyContent: "space-between",
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
    borderRadius: 12,
  },
  textContainer: {
    marginTop: 8,
  },
  adText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  ctaButton: {
    alignSelf: "flex-start",
    backgroundColor: "#FACC15", // bright yellow
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },
});
