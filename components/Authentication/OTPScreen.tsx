import { Button } from "@/components/ui/button";
import { useNavigation, useRoute } from "@react-navigation/native";
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

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { phone } = route.params as { phone: string };
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRef = useRef<TextInput>(null);

  // Timer effect
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

  // Focus input on mount
  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(focusTimeout);
  }, []);

  // Auto-verify when OTP is complete
  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp(otp);
    }
  }, [otp]);

  const verifyOtp = async (enteredOtp: string) => {
    setIsVerifying(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Replace this with actual backend OTP validation
      const dummyOtp = "123456";

      if (enteredOtp === dummyOtp) {
        setError("");
        router.replace("/(drawer)");
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp("");
      }
    } catch (error) {
      setError("Verification failed. Please try again.");
      setOtp("");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setOtp("");
    setError("");
    setTimer(60);
    setIsResendEnabled(false);

    try {
      // Simulate API call for resending OTP
      await new Promise((resolve) => setTimeout(resolve, 500));
      Alert.alert("OTP Resent", `A new OTP has been sent to ${phone}`);
    } catch (error) {
      Alert.alert("Error", "Failed to resend OTP. Please try again.");
      setIsResendEnabled(true);
      setTimer(0);
    }
  };

  const handleOtpChange = (text: string) => {
    // Only allow numeric input
    const numericText = text.replace(/[^0-9]/g, "");
    setOtp(numericText);
    setError("");
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Verify OTP</Text>
        <Text style={styles.subText}>
          Enter the 6-digit code sent to {phone}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          value={otp}
          onChangeText={handleOtpChange}
          keyboardType="number-pad"
          maxLength={6}
          style={[
            styles.input,
            error ? styles.inputError : null,
            isVerifying ? styles.inputDisabled : null,
          ]}
          placeholder="000000"
          placeholderTextColor="#9CA3AF"
          editable={!isVerifying}
          autoFocus={true}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {isVerifying && <Text style={styles.verifyingText}>Verifying...</Text>}
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {isResendEnabled
            ? "Didn't receive the code?"
            : `Resend code in ${formatTimer(timer)}`}
        </Text>

        {isResendEnabled && (
          <TouchableOpacity
            onPress={handleResendOtp}
            style={styles.resendButton}
          >
            <Text style={styles.resendButtonText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Manual verify button for incomplete OTP */}
      {otp.length > 0 && otp.length < 6 && !isVerifying && (
        <Button
          onPress={() => verifyOtp(otp)}
          variant="outline"
          style={styles.verifyButton}
        >
          Verify OTP
        </Button>
      )}

      {/* Back button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Change Phone Number</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: "#111827",
  },
  subText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
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
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    fontWeight: "500",
  },
  verifyingText: {
    color: "#3B82F6",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    fontWeight: "500",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  timerText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 16,
  },
  resendButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  resendButtonText: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "600",
  },
  verifyButton: {
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  backButtonText: {
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "500",
  },
});
