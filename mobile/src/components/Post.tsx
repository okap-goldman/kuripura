import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import { Avatar } from './ui/Avatar';

interface PostProps {
  author: {
    name: string;
    image: string;
  };
  content: string;
  image?: string;
  testID?: string;
  likes?: number;
  comments?: number;
  shares?: number;
}

const screenWidth = Dimensions.get('window').width;

export function Post({ author, content, image, testID, likes = 0, comments = 0, shares = 0 }: PostProps) {
  const [showFullPost, setShowFullPost] = useState(false);
  const [liked, setLiked] = useState(false);

  const renderContent = () => {
    if (image) {
      return (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      );
    }

    return (
      <Text style={styles.content}>{content}</Text>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Avatar source={{ uri: author.image }} size={40} />
      <View style={styles.authorInfo}>
        <Text style={styles.authorName}>{author.name}</Text>
        <Text style={styles.timestamp}>2時間前</Text>
      </View>
    </View>
  );

  const renderActions = () => (
    <View style={styles.actions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => setLiked(!liked)}
      >
        <Feather
          name="heart"
          size={20}
          color={liked ? colors.primary : colors.text}
        />
        <Text style={styles.actionText}>{likes}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Feather name="message-circle" size={20} color={colors.text} />
        <Text style={styles.actionText}>{comments}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Feather name="share-2" size={20} color={colors.text} />
        <Text style={styles.actionText}>{shares}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container} testID={testID}>
      {renderHeader()}
      <TouchableOpacity
        onPress={() => image && setShowFullPost(true)}
        activeOpacity={image ? 0.8 : 1}
      >
        {renderContent()}
      </TouchableOpacity>
      {renderActions()}

      <Modal
        visible={showFullPost}
        animationType="fade"
        onRequestClose={() => setShowFullPost(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            <Image
              source={{ uri: image }}
              style={styles.fullImage}
              resizeMode="contain"
            />
            <View style={styles.modalContent}>
              {renderHeader()}
              {renderActions()}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    marginLeft: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  timestamp: {
    fontSize: 14,
    color: colors.textMuted,
  },
  content: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalContent: {
    padding: 12,
  },
  fullImage: {
    width: screenWidth,
    height: screenWidth,
  },
});