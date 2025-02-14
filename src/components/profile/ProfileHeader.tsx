import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Avatar } from "@/components/ui/native/avatar";
import { Button } from "@/components/ui/native/button";
import { Play, Pause, Store, Settings } from "lucide-react-native";
import { router } from 'expo-router';
import { useState } from "react";
import { Dialog } from "@/components/ui/native/dialog";
import ProfileEditForm from "@/pages/profile/edit-form";
import { Audio } from 'expo-av';

interface ProfileHeaderProps {
  isPlaying: boolean;
  handlePlayVoice: () => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const dummyProfile = {
  name: "心の探求者",
  username: "seeker_of_heart",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
  bio: "地球での使命:人々の心に光を灯し、内なる平安への道を示すこと",
  bioAudioUrl: "https://s328.podbean.com/pb/4b3e15298687315db3070972aaa50fee/676f0aab/data1/fs91/20007750/uploads/6b592.m4a?pbss=abbaab44-f1dd-5725-bf73-452199e42c01",
  externalLink: "https://example.com/shop",
  pronouns: "they"
};

export function ProfileHeader({ isPlaying, handlePlayVoice }: ProfileHeaderProps) {
  const navigate = useNavigate();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(dummyProfile.bioAudioUrl);
    }

    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleProfileUpdate = () => {
    setIsEditDialogOpen(false);
    // TODO: Implement profile update logic
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center gap-8">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={toggleAudio}
          >
            {isAudioPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
            <span className="sr-only"><Text>音声を再生</Text></span>
          </Button>

          <Avatar className="h-24 w-24">
            <AvatarImage src={dummyProfile.image} />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => navigate("/shop")}
          >
            <Store className="h-6 w-6" />
            <span className="sr-only"><Text>ショップ</Text></span>
          </Button>
        </div>

        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold">{dummyProfile.name}</h1>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Settings className="h-4 w-4" />
              <span className="sr-only"><Text>プロフィールを編集</Text></span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">@{dummyProfile.username}</p>
          <p className="text-sm text-muted-foreground">ID: 123456789</p>
          <p className="text-muted-foreground max-w-md">
            {dummyProfile.bio}
          </p>
        </div>

        <div className="flex gap-8 border rounded-lg p-4 w-full max-w-md justify-between">
          <div className="text-center">
            <div className="font-bold">1.2k</div>
            <div className="text-sm text-muted-foreground"><Text>ファミリー</Text></div>
          </div>
          <div className="text-center">
            <div className="font-bold">890</div>
            <div className="text-sm text-muted-foreground"><Text>ウォッチ</Text></div>
          </div>
          <div className="text-center">
            <div className="font-bold">3.4k</div>
            <div className="text-sm text-muted-foreground"><Text>フォロー</Text></div>
          </div>
          <div className="text-center">
            <div className="font-bold">2.1k</div>
            <div className="text-sm text-muted-foreground"><Text>フォロワー</Text></div>
          </div>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md p-0">
          <ProfileEditForm
            profile={dummyProfile}
            onSubmit={handleProfileUpdate}
            onCancel={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
