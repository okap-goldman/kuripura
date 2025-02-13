import { MapPin } from "lucide-react-native";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Card } from "@/components/ui/native/card";
import { Badge } from "@/components/ui/native/badge";
import { Select, SelectItem } from "@/components/ui/native/select";
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MapPin size={20} color="#000" />
          <Text style={styles.title}><Text>地域毎の活動状況</Text></Text>
        </View>
        
        <Select
          value={selectedRegion || undefined}
          onValueChange={setSelectedRegion}
          placeholder="地域を選択"
        >
          {REGIONS.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </Select>
      </View>

      <View style={styles.grid}>
        {REGIONS.map((region) => (
          <Pressable 
            key={region}
            onPress={() => setSelectedRegion(region)}
          >
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.regionName}>{region}</Text>
                <Badge variant="secondary">
                  {region === "関東" ? "活発" : "普通"}
                </Badge>
              </View>
              <Text style={styles.description}>
                {region === "関東" 
                  ? "多くのコミュニティ活動が行われています"
                  : "いくつかのコミュニティ活動が進行中です"}
              </Text>
            </Card>
          </Pressable>
        ))}
      </View>

      <RegionDetailView
        open={!!selectedRegion}
        onClose={() => setSelectedRegion(null)}
        region={selectedRegion || ""}
      />
    </View>
  );
}
