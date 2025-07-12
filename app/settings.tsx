import SerachHeader from "@/components/Header/SearchHeader";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/AuthStore";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const logOut = useAuthStore((s) => s.logOut);
  return (
    <SafeAreaView>
      <SerachHeader />
      <Button onPress={logOut}>
        <Text className="text-base text-white">LogOut</Text>
      </Button>
    </SafeAreaView>
  );
}
