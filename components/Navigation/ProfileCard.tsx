import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ProfileCard = () => {
  const [isLoading, setIsLogoLoading] = useState(false);
  let realmQuickActionList = "";
  return (
    <View style={styles.profileconatiner}>
      <View style={styles.profileinner}>
        <View style={styles.profilecardview}>
          <View style={styles.avatar}></View>

          {/* {realmQuickActionList ? (
            <FastImage
              style={{ width: 200, height: 200 }}
              source={{
                uri: "https://unsplash.it/400/400?image=1",
                headers: { Authorization: "someAuthToken" },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              onLoadStart={() => setIsLogoLoading(true)}
              onLoadEnd={() => setIsLogoLoading(false)}
              onError={() => setIsLogoLoading(false)}
            />
          ) : (
            <View className="w-10 h-10 rounded-md border dark:border-white flex flex-row justify-center items-center">
              <Text className="native:text-xl dark:text-white font-semibold">
                {realmQuickActionList?.[0]?.toUpperCase()}
              </Text>
            </View>
          )} */}
          <View style={styles.namesview}>
            <Text style={styles.text}>Rahul Pradhan</Text>
            <Text style={styles.textnum}>812346748</Text>
          </View>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          style={{ marginRight: 10 }}
          color="#000"
        />
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      <View style={styles.profileinner}>
        <View style={styles.profilecardrating}>
          <View style={styles.starContainer}>
            <Ionicons name="star" size={24} color="#FACC15" />
          </View>
          <Text style={styles.textrating}>4.92 My Rating</Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#000"
          style={{ marginRight: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileconatiner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    elevation: 5,
    shadowRadius: 16,
  },
  profileinner: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  profilecardview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    backgroundColor: "#E5E7EB",
    borderRadius: 40,
    width: 50,
    height: 50,
  },
  namesview: {
    gap: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  textnum: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
  textrating: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
  },
  profilecardrating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  starContainer: {
    marginHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#D1D5DB",
    marginVertical: 10,
  },
});

export default ProfileCard;
