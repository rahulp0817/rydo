import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/AuthStore";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Pressable } from "react-native-gesture-handler";

const OTPScreen = () => {
  const route = useRoute();
  const { phone } = route.params as { phone: string };
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const { logIn } = useAuthStore();

  const inputRef = useRef<TextInput>(null);

  const handleOtpChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setOtp(numericText);
    setError("");
  };

  const verifyOtp = async (enteredOtp: string) => {
    setIsVerifying(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const dummyOtp = "1234";
      if (enteredOtp === dummyOtp) {
        setError("");
        setIsOtpVerified(true);
        try {
          await logIn();
          router.replace("/");
        } catch (loginError) {
          console.error("Login failed:", loginError);
          setError("Login failed. Please try again.");
          setIsOtpVerified(false);
        }
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp("");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("Verification failed. Please try again.");
      setOtp("");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleButtonPress = async () => {
    if (!isOtpVerified && otp.length === 4) {
      await verifyOtp(otp);
    } else if (isOtpVerified) {
      try {
        await logIn();
        router.replace("/");
      } catch (loginError) {
        console.error("Login failed:", loginError);
        setError("Login failed. Please try again.");
      }
    }
  };

  const handleResendOtp = async () => {
    setOtp("");
    setError("");
    setTimer(60);
    setIsResendEnabled(false);
    setIsOtpVerified(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      Alert.alert("OTP Resent", `A new OTP has been sent to ${phone}`);
    } catch {
      Alert.alert("Error", "Failed to resend OTP. Please try again.");
      setIsResendEnabled(true);
      setTimer(0);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timer === 0) {
      setIsResendEnabled(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (otp.length === 4 && !isOtpVerified && !isVerifying) {
      verifyOtp(otp);
    }
  }, [otp, isOtpVerified, isVerifying]);

  return (
    <View style={styles.otpcontainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Verify OTP</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={styles.subText}>
              Enter the 4-digit code sent to {phone}
            </Text>
            <Pressable onPress={() => router.back()}>
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={20}
                color="gray"
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            value={otp}
            onChangeText={handleOtpChange}
            keyboardType="number-pad"
            maxLength={4}
            style={[
              styles.input,
              error ? styles.inputError : null,
              isVerifying ? styles.inputDisabled : null,
            ]}
            placeholder="0000"
            placeholderTextColor="#9CA3AF"
            editable={!isVerifying}
          />
          {!!error && <Text style={styles.errorText}>{error}</Text>}
          {isVerifying && (
            <Text style={styles.verifyingText}>Verifying...</Text>
          )}
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {isResendEnabled
              ? "Didn't receive the code?"
              : `Resend code in ${formatTimer(timer)}`}
          </Text>

          {isResendEnabled && (
            <TouchableOpacity onPress={handleResendOtp} activeOpacity={0.9}>
              <Text style={styles.resendButtonText}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Button onPress={handleButtonPress} disabled={isVerifying}>
        {isOtpVerified ? "Submit" : isVerifying ? "Verifying..." : "Verify OTP"}
      </Button>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  otpcontainer: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 16,
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginBottom: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  subText: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 32,
  },
  input: {
    height: 60,
    borderColor: "#D1D5DB",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 24,
    letterSpacing: 8,
    textAlign: "center",
    color: "#111827",
    backgroundColor: "#FFFFFF",
    fontWeight: "600",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  inputDisabled: {
    backgroundColor: "#F9FAFB",
    opacity: 0.6,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "500",
  },
  verifyingText: {
    color: "#3B82F6",
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
  },
  timerContainer: {
    marginBottom: 24,
  },
  timerText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  resendButtonText: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "600",
  },
});
