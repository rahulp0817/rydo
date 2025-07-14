import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../ui/button";
import CustomPhoneInput from "../ui/input/CustomPhoneInput";

const PhoneNumScreen = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const hasNavigatedRef = useRef(false);

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
    const numericText = text.replace(/[^0-9]/g, "");
    setPhone(numericText);
    setError("");

    if (text.length === 10 && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      // @ts-ignore
      navigation.navigate("otp-screen", { phone: `+91${text}` });
    } else if (numericText.length < 10) {
      hasNavigatedRef.current = false;
    }
  };

  return (
    <View style={styles.phoneContainer}>
      <View>
        <Text style={styles.title}>Enter Your Phone Number</Text>
        <CustomPhoneInput
          // label="Enter Phone Number"
          value={phone}
          onChangeText={handleChangeText}
          error={error}
          keyboardType="number-pad"
          required
        />
      </View>

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
    paddingVertical: 10,
    marginTop: 20
  },
  buttonWrapper: {
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 6,
  }
});

export default PhoneNumScreen;
