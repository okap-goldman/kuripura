import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PostHeader } from "./post/PostHeader";
import { PostContent } from "./post/PostContent";
import { PostActions } from "./post/PostActions";
import { PostComments } from "./post/PostComments";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PostProps {
  author: {
    name: string;
    image: string;
    id: string;
  };
  content: string;
  caption?: string;
  mediaType: "text" | "image" | "video" | "audio";
}

export function Post({ author, content, caption, mediaType }: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showFullPost, setShowFullPost] = useState(false);

  return (
    <Card className="p-4 space-y-4">
      <PostHeader author={author} />
      
      <div 
        onClick={() => mediaType !== "text" && setShowFullPost(true)}
        className={mediaType !== "text" ? "cursor-pointer" : ""}
      >
        <PostContent
          content={content}
          caption={caption}
          mediaType={mediaType}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </div>

      <PostActions
        postId="1"
        onComment={() => setShowComments(true)}
      />

      <Dialog open={showComments} onOpenChange={setShowComments}>
        <DialogContent>
          <PostComments
            postId="1"
            comments={[
              {
                id: "1",
                author: {
                  name: "テストユーザー",
                  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=test",
                },
                content: "素晴らしい投稿ですね！",
                createdAt: new Date().toISOString(),
              },
            ]}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showFullPost} onOpenChange={setShowFullPost}>
        <DialogContent className="max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PostContent
              content={content}
              mediaType={mediaType}
              isExpanded={true}
              setIsExpanded={setIsExpanded}
            />
            <div className="space-y-4">
              <PostHeader author={author} />
              {caption && (
                <p className="text-sm whitespace-pre-wrap">{caption}</p>
              )}
              <PostActions
                postId="1"
                onComment={() => setShowComments(true)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}