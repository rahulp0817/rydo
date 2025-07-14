import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/AuthStore";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const logOut = useAuthStore((s) => s.logOut);
  return (
    <SafeAreaView>
      <Button onPress={logOut}>
        <Text className="text-base text-white">LogOut</Text>
      </Button>
    </SafeAreaView>
  );
}
