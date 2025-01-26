import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useToast } from '../hooks/use-toast';
import { Avatar } from './ui/Avatar';
import { colors } from '../styles/theme';

export function Header() {
  const { toast } = useToast();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const handleLogin = () => {
    toast({
      title: 'お知らせ',
      description: '次回のアップデートでGoogleログインを実装予定です。',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>Kuripura</Text>
        
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowNotifications(true)}
          >
            <Feather name="bell" size={20} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowMessages(true)}
          >
            <Feather name="message-circle" size={20} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Feather name="user" size={16} color={colors.background} />
            <Text style={styles.loginText}>ログイン</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showNotifications}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotifications(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>通知</Text>
            <ScrollView style={styles.scrollArea}>
              {[1, 2, 3].map((i) => (
                <View key={i} style={styles.notificationItem}>
                  <Avatar
                    size={40}
                    source={{ uri: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}` }}
                  />
                  <View style={styles.notificationText}>
                    <Text style={styles.notificationMessage}>
                      ユーザー{i}があなたの投稿にいいねしました
                    </Text>
                    <Text style={styles.notificationTime}>1時間前</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showMessages}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMessages(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>メッセージ</Text>
            <ScrollView style={styles.scrollArea}>
              {[1, 2, 3].map((i) => (
                <TouchableOpacity key={i} style={styles.messageItem}>
                  <Avatar
                    size={40}
                    source={{ uri: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}` }}
                  />
                  <View style={styles.messageText}>
                    <Text style={styles.userName}>ユーザー{i}</Text>
                    <Text style={styles.lastMessage}>最新のメッセージ...</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: 44, // iOS status bar
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  loginText: {
    color: colors.background,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollArea: {
    maxHeight: 400,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 12,
    borderRadius: 8,
  },
  notificationText: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 14,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 12,
    borderRadius: 8,
  },
  messageText: {
    flex: 1,
  },
  userName: {
    fontWeight: '500',
  },
  lastMessage: {
    fontSize: 14,
    color: colors.mutedForeground,
  },
}); 