import { getDefaultConfig } from 'expo/metro-config';
import { withNativeWind } from 'nativewind/metro';

const config = await getDefaultConfig(__dirname, {
  // Enable experimental features for Expo Router
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
});

export default withNativeWind(config, { input: './global.css' });