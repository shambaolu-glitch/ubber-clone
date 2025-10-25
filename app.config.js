import "dotenv/config";

export default {
  expo: {
    name: "uber",
    slug: "uber",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#2F80ED",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "server",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      [
        "expo-router",
        {
          origin: "https://uber.dev/",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
      EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY:
        process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      eas: {
        projectId: "c46ce7ed-0ad8-429f-b2ef-cfcd36ff42be",
      },
    },
  },
};
