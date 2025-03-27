import { Redirect } from "expo-router";

export default function Index() {
  // This file is at app/index.tsx and will be the default entry point
  // Redirecting to get-started ensures it always shows first
  return <Redirect href="/get-started" />;
}
