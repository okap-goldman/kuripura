import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface RegionDetailViewProps {
  open: boolean;
  onClose: () => void;
  region: string;
}

const REGIONS_DATA = {
  "北海道・東北": {
    description: "自然豊かな地域での活動",
    activeUsers: "234",
  },
  "関東": {
    description: "都市部でのコミュニティ活動",
    activeUsers: "567",
  },
  "中部": {
    description: "伝統と革新の調和",
    activeUsers: "345",
  },
  "近畿": {
    description: "歴史ある地域での取り組み",
    activeUsers: "456",
  },
  "中国・四国": {
    description: "地域に根ざした活動",
    activeUsers: "234",
  },
  "九州・沖縄": {
    description: "島々をつなぐ活動",
    activeUsers: "345",
  }
};

export function RegionDetailView({ open, onClose, region }: RegionDetailViewProps) {
  const regionData = REGIONS_DATA[region as keyof typeof REGIONS_DATA];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0">
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-xl font-bold">{region}の地域情報</h2>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="hover:bg-destructive/10 transition-colors"
            >
              <X className="w-5 h-5" />
              <span className="sr-only">閉じる</span>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-pink-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-pink-600">65%</div>
              <div className="text-sm text-pink-600/80">参加率</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{regionData?.activeUsers || 0}</div>
              <div className="text-sm text-blue-600/80">活動中のボランティア</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-purple-600/80">進行中のプロジェクト</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">今後のイベント</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">地域清掃イベント</h4>
                    <p className="text-sm text-muted-foreground">2023年12月20日</p>
                  </div>
                  <Button size="sm">参加する</Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  地域の公園と周辺道路の清掃活動を行います。
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">子育て支援セミナー</h4>
                    <p className="text-sm text-muted-foreground">2023年12月25日</p>
                  </div>
                  <Button size="sm">参加する</Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  地域の子育て支援についての意見交換会を開催します。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">活動報告</h3>
            <div className="space-y-4">
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-medium">コミュニティミーティング報告</h4>
                <p className="text-sm text-muted-foreground">2023年12月1日</p>
                <p className="text-sm mt-2">
                  新しい子育てサポートプランについて話し合いました。
                </p>
              </div>

              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-medium">高齢者支援活動報告</h4>
                <p className="text-sm text-muted-foreground">2023年12月5日</p>
                <p className="text-sm mt-2">
                  地域の高齢者宅への訪問活動を実施しました。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">必要とされていること</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">高齢者向け移動支援</h4>
                  <Badge variant="destructive">緊急</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  買い物や通院の際の移動支援ボランティアが必要です。
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">子どもの学習支援</h4>
                  <Badge variant="secondary">中程度</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  放課後の学習支援ボランティアを募集しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}