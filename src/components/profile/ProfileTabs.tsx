import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Card } from "@/components/ui/native/card";
import { Post } from "@/components/Post";
import { SAMPLE_POSTS } from "@/lib/data";

interface ProfileTabsProps {
  selectedTab: string;
  setSelectedPost: (post: PostType) => void;
  setSelectedShopItem?: (item: PostType) => void;
}

// Define the post type to match the data structure
type PostType = {
  author: {
    name: string;
    image: string;
    id: string;
  };
  content: string;
  caption?: string;
  mediaType: "text" | "image" | "video" | "audio";
};

export function ProfileTabs({ selectedTab, setSelectedPost }: ProfileTabsProps) {
  return (
    <Tabs defaultValue={selectedTab} className="mt-8">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="media"><Text>メディア</Text></TabsTrigger>
        <TabsTrigger value="audio"><Text>音声</Text></TabsTrigger>
        <TabsTrigger value="text"><Text>テキスト</Text></TabsTrigger>
        <TabsTrigger value="highlights"><Text>ハイライト</Text></TabsTrigger>
        <TabsTrigger value="events"><Text>イベント</Text></TabsTrigger>
      </TabsList>

      <TabsContent value="media" className="mt-4">
        <div className="grid grid-cols-3 gap-1">
          {SAMPLE_POSTS.filter((post: PostType) => post.mediaType === "image").map((post, index) => (
            <Card 
              key={index} 
              className="aspect-square overflow-hidden cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
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
          {SAMPLE_POSTS.filter((post: PostType) => post.mediaType === "audio").map((post, index) => (
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
          {SAMPLE_POSTS.filter((post: PostType) => post.mediaType === "text").map((post, index) => (
            <div key={index} onClick={() => setSelectedPost(post)}>
              <Post {...post} />
            </div>
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
          <h3 className="font-medium"><Text>瞑想ワークショップ</Text></h3>
          <p className="text-sm text-muted-foreground"><Text>2024年4月1日 14:00-16:00</Text></p>
          <p className="mt-2"><Text>心の平安を見つける瞑想の基礎を学びましょう。</Text></p>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
