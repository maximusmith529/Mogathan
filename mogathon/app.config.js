
import 'dotenv/config';

export default{
  expo: {
    name: "mogathon",
    slug: "mogathon",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
      web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      // Add your extra configs here
      visionKey: process.env.REACT_NATIVE_VISION_API_KEY,
      openAiKey: process.env.REACT_NATIVE_GPT_API_KEY
    }

  }
}
