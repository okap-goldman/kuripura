import { Card } from "@/components/ui/card";

interface Person {
  name: string;
  role: string;
  description: string;
}

interface RegionPeopleProps {
  people: Person[];
}

export function RegionPeople({ people }: RegionPeopleProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">活動する人々</h3>
      <div className="space-y-4">
        {people.map((person, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h4 className="font-medium">{person.name}</h4>
            <p className="text-sm text-accent-foreground">{person.role}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {person.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}