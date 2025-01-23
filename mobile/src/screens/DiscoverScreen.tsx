import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AnalysisSection } from '../components/discover/AnalysisSection';
import { RegionalActivitySection } from '../components/discover/RegionalActivitySection';
import { EventsSection } from '../components/discover/EventsSection';
import { RecommendedPostsSection } from '../components/discover/RecommendedPostsSection';

type Section = 'main' | 'analysis' | 'regional' | 'events' | 'recommended';

export const DiscoverScreen = () => {
  const [currentSection, setCurrentSection] = useState<Section>('main');

  const renderSection = () => {
    switch (currentSection) {
      case 'analysis':
        return <AnalysisSection />;
      case 'regional':
        return <RegionalActivitySection />;
      case 'events':
        return <EventsSection />;
      case 'recommended':
        return <RecommendedPostsSection />;
      default:
        return (
          <View style={styles.gridContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => setCurrentSection('analysis')}
            >
              <Ionicons name="analytics-outline" size={24} color="#333" />
              <Text style={styles.cardTitle}>分析</Text>
              <Text style={styles.cardDescription}>
                あなたの目醒め状況を分析し、アドバイスを提供します
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => setCurrentSection('regional')}
            >
              <Ionicons name="map-outline" size={24} color="#333" />
              <Text style={styles.cardTitle}>地域毎の活動状況</Text>
              <Text style={styles.cardDescription}>
                各地域での活動状況や注目のイベントをチェック
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => setCurrentSection('events')}
            >
              <Ionicons name="calendar-outline" size={24} color="#333" />
              <Text style={styles.cardTitle}>イベント</Text>
              <Text style={styles.cardDescription}>
                目醒め人が企画するイベントを探す・企画する
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => setCurrentSection('recommended')}
            >
              <Ionicons name="heart-outline" size={24} color="#333" />
              <Text style={styles.cardTitle}>おすすめ投稿</Text>
              <Text style={styles.cardDescription}>
                あなたにおすすめの投稿をピックアップ
              </Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {currentSection !== 'main' && (
          <TouchableOpacity
            onPress={() => setCurrentSection('main')}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>
          {currentSection === 'main' ? '発見' : ''}
        </Text>
      </View>
      
      <ScrollView style={styles.content}>
        {renderSection()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  gridContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
  },
});

export default DiscoverScreen; 