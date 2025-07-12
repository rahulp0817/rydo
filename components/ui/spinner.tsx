import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Spinner = ({
  size = "large",
  color = "#000", // default color can be overridden via props
  viewStyle = {},
  spinnerStyle = {},
}: {
  size?: "small" | "large";
  color?: string;
  viewStyle?: object;
  spinnerStyle?: object;
}) => {
  return (
    <View style={[styles.center, viewStyle]}>
      <ActivityIndicator size={size} color={color} style={spinnerStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Spinner;
