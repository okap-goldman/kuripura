import { View, Text, StyleSheet } from 'react-native';
import { Card } from "@/components/ui/native/card";

interface Person {
  name: string;
  role: string;
  description: string;
}

interface RegionPeopleProps {
  people: Person[];
}

export function RegionPeople({ people }: RegionPeopleProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}><Text>活動する人々</Text></Text>
      <View style={styles.peopleList}>
        {people.map((person, index) => (
          <View key={index} style={styles.personCard}>
            <Text style={styles.name}>{person.name}</Text>
            <Text style={styles.role}>{person.role}</Text>
            <Text style={styles.description}>
              {person.description}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
  },
  description: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 8,
  },
  name: {
    fontWeight: '500',
  },
  peopleList: {
    gap: 16,
  },
  personCard: {
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  role: {
    color: '#6b7280',
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
});
