import { MapPin } from "lucide-react";
import { useState } from "react";
import { JapanMap3D } from "./JapanMap3D";
import { RegionDetailView } from "./RegionDetailView";

export function RegionalActivitySection() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        <h2 className="text-lg font-semibold">地域毎の活動状況</h2>
      </div>

      <div className="aspect-[4/3] bg-muted rounded-lg relative overflow-hidden">
        <JapanMap3D onRegionSelect={(region) => setSelectedRegion(region)} />
      </div>

      <RegionDetailView
        open={!!selectedRegion}
        onClose={() => setSelectedRegion(null)}
        region={selectedRegion || ""}
      />
    </div>
  );
}