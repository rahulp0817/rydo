import { useRouter } from "expo-router";
import { View } from "react-native";
import AdsContent from "./AdsContent";
import MenuDrawer from "./MenuDrawer";
import ProfileCard from "./ProfileCard";

const DrawerContent = () => {
  const router = useRouter();
  return (
    <View style={{ marginHorizontal: 10 }}>
      <ProfileCard/>
      <MenuDrawer/>
      <AdsContent/>
    </View>
  );
};

export default DrawerContent;
