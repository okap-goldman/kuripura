export default {
  name: 'Kuripura',
  slug: 'kuripura',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    }
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    firebaseApiKey: process.env.VITE_FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.VITE_FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.VITE_FIREBASE_APP_ID,
    firebaseMeasurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
  }
};
