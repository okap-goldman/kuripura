import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface FollowButtonProps {
  userId: number;
  initialFollowStatus?: {
    isFollowing: boolean;
    followType: "family" | "watch";
  };
  onFollow?: (followType: "family" | "watch", reason?: string) => void;
  onUnfollow?: (reason: string) => void;
}

export function FollowButton({
  userId,
  initialFollowStatus,
  onFollow,
  onUnfollow,
}: FollowButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [followType, setFollowType] = useState<"family" | "watch">("watch");

  const handleFollow = () => {
    if (followType === "family" && !reason) {
      return;
    }

    onFollow?.(followType, reason);
    setIsDialogOpen(false);
    setReason("");
  };

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        variant={initialFollowStatus?.isFollowing ? "secondary" : "default"}
        className="w-32"
      >
        {initialFollowStatus?.isFollowing ? "フォロー中" : "フォロー"}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>フォロー種別を選択</DialogTitle>
          </DialogHeader>

          <div className="flex gap-4 justify-center py-4">
            <Button
              variant={followType === "family" ? "default" : "outline"}
              onClick={() => setFollowType("family")}
              className="w-32"
            >
              ファミリー
            </Button>
            <Button
              variant={followType === "watch" ? "default" : "outline"}
              onClick={() => setFollowType("watch")}
              className="w-32"
            >
              ウォッチ
            </Button>
          </div>

          {followType === "family" && (
            <div className="space-y-2">
              <Textarea
                placeholder="フォロー理由を入力（必須）"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                ※ファミリーフォローの場合、理由が相手に通知されます
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleFollow}
              disabled={followType === "family" && !reason}
            >
              フォローする
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
