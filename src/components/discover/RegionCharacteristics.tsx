import { Card } from "@/components/ui/card";

interface RegionCharacteristicsProps {
  characteristics: string;
}

export function RegionCharacteristics({ characteristics }: RegionCharacteristicsProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">地域の特色</h3>
      <p className="text-muted-foreground">{characteristics}</p>
    </Card>
  );
}