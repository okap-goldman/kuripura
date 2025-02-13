import { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Button } from '@/components/ui/native/button';
import { Input } from '@/components/ui/native/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/native/tabs';
import { colors } from '@/lib/colors';
import { Search as SearchIcon, MessageCircle } from 'lucide-react-native';
import PostCard from '@/components/post/post-card';
import ChatMessage from './chat-message';

// モックデータ
const MOCK_SEARCH_RESULTS = [
  {
    id: '1',
    author: {
      name: '山田太郎',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    },
    content: {
      type: 'text' as const,
      text: '瞑想を通じて、自分の内なる声にもっと耳を傾けることの大切さを実感しました。',
    },
    createdAt: '2024-01-31 12:00',
    likes: 15,
    comments: 3,
    highlights: 2,
  },
];

const MOCK_CHAT_HISTORY = [
  {
    id: '1',
    role: 'user' as const,
    content: '目醒めとは何ですか？',
  },
  {
    id: '2',
    role: 'assistant' as const,
    content: '目醒めとは、自己の本質的な気づきや、より深い意識レベルへの到達を指します。日常生活の中で、自分自身や周囲との関係性について新たな理解や洞察を得ることも、目醒めの一つの形と言えます。\n\nあなたにとって、目醒めはどのような意味を持っていますか？',
  },
];

const SUGGESTED_QUESTIONS = [
  '目醒めを深めるためのおすすめの瞑想法は？',
  '他の人の目醒め体験を知りたい',
  '目醒めと日常生活の関係について',
];

export default function SearchPage() {
  const styles = StyleSheet.create({
    tabs: {
      marginTop: 16,
    },
    tabsList: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 4,
    },
    tabsTrigger: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      alignItems: 'center',
      borderRadius: 6,
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    activeTabText: {
      color: colors.background,
    },
    tabsContent: {
      marginTop: 24,
    },
    chatContainer: {
      backgroundColor: colors.background,
      borderRadius: 8,
      elevation: 2,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    chatHistory: {
      maxHeight: 600,
      minHeight: 400,
      padding: 16,
    },
    container: {
      backgroundColor: '#f9fafb',
      flex: 1,
      paddingBottom: 64,
      paddingTop: 64,
    },
    content: {
      paddingHorizontal: 16,
    },
    input: {
      flex: 1,
    },
    inputContainer: {
      borderTopColor: colors.border,
      borderTopWidth: 1,
      padding: 16,
    },
    inputWrapper: {
      flexDirection: 'row',
      gap: 8,
    },
    questionButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    remainingQuestions: {
      color: colors.textSecondary,
      fontSize: 14,
      marginTop: 8,
    },
    searchBar: {
      backgroundColor: '#f9fafb',
      borderBottomColor: '#e5e7eb',
      borderBottomWidth: 1,
      padding: 16,
    },
    searchForm: {
      flexDirection: 'row',
      gap: 8,
    },
    searchInput: {
      flex: 1,
    },
    suggestedQuestions: {
      borderTopColor: colors.border,
      borderTopWidth: 1,
      padding: 16,
    },
    suggestedQuestionsTitle: {
      color: colors.textSecondary,
      fontSize: 14,
      marginBottom: 8,
    },
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState(MOCK_CHAT_HISTORY);
  const [searchResults, setSearchResults] = useState(MOCK_SEARCH_RESULTS);
  const [activeTab, setActiveTab] = useState('chat');

  const handleSearch = () => {
    // TODO: Implement search
    console.log({ searchQuery });
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // TODO: Implement chat
    const newMessage = {
      id: String(Date.now()),
      role: 'user' as const,
      content: chatInput,
    };
    setChatHistory([...chatHistory, newMessage]);
    setChatInput('');
  };

  const handleSuggestedQuestion = (question: string) => {
    setChatInput(question);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 検索バー */}
        <View style={styles.searchBar}>
          <View style={styles.searchForm}>
            <Input
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="キーワードで検索"
              style={styles.searchInput}
            />
            <Button onPress={handleSearch}>
              <SearchIcon size={16} />
            </Button>
          </View>
        </View>

        {/* タブ付きコンテンツ */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="chat">
              AIチャット
            </TabsTrigger>
            <TabsTrigger value="search">
              検索結果
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" currentValue={activeTab}>
            <View style={styles.chatContainer}>
              {/* チャット履歴 */}
              <ScrollView style={styles.chatHistory}>
                {chatHistory.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </ScrollView>

              {/* サジェストされた質問 */}
              <View style={styles.suggestedQuestions}>
                <Text style={styles.suggestedQuestionsTitle}>おすすめの質問：</Text>
                <View style={styles.questionButtons}>
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <Button
                      key={question}
                      variant="outline"
                      size="sm"
                      onPress={() => handleSuggestedQuestion(question)}
                    >
                      <Text>{question}</Text>
                    </Button>
                  ))}
                </View>
              </View>

              {/* メッセージ入力 */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Input
                    value={chatInput}
                    onChangeText={setChatInput}
                    placeholder="質問を入力（1日5回まで）"
                    style={styles.input}
                  />
                  <Button onPress={handleSendMessage}>
                    <MessageCircle size={16} />
                  </Button>
                </View>
                <Text style={styles.remainingQuestions}>
                  残り質問回数: 3回
                </Text>
              </View>
            </View>
          </TabsContent>

          <TabsContent value="search" currentValue={activeTab}>
            <View style={styles.searchResults}>
              {searchResults.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </View>
          </TabsContent>
        </Tabs>
      </View>
    </View>
  );
}              