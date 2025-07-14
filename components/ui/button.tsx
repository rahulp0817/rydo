import React, { forwardRef } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { HapticTab } from "../HapticTab";

type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type Size = "default" | "sm" | "lg" | "icon" | "compact";

type ButtonProps = React.ComponentPropsWithoutRef<typeof HapticTab> & {
  variant?: Variant;
  size?: Size;
  children?: React.ReactNode;
  loading?: boolean;
};

const Button = forwardRef<React.ElementRef<typeof HapticTab>, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      disabled,
      loading,
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <View style={{ borderRadius: 40, overflow: "hidden", width: "100%" }}>
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled || loading}
            style={[
              getButtonStyle(variant, size),
              (disabled || loading) && styles.disabled,
              style,
            ]}
            onPress={props.onPress}
          >
            <View style={styles.innerContainer}>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={getSpinnerColor(variant)}
                />
              ) : (
                <Text style={getTextStyle(variant, size)}>{children}</Text>
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <HapticTab
            ref={ref}
            disabled={disabled || loading}
            style={[
              getButtonStyle(variant, size),
              (disabled || loading) && styles.disabled,
              style,
            ]}
            {...props}
          >
            <View style={styles.innerContainer}>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={getSpinnerColor(variant)}
                />
              ) : (
                <Text style={getTextStyle(variant, size)}>{children}</Text>
              )}
            </View>
          </HapticTab>
        )}
      </View>
    );
  }
);

Button.displayName = "Button";
export { Button };

const getButtonStyle = (variant: Variant, size: Size): ViewStyle => {
  return StyleSheet.flatten([
    styles.base,
    variantStyles[variant],
    sizeStyles[size],
  ]);
};

const getTextStyle = (variant: Variant, size: Size): TextStyle => {
  return StyleSheet.flatten([
    textStyles.base,
    textVariantStyles[variant],
    textSizeStyles[size],
  ]);
};

const getSpinnerColor = (variant: Variant): string => {
  switch (variant) {
    case "default":
    case "outline":
    case "secondary":
    case "ghost":
      return "#000000";
    case "destructive":
      return "#FFFFFF";
    case "link":
      return "#1D4ED8";
    default:
      return "#000000";
  }
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  disabled: {
    opacity: 0.5,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

const variantStyles: Record<Variant, ViewStyle> = {
  default: {
    backgroundColor: "#FFD700",
  },
  destructive: {
    backgroundColor: "#EF4444",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  secondary: {
    backgroundColor: "#E0E0E0",
    borderWidth: 2,
    borderColor: "#3B82F6",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  link: {
    backgroundColor: "transparent",
  },
};

const sizeStyles: Record<Size, ViewStyle> = {
  default: {},
  sm: {},
  lg: {},
  icon: {
    width: 40,
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  compact: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
};

const textStyles = StyleSheet.create({
  base: {
    fontSize: 16,
    fontWeight: "500",
  },
});

const textVariantStyles: Record<Variant, TextStyle> = {
  default: { color: "#000000" },
  destructive: { color: "#FFFFFF" },
  outline: { color: "#FFD700" },
  secondary: { color: "#000000" },
  ghost: { color: "#000000" },
  link: { color: "#1D4ED8", textDecorationLine: "underline" },
};

const textSizeStyles: Record<Size, TextStyle> = {
  default: {},
  sm: { fontSize: 14 },
  lg: { fontSize: 18 },
  icon: {},
  compact: { textAlign: "center" },
};
