import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const REGIONS = [
  "北海道",
  "東北",
  "関東",
  "中部",
  "近畿",
  "中国",
  "四国",
  "九州・沖縄"
];

export const RegionalActivitySection = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("関東");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name="map" size={24} color="#007AFF" />
          <Text style={styles.title}>地域毎の活動状況</Text>
        </View>
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedRegion}
            onValueChange={(itemValue) => setSelectedRegion(itemValue)}
            style={styles.picker}
          >
            {REGIONS.map((region) => (
              <Picker.Item key={region} label={region} value={region} />
            ))}
          </Picker>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {REGIONS.map((region) => (
          <TouchableOpacity
            key={region}
            style={styles.regionCard}
            onPress={() => setSelectedRegion(region)}
          >
            <View style={styles.regionHeader}>
              <Text style={styles.regionName}>{region}</Text>
              <View style={[
                styles.badge,
                { backgroundColor: region === "関東" ? '#E3F2FD' : '#F5F5F5' }
              ]}>
                <Text style={[
                  styles.badgeText,
                  { color: region === "関東" ? '#1976D2' : '#666' }
                ]}>
                  {region === "関東" ? "活発" : "普通"}
                </Text>
              </View>
            </View>
            <Text style={styles.regionDescription}>
              {region === "関東"
                ? "多くのコミュニティ活動が行われています"
                : "いくつかのコミュニティ活動が進行中です"}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  pickerContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginTop: 8,
  },
  picker: {
    height: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  regionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  regionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  regionDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default RegionalActivitySection; 