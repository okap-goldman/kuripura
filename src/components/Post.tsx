import { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "@/components/ui/native/card";
import { PostHeader } from "./post/PostHeader";
import { PostContent } from "./post/PostContent";
import { PostActions } from "./post/PostActions";
import { PostComments } from "./post/PostComments";
import { Dialog } from "@/components/ui/native/dialog";

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
    <Card style={styles.card}>
      <PostHeader author={author} />
      
      <TouchableOpacity 
        onPress={() => mediaType !== "text" && mediaType !== "audio" && setShowFullPost(true)}
        disabled={mediaType === "text" || mediaType === "audio"}
      >
        <PostContent
          content={content}
          caption={caption}
          mediaType={mediaType}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </TouchableOpacity>

      <PostActions
        postId="1"
        onComment={() => setShowComments(true)}
      />

      <Dialog visible={showComments} onDismiss={() => setShowComments(false)}>
        <View style={styles.dialogContent}>
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
        </View>
      </Dialog>

      <Dialog visible={showFullPost} onDismiss={() => setShowFullPost(false)}>
        <View style={styles.dialogContent}>
          <View style={styles.fullPostContent}>
            <PostContent
              content={content}
              mediaType={mediaType}
              isExpanded={true}
              setIsExpanded={setIsExpanded}
            />
            <View style={styles.fullPostDetails}>
              <PostHeader author={author} />
              {caption && (
                <Text style={styles.caption}>{caption}</Text>
              )}
              <PostActions
                postId="1"
                onComment={() => setShowComments(true)}
              />
            </View>
          </View>
        </View>
      </Dialog>
    </Card>
  );
}
