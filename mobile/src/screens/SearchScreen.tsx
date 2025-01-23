import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ChatMessage } from '../components/chat/ChatMessage';

const SUGGESTED_QUESTIONS = [
  "子どもとの適切な関わり方は？",
  "目醒めとは何ですか？",
  "瞑想の始め方を教えてください",
  "マインドフルネスの実践方法は？",
];

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<Array<{ isAi: boolean; message: string }>>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsChatMode(true);
    setMessages(prev => [...prev, { isAi: false, message: searchQuery }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        isAi: true, 
        message: "あなたはどう思いますか？この質問についてのあなたの考えを聞かせてください。" 
      }]);
    }, 1000);

    setSearchQuery('');
  };

  const handleQuestionClick = (question: string) => {
    setSearchQuery(question);
    handleSearch();
  };

  if (isChatMode) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.chatContainer}>
          {messages.map((msg, index) => (
            <ChatMessage key={index} isAi={msg.isAi} message={msg.message} />
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="メッセージを入力..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Ionicons name="send" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="検索キーワードや質問を入力"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>
      <View style={styles.suggestedContainer}>
        <Text style={styles.suggestedTitle}>おすすめの質問</Text>
        <ScrollView>
          {SUGGESTED_QUESTIONS.map((question, index) => (
            <TouchableOpacity
              key={index}
              style={styles.questionButton}
              onPress={() => handleQuestionClick(question)}
            >
              <Ionicons name="chatbubble-outline" size={20} color="#666" />
              <Text style={styles.questionText}>{question}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  suggestedContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  suggestedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  questionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  questionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  chatContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  searchButton: {
    padding: 8,
  },
});

export default SearchScreen; 