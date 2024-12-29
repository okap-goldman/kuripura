import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface RegionSpecialtiesProps {
  specialties: string[];
}

export function RegionSpecialties({ specialties }: RegionSpecialtiesProps) {
  const { toast } = useToast();

  const handlePurchase = (item: string) => {
    toast({
      title: "カートに追加しました",
      description: `${item}をカートに追加しました。`,
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">名産品</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specialties.map((specialty, index) => (
          <Card key={index} className="p-4">
            <div className="aspect-square bg-muted rounded-lg mb-4" />
            <h4 className="font-medium mb-2">{specialty}</h4>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">¥3,800</span>
              <Button
                size="sm"
                onClick={() => handlePurchase(specialty)}
                className="gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                購入
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}