import CustomHeader from "@/components/Header/CustomHeader";
import PhoneNumSkeleton from "@/components/Skeleton/PhoneNumSkeleton";
import { lazy, Suspense } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const OTPScreen = lazy(
  () => import("@/components/Authentication/OTPScreen")
);

const OtpScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff"}}>
      <CustomHeader title="" showBackIcon={true} />
      <Suspense fallback={<PhoneNumSkeleton />}>
        <OTPScreen />
      </Suspense>
    </SafeAreaView>
  );
};

export default OtpScreen;
