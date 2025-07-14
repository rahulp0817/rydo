import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Pressable } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const categories = [
  {
    label: "I'm Rider",
    quote: "Get there smarter, safer, faster.",
    image: require("@/assets/images/customer.jpg"),
  },
  {
    label: "I'm Captain",
    quote: "Lead the way. Own the road.",
    image: require("@/assets/images/rider.jpg"),
  },
];

const CARD_HEIGHT = 200;
const CARD_RADIUS = 20;
const CARD_WIDTH = width - 40;

const CategorySelect = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select the Category</Text>

      <Text style={styles.subquote}>
        Your journey begins with a single choice. Who will you be today?
      </Text>

      {categories.map((item) => (
        <Pressable
          key={item.label}
          style={styles.card}
          onPress={() => router.push("/(auth)/phone-screen")}
        >
          <ImageBackground
            source={item.image}
            imageStyle={styles.image}
            style={styles.imageContainer}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]}
              style={styles.gradient}
            >
              <Text style={styles.cardQuote}>{item.quote}</Text>
              <Text style={styles.label}>{item.label}</Text>
            </LinearGradient>
          </ImageBackground>
        </Pressable>
      ))}
    </View>
  );
};

export default CategorySelect;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 12,
  },
  subquote: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_RADIUS,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: CARD_RADIUS,
    resizeMode: "cover",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: CARD_RADIUS,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  cardQuote: {
    color: "#D1D5DB",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
