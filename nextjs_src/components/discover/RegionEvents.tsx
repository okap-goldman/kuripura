import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function RegionEvents() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">イベント</h3>
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
    </Card>
  );
}