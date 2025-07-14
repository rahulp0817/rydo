import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

const SerachHeader = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.serachContainer}>
      <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Ionicons name="menu" size={28} color="#1F2937" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  serachContainer: {
    borderWidth: 1,
    marginBottom: 24,
    marginHorizontal: 16,
    marginTop: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: "#9CA3AF"
  },
});
export default SerachHeader;
