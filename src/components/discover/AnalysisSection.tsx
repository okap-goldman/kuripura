import { BarChart, LightbulbIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { AnalysisDetailView } from "./AnalysisDetailView";

export function AnalysisSection() {
  const [showDetailView, setShowDetailView] = useState(false);

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

        <Card className="p-4 space-y-4">
          <div>
            <h3 className="font-medium">全体のトレンド</h3>
            <p className="text-sm text-muted-foreground mt-1">
              目醒め人達の間で注目されているトピック
            </p>
          </div>
          
          <div className="grid gap-2">
            <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-md">
              <div className="text-2xl font-bold text-purple-600">1</div>
              <div>
                <div className="font-medium text-purple-900">シンプルな生活</div>
                <div className="text-sm text-purple-600">先週比 +45%</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div>
                <div className="font-medium text-blue-900">瞑想習慣</div>
                <div className="text-sm text-blue-600">先週比 +30%</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-pink-50 rounded-md">
              <div className="text-2xl font-bold text-pink-600">3</div>
              <div>
                <div className="font-medium text-pink-900">自然との調和</div>
                <div className="text-sm text-pink-600">先週比 +60%</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <AnalysisDetailView 
        open={showDetailView} 
        onClose={() => setShowDetailView(false)} 
      />
    </div>
  );
}