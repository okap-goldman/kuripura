import { BarChart, LineChart } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AnalysisSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BarChart className="w-5 h-5" />
        <h2 className="text-lg font-semibold">分析</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4 space-y-2">
          <h3 className="font-medium">あなたの目醒め状況</h3>
          <p className="text-sm text-muted-foreground">
            最近のアクティビティから、あなたは「気づき」のフェーズにいます。
          </p>
          <div className="text-sm bg-muted/50 p-3 rounded-md">
            ワンポイントアドバイス：不安を感じたら、使わずに手放すことを徹底するのがオススメです！
          </div>
        </Card>

        <Card className="p-4 space-y-2">
          <h3 className="font-medium">全体のトレンド</h3>
          <p className="text-sm text-muted-foreground">
            目醒め人達の間で「シンプルな生活への移行」が注目されています。
          </p>
        </Card>
      </div>
    </div>
  );
}