import CustomDrawerNativation from "@/components/Navigation/CustomDrawerNavigation";
import { Drawer } from "expo-router/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <Drawer
      drawerContent={() => <CustomDrawerNativation />}
      screenOptions={{
        headerShown: false,
        lazy: true,
        swipeEnabled: false,
        drawerType: "front",
        drawerStyle: {
          width: "100%",
          backgroundColor: "#EEF1F4",
        },
      }}
    >
      <Drawer.Screen name="index" options={{ drawerLabel: "index" }} />
    </Drawer>
  );
}
