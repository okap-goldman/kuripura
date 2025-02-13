import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from "@/components/ui/native/card";
import { AnalysisSection } from "@/components/discover/AnalysisSection";
import { RegionalActivitySection } from "@/components/discover/RegionalActivitySection";
import { EventsSection } from "@/components/discover/EventsSection";
import { RecommendedPostsSection } from "@/components/discover/RecommendedPostsSection";
import { useState } from "react";
import { ChevronLeft } from "lucide-react-native";
import { Button } from "@/components/ui/native/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/native/tabs";

type Section = "main" | "analysis" | "regional" | "events" | "recommended";

export default function Discover() {
  const [currentSection, setCurrentSection] = useState<Section>("main");

  const renderSection = () => {
    switch (currentSection) {
      case "analysis":
        return (
          <Card style={styles.sectionCard}>
            <AnalysisSection />
          </Card>
        );
      case "regional":
        return (
          <Card style={styles.sectionCard}>
            <RegionalActivitySection />
          </Card>
        );
      case "events":
        return (
          <Card style={styles.sectionCard}>
            <EventsSection />
          </Card>
        );
      case "recommended":
        return (
          <Card style={styles.sectionCard}>
            <RecommendedPostsSection />
          </Card>
        );
      default:
        return (
          <View style={styles.grid}>
            <TouchableOpacity onPress={() => setCurrentSection("analysis")}>
              <Card style={styles.gridCard}>
                <Text style={styles.cardTitle}>分析</Text>
                <Text style={styles.cardDescription}>
                  あなたの目醒め状況を分析し、アドバイスを提供します
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCurrentSection("regional")}>
              <Card style={styles.gridCard}>
                <Text style={styles.cardTitle}>地域毎の活動状況</Text>
                <Text style={styles.cardDescription}>
                  各地域での活動状況や注目のイベントをチェック
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCurrentSection("events")}>
              <Card style={styles.gridCard}>
                <Text style={styles.cardTitle}>イベント</Text>
                <Text style={styles.cardDescription}>
                  目醒め人が企画するイベントを探す・企画する
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCurrentSection("recommended")}>
              <Card style={styles.gridCard}>
                <Text style={styles.cardTitle}>おすすめ投稿</Text>
                <Text style={styles.cardDescription}>
                  あなたにおすすめの投稿をピックアップ
                </Text>
              </Card>
            </TouchableOpacity>
          </View>
        );
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
    },
    scrollView: {
      flex: 1,
    },
    content: {
      padding: 16,
    },
    sectionCard: {
      padding: 16,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    gridCard: {
      width: (Dimensions.get('window').width - 48) / 2,
      padding: 16,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
      color: '#000',
    },
    cardDescription: {
      fontSize: 14,
      color: '#666',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {currentSection !== "main" && (
          <Button 
            variant="outline" 
            size="icon"
            onPress={() => setCurrentSection("main")}
          >
            <ChevronLeft size={20} color="#000" />
          </Button>
        )}
        <Text style={styles.title}>
          {currentSection === "main" ? "発見" : ""}
        </Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {renderSection()}
        </View>
      </ScrollView>
    </View>
  );
}
