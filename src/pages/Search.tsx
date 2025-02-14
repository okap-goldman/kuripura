import { useState } from "react";
import { View, TextInput, ScrollView, StyleSheet, Text } from "react-native";
import { Button } from "@/components/ui/native/button";
// import { useToast } from "@/hooks/use-toast";
import { Search as SearchIcon, MessageSquare } from "lucide-react-native";
import { ChatMessage } from "@/components/chat/ChatMessage";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
    flexDirection: 'row',
    padding: 16,
  },
  messageList: {
    flex: 1,
  },
  questionButton: {
    marginBottom: 8,
  },
  questionButtonContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  questionText: {
    color: '#374151',
    fontSize: 14,
  },
  questionsList: {
    maxHeight: 400,
  },
  searchContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  searchIcon: {
    left: 12,
    position: 'absolute',
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 40,
    paddingVertical: 12,
  },
  suggestedQuestionsContainer: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  suggestedQuestionsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
});

const SUGGESTED_QUESTIONS = [
  "子どもとの適切な関わり方は？",
  "目醒めとは何ですか？",
  "瞑想の始め方を教えてください",
  "マインドフルネスの実践方法は？",
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
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

    setSearchQuery("");
  };

  const handleQuestionClick = (question: string) => {
    setSearchQuery(question);
    handleSearch();
  };

  if (isChatMode) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.messageList}>
          <View style={styles.messageList}>
            {messages.map((msg, index) => (
              <ChatMessage key={index} isAi={msg.isAi} message={msg.message} />
            ))}
          </View>
        </ScrollView>
        <View style={styles.inputContainer}>
          <SearchIcon style={styles.searchIcon} size={16} color="#666" />
          <TextInput
            placeholder="メッセージを入力..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            style={styles.input}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchIcon style={styles.searchIcon} size={16} color="#666" />
        <TextInput
          placeholder="検索キーワードや質問を入力"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.suggestedQuestionsContainer}>
        <Text style={styles.suggestedQuestionsTitle}><Text>おすすめの質問</Text></Text>
        <ScrollView style={styles.questionsList}>
          {SUGGESTED_QUESTIONS.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              onPress={() => handleQuestionClick(question)}
              containerStyle={styles.questionButton}
            >
              <View style={styles.questionButtonContent}>
                <MessageSquare size={16} color="#666" />
                <Text style={styles.questionText}>{question}</Text>
              </View>
            </Button>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
