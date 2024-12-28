import { MapPin } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function RegionalActivitySection() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        <h2 className="text-lg font-semibold">地域毎の活動状況</h2>
      </div>

      <div className="aspect-[4/3] bg-muted rounded-lg relative">
        {/* This is a placeholder for the actual map implementation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">日本地図が表示されます</p>
        </div>
      </div>

      <Dialog open={!!selectedRegion} onOpenChange={() => setSelectedRegion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRegion}の活動状況</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm">
              {selectedRegion === "関東" && "青梅市でシアターワークが開催されました！"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}