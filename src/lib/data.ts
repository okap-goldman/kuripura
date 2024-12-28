export const SAMPLE_POSTS = [
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

export const SHOP_ITEMS = [
  {
    id: 1,
    name: "瞑想ガイドブック",
    price: 2500,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    description: "初心者から上級者まで、瞑想の深い理解と実践をサポートするガイドブック",
  },
];