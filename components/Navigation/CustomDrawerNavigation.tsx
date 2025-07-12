import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View } from "react-native";
import CustomHeader from "../Header/CustomHeader";
import DrawerContent from "./DrawerContent";

export default function CustomDrawerNavigation() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 40 }}>
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
    </View>
  );
}
