import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../Header/CustomHeader";
import DrawerContent from "./DrawerContent";

export default function CustomDrawerNavigation() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <CustomHeader title="Menu" showBackIcon={true} />
      </View>
      <DrawerContentScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <DrawerContent />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}
