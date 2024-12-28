import { ThumbsUp } from "lucide-react";
import { Post } from "@/components/Post";

export function RecommendedPostsSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-5 h-5" />
        <h2 className="text-lg font-semibold">おすすめ投稿</h2>
      </div>

      <div className="space-y-4">
        <Post
          author={{
            name: "山田太郎",
            image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          }}
          content="シンプルな生活に移行して1ヶ月が経ちました。物を手放すことで心にも余裕が生まれ、新しい発見がたくさんありました。"
          type="family"
          mediaType="text"
        />
      </div>
    </div>
  );
}