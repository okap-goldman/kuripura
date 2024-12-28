import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Post } from "@/components/Post";
import { SAMPLE_POSTS, SHOP_ITEMS } from "@/lib/data";

interface ProfileTabsProps {
  selectedTab: string;
  setSelectedPost: (post: any) => void;
  setSelectedShopItem: (item: any) => void;
}

export function ProfileTabs({ selectedTab, setSelectedPost, setSelectedShopItem }: ProfileTabsProps) {
  return (
    <Tabs value={selectedTab} className="mt-8">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="media">メディア</TabsTrigger>
        <TabsTrigger value="audio">音声</TabsTrigger>
        <TabsTrigger value="text">テキスト</TabsTrigger>
        <TabsTrigger value="highlights">ハイライト</TabsTrigger>
        <TabsTrigger value="events">イベント</TabsTrigger>
        <TabsTrigger value="shop">ショップ</TabsTrigger>
      </TabsList>

      <TabsContent value="media" className="mt-4">
        <div className="grid grid-cols-3 gap-1">
          {SAMPLE_POSTS.filter(post => post.mediaType === "image").map((post, index) => (
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
          <h3 className="font-medium">瞑想ワークショップ</h3>
          <p className="text-sm text-muted-foreground">2024年4月1日 14:00-16:00</p>
          <p className="mt-2">心の平安を見つける瞑想の基礎を学びましょう。</p>
        </Card>
      </TabsContent>

      <TabsContent value="shop" className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          {SHOP_ITEMS.map((item) => (
            <Card 
              key={item.id} 
              className="cursor-pointer"
              onClick={() => setSelectedShopItem(item)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full aspect-square object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">¥{item.price.toLocaleString()}</p>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}