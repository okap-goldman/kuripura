import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AnalysisSection = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="analytics" size={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>あなたの気づきの分析</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>最近の気づきのパターン</Text>
          <Text style={styles.cardDescription}>
            瞑想の深さが増してきています。特に朝の瞑想で効果を感じられているようです。
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="people" size={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>全体のクローズアップ</Text>
        </View>
        <Text style={styles.subtitle}>みんなの気づきのトレンド</Text>
        <Text style={styles.description}>
          多くの人が以下のような点に気づき始めています：
        </Text>

        <View style={[styles.insightCard, { backgroundColor: '#E3F2FD' }]}>
          <Text style={styles.insightTitle}>家族との関係</Text>
          <Text style={styles.insightDescription}>
            コミュニケーションの質を高めることに注目が集まっています
          </Text>
        </View>

        <View style={[styles.insightCard, { backgroundColor: '#E8EAF6' }]}>
          <Text style={styles.insightTitle}>苦手なことへの向き合い方</Text>
          <Text style={styles.insightDescription}>
            小さなステップから始める方法が支持されています
          </Text>
        </View>

        <View style={[styles.insightCard, { backgroundColor: '#EDE7F6' }]}>
          <Text style={styles.insightTitle}>自己理解の深化</Text>
          <Text style={styles.insightDescription}>
            感情の変化を観察し、理解を深める取り組みが増えています
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: '#333',
  },
});

export default AnalysisSection; 