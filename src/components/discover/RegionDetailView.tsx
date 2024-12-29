import { X } from "lucide-react";
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
    description: "大自然の中での瞑想と気づき",
    activeUsers: "234",
  },
  "関東": {
    description: "都市部でのマインドフルネス実践",
    activeUsers: "567",
  },
  "中部": {
    description: "伝統と現代的な目醒めの融合",
    activeUsers: "345",
  },
  "近畿": {
    description: "古都での精神性の探求",
    activeUsers: "456",
  },
  "中国・四国": {
    description: "地域に根ざした心の癒し",
    activeUsers: "234",
  },
  "九州・沖縄": {
    description: "島々のエネルギーと調和",
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
            <h2 className="text-xl font-bold">{region}の目醒め情報</h2>
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
              <div className="text-sm text-pink-600/80">目醒め率</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{regionData?.activeUsers || 0}</div>
              <div className="text-sm text-blue-600/80">活動中の目醒め人</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-purple-600/80">進行中の目醒めプロジェクト</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">今後のイベント</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">集団瞑想会</h4>
                    <p className="text-sm text-muted-foreground">2024年4月20日</p>
                  </div>
                  <Button size="sm">参加する</Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  地域の皆さんと共に、深い瞑想体験を共有します。
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">目醒めシェアリングサークル</h4>
                    <p className="text-sm text-muted-foreground">2024年4月25日</p>
                  </div>
                  <Button size="sm">参加する</Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  それぞれの気づきや学びを分かち合う場を設けます。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">活動報告</h3>
            <div className="space-y-4">
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-medium">目醒めコミュニティミーティング</h4>
                <p className="text-sm text-muted-foreground">2024年4月1日</p>
                <p className="text-sm mt-2">
                  新しい意識の高め方について、深い対話を行いました。
                </p>
              </div>

              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-medium">心の解放ワークショップ</h4>
                <p className="text-sm text-muted-foreground">2024年4月5日</p>
                <p className="text-sm mt-2">
                  内なる制限から解放されるための実践を行いました。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">必要とされていること</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">瞑想ガイド</h4>
                  <Badge variant="destructive">緊急</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  初心者向けの瞑想ガイドができる方を募集しています。
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">目醒めメンター</h4>
                  <Badge variant="secondary">募集中</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  個別サポートができるメンターを募集しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}