import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface PhoneInput91Props extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
}

const CustomPhoneInput = forwardRef<TextInput, PhoneInput91Props>(
  ({ label, error, required, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const focusAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (error) return;
      Animated.timing(focusAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [isFocused, error]);

    const animatedBorderColor = error
      ? '#EF4444'
      : focusAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['#D1D5DB', '#3B82F6'],
        });

    const animatedBorderWidth = error
      ? 2
      : focusAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 2],
        });

    return (
      <View style={styles.container}>
        {label && (
          <Text style={[styles.label, error && styles.labelError]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}

        <Animated.View
          style={[
            styles.inputWrapper,
            {
              borderColor: animatedBorderColor,
              borderWidth: animatedBorderWidth,
            },
          ]}
        >
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            ref={ref}
            {...props}
            keyboardType="number-pad"
            placeholderTextColor="gray"
            style={styles.textInput}
            onFocus={e => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={e => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            maxLength={10}
          />
        </Animated.View>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  labelError: {
    color: '#EF4444',
  },
  required: {
    color: '#EF4444',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  countryCode: {
    marginRight: 8,
    fontSize: 16,
    color: '#111827',
    fontWeight: 600
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
    fontWeight: 600,
    ...(Platform.OS === 'android' && { textAlignVertical: 'center' }),
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: '#EF4444',
  },
});

export default CustomPhoneInput;
