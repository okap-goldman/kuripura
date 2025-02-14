import { ArrowLeft, Bell, Bookmark, MessageCircle, Settings } from "lucide-react-native";
import { Button } from "@/components/ui/native/button";
import { Dialog } from "@/components/ui/native/dialog";

interface AnalysisDetailViewProps {
  open: boolean;
  onClose: () => void;
}

export function AnalysisDetailView({ open, onClose }: AnalysisDetailViewProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0">
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-xl font-bold"><Text>あなたのクローズアップ</Text></h2>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bookmark className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold"><Text>直近の目醒めのサマリー</Text></h3>
              <p className="text-muted-foreground">
                最近、あなたは「家族との対話」に目が向き始めています。特に以下の点で成長が見られます：
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><Text>家族との対話時間が増加傾向</Text></li>
                <li><Text>感情表現がより豊かに</Text></li>
                <li><Text>相手の立場に立った考え方の増加</Text></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold"><Text>目醒めの提案</Text></h3>
              <p className="text-muted-foreground"><Text>こんなチャレンジはいかがでしょう？</Text></p>
              <div className="space-y-4">
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-medium text-pink-600"><Text>苦手な親戚に手紙を書いてみる</Text></h4>
                  <p className="text-sm text-pink-600/80 mt-1">
                    直接の対話が難しい場合、手紙から始めるのもよい方法です
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-600"><Text>家族との食事時間を設定する</Text></h4>
                  <p className="text-sm text-purple-600/80 mt-1">
                    週に1回でも、ゆっくりと話せる時間を作ってみましょう
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
