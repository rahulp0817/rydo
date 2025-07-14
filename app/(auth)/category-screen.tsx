import CustomHeader from "@/components/Header/CustomHeader";
import PhoneNumSkeleton from "@/components/Skeleton/PhoneNumSkeleton";
import { lazy, Suspense } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const CategorySelect = lazy(
  () => import("@/components/Authentication/CategorySelect")
);

const CategoryScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff"}}>
      <CustomHeader title="" showBackIcon={true} />
      <Suspense fallback={<PhoneNumSkeleton />}>
        <CategorySelect />
      </Suspense>
    </SafeAreaView>
  );
};

export default CategoryScreen;
