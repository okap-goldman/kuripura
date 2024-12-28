import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, ShoppingBag } from "lucide-react";

interface ProfileHeaderProps {
  isPlaying: boolean;
  handlePlayVoice: () => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export function ProfileHeader({ isPlaying, handlePlayVoice, selectedTab, setSelectedTab }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex items-center gap-8">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handlePlayVoice}
        >
          <Play className={isPlaying ? "hidden" : "h-6 w-6"} />
          <span className="sr-only">Play introduction</span>
        </Button>

        <Avatar className="h-24 w-24">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>

        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full"
          onClick={() => setSelectedTab(selectedTab === "shop" ? "media" : "shop")}
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="sr-only">Shop</span>
        </Button>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">心の探求者</h1>
        <p className="text-sm text-muted-foreground">@seeker_of_heart</p>
        <p className="text-sm text-muted-foreground">ID: 123456789</p>
        <p className="text-muted-foreground max-w-md">
          地球での使命：人々の心に光を灯し、内なる平安への道を示すこと
        </p>
      </div>

      <div className="flex gap-8">
        <div className="space-y-1">
          <div className="text-center">
            <div className="font-bold">1.2k</div>
            <div className="text-sm text-muted-foreground">ファミリー</div>
          </div>
          <div className="text-center">
            <div className="font-bold">3.4k</div>
            <div className="text-xs text-muted-foreground">フォロワー</div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-center">
            <div className="font-bold">890</div>
            <div className="text-sm text-muted-foreground">ウォッチ</div>
          </div>
          <div className="text-center">
            <div className="font-bold">2.1k</div>
            <div className="text-xs text-muted-foreground">フォロワー</div>
          </div>
        </div>
      </div>
    </div>
  );
}