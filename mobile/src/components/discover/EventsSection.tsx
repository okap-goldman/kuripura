import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../styles/theme';
import { Dialog } from '../ui/dialog';

interface Event {
  title: string;
  date: string;
  location: string;
  price: string;
  capacity: string;
  image: string;
}

const SAMPLE_EVENTS: Event[] = [
  {
    title: '集団瞑想会',
    date: '2024年4月15日 10:00-12:00',
    location: '渋谷区瞑想センター',
    price: '¥2,000',
    capacity: '定員10名',
    image: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83',
  },
  {
    title: 'チャクラ開放ワークショップ',
    date: '2024年4月16日 14:00-16:00',
    location: '新宿区ヨガスタジオ',
    price: '¥3,500',
    capacity: '定員15名',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
  },
  {
    title: '目醒めシェアリングサークル',
    date: '2024年4月17日 19:00-21:00',
    location: '目黒区コミュニティセンター',
    price: '¥1,500',
    capacity: '定員12名',
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a',
  },
  {
    title: 'スピリチュアルヒーリング体験会',
    date: '2024年4月18日 13:00-15:00',
    location: '池袋区カルチャーセンター',
    price: '¥4,000',
    capacity: '定員8名',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
  },
];

export function EventsSection() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Feather name="calendar" size={20} color={colors.text} />
          <Text style={styles.title}>イベント</Text>
        </View>

        <View style={styles.actions}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={16} color={colors.textMuted} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="イベントを検索"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {/* フィルター機能 */}}
          >
            <Feather name="filter" size={16} color={colors.text} />
            <Text style={styles.buttonText}>フィルター</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setShowCreateDialog(true)}
          >
            <Feather name="plus" size={16} color={colors.background} />
            <Text style={styles.createButtonText}>イベントを企画</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featuredEvent}>
        <Text style={styles.sectionTitle}>注目のイベント</Text>
        <View style={styles.featuredImageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800' }}
            style={styles.featuredImage}
          />
        </View>
        <View style={styles.featuredContent}>
          <Text style={styles.eventTitle}>シアターワーク体験会</Text>
          <Text style={styles.eventDate}>2024年4月20日 14:00-16:00</Text>
          <Text style={styles.eventLocation}>青梅市文化会館</Text>
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>参加費無料</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>定員20名</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.eventsList}>
        {SAMPLE_EVENTS.map((event, index) => (
          <TouchableOpacity
            key={index}
            style={styles.eventCard}
            onPress={() => setSelectedEvent(event)}
          >
            <View style={styles.eventImageContainer}>
              <Image
                source={{ uri: event.image }}
                style={styles.eventImage}
              />
            </View>
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
              <Text style={styles.eventLocation}>{event.location}</Text>
              <View style={styles.badges}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{event.price}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{event.capacity}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Dialog
        visible={!!selectedEvent}
        onDismiss={() => setSelectedEvent(null)}
        title={selectedEvent?.title}
        content={
          <View style={styles.eventDetail}>
            <Image
              source={{ uri: selectedEvent?.image }}
              style={styles.detailImage}
            />
            <View style={styles.detailContent}>
              <View>
                <Text style={styles.detailSectionTitle}>イベント詳細</Text>
                <Text style={styles.detailDescription}>
                  瞑想を通じて、心の平安とマインドフルネスを体験するワークショップです。
                  初心者の方も安心してご参加いただけます。
                </Text>
              </View>
              <View style={styles.detailGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>開催日時</Text>
                  <Text style={styles.detailValue}>{selectedEvent?.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>場所</Text>
                  <Text style={styles.detailValue}>{selectedEvent?.location}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>参加費</Text>
                  <Text style={styles.detailValue}>{selectedEvent?.price}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>定員</Text>
                  <Text style={styles.detailValue}>{selectedEvent?.capacity}</Text>
                </View>
              </View>
              <View style={styles.detailActions}>
                <TouchableOpacity style={styles.detailButton}>
                  <Text style={styles.detailButtonText}>詳細を見る</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.detailButton, styles.primaryButton]}>
                  <Text style={styles.primaryButtonText}>参加する</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />

      <Dialog
        visible={showCreateDialog}
        onDismiss={() => setShowCreateDialog(false)}
        title="新しいイベントを企画"
        content={
          <View style={styles.createForm}>
            {/* フォームの内容は実際のアプリケーションの要件に応じて実装 */}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
  header: {
    gap: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  actions: {
    gap: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: colors.text,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    color: colors.text,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 14,
    color: colors.background,
  },
  featuredEvent: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  featuredImageContainer: {
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredContent: {
    gap: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  eventDate: {
    fontSize: 14,
    color: colors.textMuted,
  },
  eventLocation: {
    fontSize: 14,
    color: colors.text,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  badge: {
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  eventsList: {
    flex: 1,
  },
  eventCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eventImageContainer: {
    aspectRatio: 16 / 9,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  eventContent: {
    padding: 16,
    gap: 8,
  },
  eventDetail: {
    gap: 16,
  },
  detailImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  detailContent: {
    gap: 16,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  detailDescription: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 8,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailItem: {
    flex: 1,
    minWidth: '45%',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  detailValue: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  detailActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  detailButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundLight,
  },
  detailButtonText: {
    fontSize: 14,
    color: colors.text,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: colors.background,
  },
  createForm: {
    gap: 16,
  },
});

export default EventsSection; 