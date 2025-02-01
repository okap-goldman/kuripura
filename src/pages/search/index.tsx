import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search as SearchIcon, MessageCircle } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState(MOCK_CHAT_HISTORY);
  const [searchResults, setSearchResults] = useState(MOCK_SEARCH_RESULTS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search
    console.log({ searchQuery });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      <div className="container mx-auto px-4">
        {/* 検索バー */}
        <div className="sticky top-16 bg-gray-50 py-4 z-10">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="キーワードで検索"
              className="flex-1"
            />
            <Button type="submit">
              <SearchIcon className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* タブ付きコンテンツ */}
        <Tabs defaultValue="chat" className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="chat" className="flex-1">
              AIチャット
            </TabsTrigger>
            <TabsTrigger value="search" className="flex-1">
              検索結果
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-6">
            <div className="bg-white rounded-lg shadow-sm">
              {/* チャット履歴 */}
              <div className="p-4 space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto">
                {chatHistory.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>

              {/* サジェストされた質問 */}
              <div className="p-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">おすすめの質問：</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <Button
                      key={question}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* メッセージ入力 */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="質問を入力（1日5回まで）"
                    className="flex-1"
                  />
                  <Button type="submit">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  残り質問回数: 3回
                </p>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="search" className="mt-6">
            <div className="space-y-4">
              {searchResults.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 