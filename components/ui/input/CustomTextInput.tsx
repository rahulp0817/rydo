import { Ionicons } from "@expo/vector-icons";
import React, {
    forwardRef,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    Animated,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  required?: boolean;
  variant?: "default" | "outlined" | "underline" | "none";
  type?: "text" | "password" | "search";
  onClear?: () => void;
}

export const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      label,
      error,
      startIcon,
      endIcon,
      required,
      variant = "default",
      type = "text",
      onClear,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const focusAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (error) return;

      Animated.timing(focusAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [isFocused, error, focusAnim]);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const renderEndIcon = () => {
      if (type === "password") {
        return (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        );
      }

      if (type === "search" && props.value) {
        return (
          <TouchableOpacity onPress={onClear}>
            <Ionicons name="close" color="gray" size={20} />
          </TouchableOpacity>
        );
      }

      return endIcon;
    };

    const baseBorder =
      variant === "underline"
        ? styles.underlineBorder
        : variant === "none"
        ? styles.noBorder
        : styles.defaultBorder;

    const animatedBorderColor = error
      ? "#EF4444"
      : focusAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["#D1D5DB", "#3B82F6"],
        });

    const animatedBorderWidth =
      variant === "underline" || variant === "none"
        ? undefined
        : error
        ? 2
        : focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 2],
          });

    return (
      <View style={styles.container}>
        {label && (
          <Text style={[styles.label, error && styles.errorLabel]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}

        <Animated.View
          style={[
            styles.inputWrapper,
            baseBorder,
            {
              borderColor: animatedBorderColor,
              borderWidth: animatedBorderWidth,
            },
          ]}
        >
          {type === "search" && (
            <Ionicons
              name="search"
              color="gray"
              size={20}
              style={styles.iconSpacing}
            />
          )}

          {startIcon && <View style={styles.iconSpacing}>{startIcon}</View>}

          <TextInput
            {...props}
            ref={ref}
            secureTextEntry={type === "password" && !isPasswordVisible}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            placeholderTextColor="gray"
            style={[styles.textInput, props.style]}
          />

          {renderEndIcon() && (
            <View style={styles.iconSpacing}>{renderEndIcon()}</View>
          )}
        </Animated.View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#374151", // gray-700
  },
  errorLabel: {
    color: "#EF4444", // red-500
  },
  required: {
    color: "#EF4444",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 56,
    width: "100%",
  },
  iconSpacing: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827", // gray-900
    paddingVertical: 0,
    ...(Platform.OS === "android" && { textAlignVertical: "center" }),
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "#EF4444",
  },
  defaultBorder: {
    borderWidth: 1,
    borderRadius: 8,
  },
  underlineBorder: {
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  noBorder: {},
});

export default CustomTextInput;
