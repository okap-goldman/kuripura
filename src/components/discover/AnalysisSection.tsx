import { BarChart, LightbulbIcon, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { AnalysisDetailView } from "./AnalysisDetailView";

export function AnalysisSection() {
  const [showDetailView, setShowDetailView] = useState(false);

  return (
    <div className="space-y-8">
      <div className="space-y-6 bg-pink-50/50 p-6 rounded-lg">
        <div className="flex items-center gap-2">
          <BarChart className="w-5 h-5 text-pink-500" />
          <h2 className="text-lg font-semibold"><Text>あなたのクローズアップ</Text></h2>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2"><Text>直近の目醒めのサマリー</Text></h3>
            <p className="text-muted-foreground">
              最近、あなたは「家族との対話」に目が向き始めています。特に以下の点で成長が見られます：
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 text-muted-foreground">
              <li><Text>家族との対話時間が増加傾向</Text></li>
              <li><Text>感情表現がより豊かに</Text></li>
              <li><Text>相手の立場に立った考え方の増加</Text></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2"><Text>目醒めの提案</Text></h3>
            <p className="text-muted-foreground mb-3"><Text>こんなチャレンジはいかがでしょう？</Text></p>
            <div className="space-y-3">
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

      <div className="space-y-6 bg-blue-50/50 p-6 rounded-lg">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold"><Text>全体のクローズアップ</Text></h2>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium"><Text>みんなの気づきのトレンド</Text></h3>
          <p className="text-muted-foreground">
            多くの人が以下のような点に気づき始めています：
          </p>
          
          <div className="space-y-3">
            <div className="p-4 bg-blue-100/50 rounded-lg">
              <h4 className="font-medium text-blue-900"><Text>家族との関係</Text></h4>
              <p className="text-sm text-blue-900/80 mt-1">
                コミュニケーションの質を高めることに注目が集まっています
              </p>
            </div>
            
            <div className="p-4 bg-indigo-100/50 rounded-lg">
              <h4 className="font-medium text-indigo-900"><Text>苦手なことへの向き合い方</Text></h4>
              <p className="text-sm text-indigo-900/80 mt-1">
                小さなステップから始める方法が支持されています
              </p>
            </div>
            
            <div className="p-4 bg-violet-100/50 rounded-lg">
              <h4 className="font-medium text-violet-900"><Text>自己理解の深化</Text></h4>
              <p className="text-sm text-violet-900/80 mt-1">
                感情の変化を観察し、理解を深める取り組みが増えています
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnalysisDetailView 
        open={showDetailView} 
        onClose={() => setShowDetailView(false)} 
      />
    </div>
  );
}