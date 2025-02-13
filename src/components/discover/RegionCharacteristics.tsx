import { View, Text, StyleSheet } from 'react-native';
import { Card } from "@/components/ui/native/card";

interface RegionCharacteristicsProps {
  characteristics: string;
}

export function RegionCharacteristics({ characteristics }: RegionCharacteristicsProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}><Text>地域の特色</Text></Text>
      <Text style={styles.description}>{characteristics}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
  },
  description: {
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
});
