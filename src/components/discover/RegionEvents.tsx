import { View, Text, StyleSheet } from 'react-native';
import { Button } from "@/components/ui/native/button";
import { Card } from "@/components/ui/native/card";

export function RegionEvents() {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}><Text>イベント</Text></Text>
      <View style={styles.eventList}>
        <View style={styles.eventCard}>
          <View style={styles.eventHeader}>
            <View>
              <Text style={styles.eventTitle}><Text>集団瞑想会</Text></Text>
              <Text style={styles.eventDate}><Text>2024年4月20日</Text></Text>
            </View>
            <Button variant="outline" onPress={() =><Text> {}}>参加する</Text></Button>
          </View>
          <Text style={styles.eventDescription}>
            地域の皆さんと共に、深い瞑想体験を共有します。
          </Text>
        </View>
        
        <View style={styles.eventCard}>
          <View style={styles.eventHeader}>
            <View>
              <Text style={styles.eventTitle}><Text>目醒めシェアリングサークル</Text></Text>
              <Text style={styles.eventDate}><Text>2024年4月25日</Text></Text>
            </View>
            <Button variant="outline" onPress={() =><Text> {}}>参加する</Text></Button>
          </View>
          <Text style={styles.eventDescription}>
            それぞれの気づきや学びを分かち合う場を設けます。
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
  },
  eventCard: {
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  eventDate: {
    color: '#6b7280',
    fontSize: 14,
  },
  eventDescription: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 8,
  },
  eventHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventList: {
    gap: 16,
  },
  eventTitle: {
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
});
