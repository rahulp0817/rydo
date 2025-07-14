import { lazy, Suspense } from "react";
const OnboardingScreen = lazy(
  () => import("@/components/Authentication/OnboardingScreen")
);

const AuthScreen = () => {
  return (
    <Suspense fallback={<></>}>
      <OnboardingScreen />
    </Suspense>
  );
};

export default AuthScreen;
