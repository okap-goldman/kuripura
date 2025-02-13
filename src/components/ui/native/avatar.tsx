import { View, Image, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface AvatarProps {
  source?: { uri?: string };
  fallback?: string;
  style?: StyleProp<ViewStyle>;
}

export const Avatar = ({ source, fallback, style }: AvatarProps) => {
  return (
    <View style={[styles.container, style]}>
      {source?.uri ? (
        <Image source={source} style={styles.image} />
      ) : (
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>
            {fallback?.[0] || '?'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
});
