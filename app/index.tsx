import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Page = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  return isSignedIn ? (
    <Redirect href="/(root)/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/welcome" />
  );
};

export default Page;
