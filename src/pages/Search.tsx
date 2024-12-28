import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Search as SearchIcon, User, FileText, Settings, MessageSquare } from "lucide-react";

const SUGGESTED_QUESTIONS = [
  "子どもとの適切な関わり方は？",
  "目醒めとは何ですか？",
  "瞑想の始め方を教えてください",
  "マインドフルネスの実践方法は？",
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Temporary toast for demonstration
    toast({
      title: "Coming soon!",
      description: "検索機能は次のアップデートで実装予定です。",
    });
  };

  const handleQuestionClick = (question: string) => {
    setSearchQuery(question);
    // Temporary toast for demonstration
    toast({
      title: "Coming soon!",
      description: "AI質問機能は次のアップデートで実装予定です。",
    });
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 pt-20 pb-24">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="検索またはAIに質問"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">すべて</TabsTrigger>
            <TabsTrigger value="users">ユーザー</TabsTrigger>
            <TabsTrigger value="posts">投稿</TabsTrigger>
            <TabsTrigger value="ai">AI質問</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
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
          </TabsContent>

          <TabsContent value="users" className="mt-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>ユーザーを検索</span>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="mt-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>投稿を検索</span>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="mt-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span>AIに質問または設定の変更</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                1日5回まで質問できます。設定の変更も可能です。
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}