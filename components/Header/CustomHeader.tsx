import AppIcon from "@/assets/icons/ExpoVectorIcons";
import { sendHelpWhatsAppNumber } from "@/utils/help";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

type CustomHeaderProps = {
  title: string;
  showBackIcon?: boolean;
  showSearch?: boolean;
  isTabHeader?: boolean;
  showHelp?: boolean;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackIcon = false,
  showSearch = false,
  showHelp = false,
  isTabHeader,
}) => {
  const handleSearch = () => {
    console.log("Search triggered");
  };

  const handleTalkToUs = async () => {
    sendHelpWhatsAppNumber();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBackIcon && (
          <Pressable onPress={() => router.back()}>
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={24}
              color="#000"
            />
          </Pressable>
        )}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      </View>

      {showSearch && (
        <Pressable onPress={handleSearch}>
          <AppIcon name="search" set="Feather" color="#000" size={24} />
        </Pressable>
      )}

      {showHelp && (
        <Pressable style={styles.helpbutton} onPress={handleTalkToUs}>
          <AppIcon name="help-circle" set="Feather" color="#000" size={16} />
          <Text style={styles.helptext}>Help</Text>
        </Pressable>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    flexShrink: 1,
  },
  helpbutton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 16,
    padding: 4,
  },
  helptext: {
    fontSize: 12,
    fontWeight: 600,
  },
});
