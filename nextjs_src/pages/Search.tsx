import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Search as SearchIcon, MessageSquare } from "lucide-react";
import { ChatMessage } from "@/components/chat/ChatMessage";

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
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
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
    handleSearch(new Event('submit') as any);
  };

  if (isChatMode) {
    return (
      <div className="container max-w-3xl mx-auto px-4 pt-20 pb-24">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-0 divide-y">
            {messages.map((msg, index) => (
              <ChatMessage key={index} isAi={msg.isAi} message={msg.message} />
            ))}
          </div>
        </ScrollArea>
        <form onSubmit={handleSearch} className="fixed bottom-24 left-0 right-0 bg-background p-4">
          <div className="container max-w-3xl mx-auto relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="メッセージを入力..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 pt-20 pb-24">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="検索キーワードや質問を入力"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3">おすすめの質問</h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {SUGGESTED_QUESTIONS.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => handleQuestionClick(question)}
                >
                  <MessageSquare className="h-4 w-4" />
                  {question}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </form>
    </div>
  );
}