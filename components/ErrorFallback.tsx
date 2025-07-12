import { sendHelpWhatsAppNumber } from "@/utils/help";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function ErrorFallback({ error, resetError }: any) {
  const handleTalkToUs = async () => {
    sendHelpWhatsAppNumber();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🛵</Text>
        </View>

        <Text style={styles.title}>Something went off track</Text>

        <Text style={styles.subtitle}>
          Looks like we hit a speed bump. Don't worry we're working on it!
        </Text>

        {/*
        {error?.message && (
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessageLabel}>Error Details:</Text>
            <Text style={styles.errorMessage}>{error.message}</Text>
          </View>
        )} */}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={resetError}
          activeOpacity={0.9}
        >
          <Text style={styles.primaryButtonText}>Retry</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleTalkToUs}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>Talk to Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffce7",
    paddingHorizontal: 24,
    paddingTop: height * 0.12,
    paddingBottom: 32,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 400,
    alignSelf: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff4b3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    fontSize: 38,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e1e1e",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  errorMessageContainer: {
    width: "100%",
    backgroundColor: "#fff0f0",
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#ffcaca",
  },
  errorMessageLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#d00000",
    marginBottom: 6,
  },
  errorMessage: {
    fontSize: 13,
    color: "#7f1d1d",
    lineHeight: 20,
    fontFamily: "monospace",
  },
  primaryButton: {
    backgroundColor: "#FFD700", // Rapido Yellow
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    maxWidth: 280,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  secondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  secondaryButtonText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
