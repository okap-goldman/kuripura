import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Play, Pause } from "lucide-react";

interface ProfileHeaderProps {
  isPlaying: boolean;
  handlePlayVoice: () => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export function ProfileHeader({
  isPlaying,
  handlePlayVoice,
  selectedTab,
  setSelectedTab,
}: ProfileHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder-avatar.jpg" alt="プロフィール画像" />
          <AvatarFallback>KZ</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">かずき</h1>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handlePlayVoice}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-muted-foreground">
            目醒め人として活動中。新しい発見を共有していきます。
          </p>
        </div>
      </div>
    </div>
  );
} 