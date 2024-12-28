import { MapPin } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegionDetailView } from "./RegionDetailView";

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

      <RegionDetailView
        open={!!selectedRegion}
        onClose={() => setSelectedRegion(null)}
        region={selectedRegion || ""}
      />
    </div>
  );
}