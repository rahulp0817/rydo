
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../ui/button";

type CustomHeaderProps = {
  title: string;
  isHomeHeader?: boolean;
  showBackIcon?: boolean;
  showSearch?: boolean;
  isTabHeader?: boolean;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  isHomeHeader = false,
  showBackIcon = false,
  showSearch = false,
  isTabHeader,
}) => {
  const navigation = useNavigation();

  const handleSearch = () => {
    console.log("Search triggered");
  };

  return (
    <View style={styles.container}>
      {showBackIcon && (
        <Button variant="ghost" size="icon" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Button>
      )}

      <Text style={styles.title}>{title}</Text>

      {/* {showSearch && (
        <Button variant="ghost" size="icon" onPress={handleSearch}>
          <AppIcon name="search" set="Feather" color="#000" size={24} />
        </Button>
      )} */}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
  },
});
