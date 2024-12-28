import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnalysisSection } from "@/components/discover/AnalysisSection";
import { RegionalActivitySection } from "@/components/discover/RegionalActivitySection";
import { EventsSection } from "@/components/discover/EventsSection";
import { RecommendedPostsSection } from "@/components/discover/RecommendedPostsSection";

export default function Discover() {
  return (
    <div className="container pb-24 pt-4 space-y-6">
      <h1 className="text-2xl font-bold">発見</h1>
      
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-6 pb-8">
          <Card className="p-4">
            <AnalysisSection />
          </Card>

          <Card className="p-4">
            <RegionalActivitySection />
          </Card>

          <Card className="p-4">
            <EventsSection />
          </Card>

          <Card className="p-4">
            <RecommendedPostsSection />
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}