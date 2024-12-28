import { MapPin } from "lucide-react";
import { useState } from "react";
import { JapanMap3D } from "./JapanMap3D";
import { RegionDetailView } from "./RegionDetailView";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RegionalActivitySection() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        <h2 className="text-lg font-semibold">地域毎の活動状況</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="aspect-[4/3] bg-muted rounded-lg relative overflow-hidden">
          <JapanMap3D onRegionSelect={(region) => setSelectedRegion(region)} />
        </div>

        <Card className="p-4">
          <h3 className="font-medium mb-4">注目の地域：関東</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Badge variant="secondary">NEW</Badge>
              <div>
                <h4 className="font-medium">青梅市でシアターワーク開催</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  地域コミュニティの活性化を目指す新しい取り組みが始まっています。
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Badge variant="secondary">TREND</Badge>
              <div>
                <h4 className="font-medium">都心部での瞑想会が増加中</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  平日の朝に開催される瞑想会が人気を集めています。
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <RegionDetailView
        open={!!selectedRegion}
        onClose={() => setSelectedRegion(null)}
        region={selectedRegion || ""}
      />
    </div>
  );
}