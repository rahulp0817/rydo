import SerachHeader from "@/components/Header/SearchHeader";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <SerachHeader/>
      <Button
        title="Open Drawer"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    </SafeAreaView>
  );
}
