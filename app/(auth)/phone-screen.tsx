import CustomHeader from "@/components/Header/CustomHeader";
import PhoneNumSkeleton from "@/components/Skeleton/PhoneNumSkeleton";
import { lazy, Suspense } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const PhoneNumScreen = lazy(
  () => import("@/components/Authentication/PhoneNumScreen")
);

const PhoneScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff"}}>
      <CustomHeader title="" showBackIcon={true} />
      <Suspense fallback={<PhoneNumSkeleton />}>
        <PhoneNumScreen />
      </Suspense>
    </SafeAreaView>
  );
};

export default PhoneScreen;
