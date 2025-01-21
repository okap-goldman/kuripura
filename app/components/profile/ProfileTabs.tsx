import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";

interface ProfileTabsProps {
  selectedTab: string;
  setSelectedPost: (post: any) => void;
  setSelectedShopItem: (item: any) => void;
}

export function ProfileTabs({
  selectedTab,
  setSelectedPost,
  setSelectedShopItem,
}: ProfileTabsProps) {
  const dummyPosts = [
    {
      id: 1,
      mediaType: "image",
      content: "/placeholder-post.jpg",
    },
    {
      id: 2,
      mediaType: "image",
      content: "/placeholder-post.jpg",
    },
  ];

  const dummyShopItems = [
    {
      id: 1,
      name: "サンプル商品1",
      description: "これはサンプル商品の説明です。",
      price: 1000,
      image: "/placeholder-shop-item.jpg",
    },
    {
      id: 2,
      name: "サンプル商品2",
      description: "これはサンプル商品の説明です。",
      price: 2000,
      image: "/placeholder-shop-item.jpg",
    },
  ];

  return (
    <Tabs value={selectedTab} className="mt-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="media">メディア</TabsTrigger>
        <TabsTrigger value="shop">ショップ</TabsTrigger>
        <TabsTrigger value="likes">いいね</TabsTrigger>
      </TabsList>
      <ScrollArea className="h-[calc(100vh-24rem)]">
        <TabsContent value="media" className="mt-6">
          <div className="grid grid-cols-3 gap-1">
            {dummyPosts.map((post) => (
              <Card
                key={post.id}
                className="aspect-square cursor-pointer overflow-hidden"
                onClick={() => setSelectedPost(post)}
              >
                <img
                  src={post.content}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="shop" className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            {dummyShopItems.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer overflow-hidden"
                onClick={() => setSelectedShopItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ¥{item.price.toLocaleString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="likes" className="mt-6">
          <p className="text-center text-muted-foreground">
            まだいいねした投稿はありません。
          </p>
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
} 