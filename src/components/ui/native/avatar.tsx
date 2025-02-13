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
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 40,
  },
  fallback: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  fallbackText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
});
