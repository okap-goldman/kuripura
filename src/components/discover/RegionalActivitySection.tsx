import { MapPin } from "lucide-react";
import { useState } from "react";
import { JapanMap3D } from "./JapanMap3D";
import { RegionDetailView } from "./RegionDetailView";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const REGIONS = [
  "北海道",
  "東北",
  "関東",
  "中部",
  "近畿",
  "中国",
  "四国",
  "九州・沖縄"
];

export function RegionalActivitySection() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>("関東");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <h2 className="text-lg font-semibold">地域毎の活動状況</h2>
        </div>
        
        <Select value={selectedRegion || undefined} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="地域を選択" />
          </SelectTrigger>
          <SelectContent>
            {REGIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">マップ</TabsTrigger>
          <TabsTrigger value="list">リスト</TabsTrigger>
        </TabsList>
        <TabsContent value="map">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="aspect-[4/3] bg-muted rounded-lg relative overflow-hidden">
              <JapanMap3D onRegionSelect={(region) => setSelectedRegion(region)} />
            </div>

            <Card className="p-4">
              <h3 className="font-medium mb-4">注目の地域：{selectedRegion || "関東"}</h3>
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
        </TabsContent>
        <TabsContent value="list">
          <div className="grid gap-4">
            {REGIONS.map((region) => (
              <Card 
                key={region}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedRegion(region)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{region}</h3>
                  <Badge variant="secondary">
                    {region === "関東" ? "活発" : "普通"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {region === "関東" 
                    ? "多くのコミュニティ活動が行われています"
                    : "いくつかのコミュニティ活動が進行中です"}
                </p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <RegionDetailView
        open={!!selectedRegion}
        onClose={() => setSelectedRegion(null)}
        region={selectedRegion || ""}
      />
    </div>
  );
}