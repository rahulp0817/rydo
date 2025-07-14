import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/AuthStore";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

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

      const dummyOtp = "123456";
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
    if (!isOtpVerified && otp.length === 6) {
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
    if (otp.length === 6 && !isOtpVerified && !isVerifying) {
      verifyOtp(otp);
    }
  }, [otp, isOtpVerified, isVerifying]);

  return (
    <View style={styles.otpcontainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Verify Details</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={styles.subText}>OTP sent to {phone}</Text>
          </View>
        </View>

        {/* Replaced native TextInput with OtpInput */}
        <View style={styles.inputContainer}>
          <OtpInput
            numberOfDigits={6}
            onTextChange={handleOtpChange}
            focusColor="rgba(116, 70, 243, 1)"
            autoFocus
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: "white",
                borderWidth: 1.5,
                borderColor:
                  otp.length === 4
                    ? "rgba(116, 70, 243, 1)"
                    : "rgba(204, 203, 205, 1)",
                borderRadius: 6,
                width: 54,
                height: 54,
              },
            }}
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
        {isOtpVerified ? "Submit" : isVerifying ? "Verifying..." : "Verify"}
      </Button>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  otpcontainer: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
    color: "#111827",
  },
  subText: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 16,
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
    marginBottom: 16,
    gap: 8,
  },
  timerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  resendButtonText: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "600",
  },
});
