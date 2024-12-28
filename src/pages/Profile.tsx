import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Play, Link, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Post } from "@/components/Post";

const SAMPLE_POSTS = [
  {
    author: {
      name: "心の探求者",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    },
    content: "私は最近、瞑想の素晴らしさについて深く考えています。毎日の瞑想実践を通じて、心の平安と内なる気づきを得ることができました。",
    type: "family" as const,
    mediaType: "text" as const,
  },
  {
    author: {
      name: "光の使者",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    },
    content: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    caption: "新しい技術との出会いは、いつも心を躍らせてくれます。",
    type: "watch" as const,
    mediaType: "image" as const,
  },
  {
    author: {
      name: "心の探求者",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    },
    content: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1736943442",
    caption: "新しい瞑想ガイダンスです",
    type: "family" as const,
    mediaType: "audio" as const,
  },
];

const Profile = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVoice = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement voice playback logic
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-6">
        {/* Icon Section */}
        <div className="flex items-center gap-8">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={handlePlayVoice}
          >
            <Play className={isPlaying ? "hidden" : "h-6 w-6"} />
            <span className="sr-only">Play introduction</span>
          </Button>

          <Avatar className="h-24 w-24">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>

          <Button variant="outline" size="icon" className="rounded-full">
            <ShoppingBag className="h-6 w-6" />
            <span className="sr-only">Shop</span>
          </Button>
        </div>

        {/* Bio Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">心の探求者</h1>
          <p className="text-sm text-muted-foreground">@seeker_of_heart</p>
          <p className="text-muted-foreground max-w-md">
            地球での使命：人々の心に光を灯し、内なる平安への道を示すこと
          </p>
        </div>

        {/* Followers Section */}
        <div className="flex gap-8">
          <div className="space-y-1">
            <div className="text-center">
              <div className="font-bold">1.2k</div>
              <div className="text-sm text-muted-foreground">ファミリー</div>
            </div>
            <div className="text-center">
              <div className="font-bold">3.4k</div>
              <div className="text-xs text-muted-foreground">フォロワー</div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-center">
              <div className="font-bold">890</div>
              <div className="text-sm text-muted-foreground">ウォッチ</div>
            </div>
            <div className="text-center">
              <div className="font-bold">2.1k</div>
              <div className="text-xs text-muted-foreground">フォロワー</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="media" className="mt-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="media">メディア</TabsTrigger>
          <TabsTrigger value="audio">音声</TabsTrigger>
          <TabsTrigger value="text">テキスト</TabsTrigger>
          <TabsTrigger value="highlights">ハイライト</TabsTrigger>
          <TabsTrigger value="events">イベント</TabsTrigger>
        </TabsList>

        <TabsContent value="media" className="mt-4">
          <div className="grid grid-cols-3 gap-1">
            {SAMPLE_POSTS.filter(post => post.mediaType === "image").map((post, index) => (
              <Card key={index} className="aspect-square overflow-hidden">
                <img
                  src={post.content}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audio" className="mt-4">
          <div className="space-y-4">
            {SAMPLE_POSTS.filter(post => post.mediaType === "audio").map((post, index) => (
              <Card key={index} className="p-4">
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={post.content}
                  className="rounded-md"
                />
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="text" className="mt-4">
          <div className="space-y-4">
            {SAMPLE_POSTS.filter(post => post.mediaType === "text").map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="highlights" className="mt-4">
          <div className="space-y-4">
            {SAMPLE_POSTS.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-4">
          <Card className="p-4">
            <h3 className="font-medium">瞑想ワークショップ</h3>
            <p className="text-sm text-muted-foreground">2024年4月1日 14:00-16:00</p>
            <p className="mt-2">心の平安を見つける瞑想の基礎を学びましょう。</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;