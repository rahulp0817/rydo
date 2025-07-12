import Spinner from "@/components/ui/spinner";
import { lazy, Suspense } from "react";

const OnboardingScreen = lazy(
  () => import("@/components/Authentication/OnboardingScreen")
);
const AuthScreen = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <OnboardingScreen />
    </Suspense>
  );
};

export default AuthScreen;
