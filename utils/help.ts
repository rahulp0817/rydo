import * as Clipboard from "expo-clipboard";
import { Alert, Linking, Platform } from "react-native";

export const sendHelpWhatsAppNumber = async (
  phoneWithCountryCode: string = "918123586129",
  msg: string = "Facing Issue in Rydo App!"
) => {
  let mobile =
    Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
  if (mobile) {
    if (msg) {
      let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
      Linking.openURL(url)
        .then((data) => {})
        .catch(() => {
          Alert.alert("Make sure WhatsApp installed on your device");
        });
    } else {
      Alert.alert("Please insert message to send");
    }
  } else {
    Alert.alert("Please insert mobile no");
  }
};

export const handleCopyText = async (text: any, e: any) => {
  e.stopPropagation();
  try {
    await Clipboard.setStringAsync(text);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
