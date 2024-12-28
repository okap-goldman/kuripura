import { BarChart, LightbulbIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnalysisDetailView } from "./AnalysisDetailView";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function AnalysisSection() {
  const [showDetailView, setShowDetailView] = useState(false);
  const [showTrendView, setShowTrendView] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BarChart className="w-5 h-5" />
        <h2 className="text-lg font-semibold">分析</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card 
          className="p-4 space-y-2 cursor-pointer hover:bg-muted/50 transition-colors" 
          onClick={() => setShowDetailView(true)}
        >
          <h3 className="font-medium">あなたの目醒め状況</h3>
          <p className="text-sm text-muted-foreground">
            最近のアクティビティから、あなたは「気づき」のフェーズにいます。
          </p>
          <div className="text-sm bg-muted/50 p-3 rounded-md">
            ワンポイントアドバイス：不安を感じたら、使わずに手放すことを徹底するのがオススメです！
          </div>
        </Card>

        <Card 
          className="p-4 space-y-2 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setShowTrendView(true)}
        >
          <h3 className="font-medium">全体のトレンド</h3>
          <p className="text-sm text-muted-foreground">
            目醒め人達の間で「シンプルな生活への移行」が注目されています。
          </p>
        </Card>
      </div>

      <AnalysisDetailView 
        open={showDetailView} 
        onClose={() => setShowDetailView(false)} 
      />

      <Dialog open={showTrendView} onOpenChange={setShowTrendView}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>全体のトレンド</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
                <h4 className="font-medium text-purple-700">トップトレンド</h4>
                <p className="text-2xl font-bold text-purple-900 mt-2">シンプルな生活</p>
                <p className="text-sm text-purple-600 mt-1">先週比 +45%</p>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
                <h4 className="font-medium text-blue-700">注目の話題</h4>
                <p className="text-2xl font-bold text-blue-900 mt-2">瞑想習慣</p>
                <p className="text-sm text-blue-600 mt-1">先週比 +30%</p>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-pink-50 to-red-50">
                <h4 className="font-medium text-pink-700">急上昇中</h4>
                <p className="text-2xl font-bold text-pink-900 mt-2">自然との調和</p>
                <p className="text-sm text-pink-600 mt-1">先週比 +60%</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">トレンドの詳細分析</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">シンプルな生活への移行</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    多くのユーザーが物を手放し、必要最小限の生活を目指す傾向が強まっています。
                    特に20-30代の都市部在住者の間で顕著な傾向が見られます。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">瞑想習慣の定着</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    毎日の瞑想を習慣化する人が増加中。平均的な瞑想時間は15分程度で、
                    朝の時間帯に実施する人が多いようです。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">自然との調和を目指す動き</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    都市部での生活においても、植物を育てたり自然の中で過ごす時間を
                    積極的に取り入れる傾向が強まっています。
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}