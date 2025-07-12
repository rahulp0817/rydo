import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../ui/button";
import CustomPhoneInput from "../ui/input/CustomPhoneInput";

const PhoneNumScreen = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const hasNavigatedRef = useRef(false); // Prevent multiple auto navigations

  const navigation = useNavigation();

  const handleNext = () => {
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setError("");
    hasNavigatedRef.current = true;
    // @ts-ignore
    navigation.navigate("otp-screen", { phone: `+91${phone}` });
  };

  const handleChangeText = (text: string) => {
    setPhone(text);
    setError("");

    if (text.length === 10 && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      // @ts-ignore
      navigation.navigate("otp-screen", { phone: `+91${text}` });
    } else if (text.length < 10) {
      hasNavigatedRef.current = false; // reset if user deletes digits
    }
  };

  return (
    <View style={styles.phoneContainer}>
      <CustomPhoneInput
        label="Enter Phone Number"
        value={phone}
        onChangeText={handleChangeText}
        error={error}
        required
      />

      <View style={styles.buttonWrapper}>
        <Button onPress={handleNext}>Next</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  phoneContainer: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
});

export default PhoneNumScreen;
