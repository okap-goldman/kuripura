import { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Dialog } from "@/components/ui/native/dialog";
import { FooterNav } from "@/components/FooterNav";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { Post } from "@/components/Post";
import { PostType } from "@/types/post";

interface ShopItem {
  image: string;
  name: string;
  description: string;
  price: number;
}

const Profile = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTab, setSelectedTab] = useState("media");
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [selectedShopItem, setSelectedShopItem] = useState<ShopItem | null>(null);

  const handlePlayVoice = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement voice playback logic
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        isPlaying={isPlaying}
        handlePlayVoice={handlePlayVoice}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <ProfileTabs
        selectedTab={selectedTab}
        setSelectedPost={setSelectedPost}
        setSelectedShopItem={setSelectedShopItem}
      />

      {/* Post Dialog */}
      <Dialog visible={!!selectedPost} onDismiss={() => setSelectedPost(null)}>
        <View style={styles.dialogContent}>
          {selectedPost?.mediaType === "image" ? (
            <Image
              source={{ uri: selectedPost.content }}
              style={styles.image}
            />
          ) : (
            selectedPost && <Post {...selectedPost} />
          )}
        </View>
      </Dialog>

      {/* Shop Item Dialog */}
      <Dialog visible={!!selectedShopItem} onDismiss={() => setSelectedShopItem(null)}>
        <View style={styles.dialogContent}>
          {selectedShopItem && (
            <View style={styles.shopItemContent}>
              <Image
                source={{ uri: selectedShopItem.image }}
                style={styles.image}
              />
              <Text style={styles.itemTitle}>{selectedShopItem.name}</Text>
              <Text style={styles.itemDescription}>{selectedShopItem.description}</Text>
              <Text style={styles.itemPrice}><Text>¥{selectedShopItem.price.toLocaleString()}</Text></Text>
            </View>
          )}
        </View>
      </Dialog>

      <FooterNav />
    </View>
  );
};

export default Profile;
