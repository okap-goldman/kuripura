import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { Card } from "@/components/ui/native/card";
import { AnalysisSection } from "@/components/discover/AnalysisSection";
import { RegionalActivitySection } from "@/components/discover/RegionalActivitySection";
import { EventsSection } from "@/components/discover/EventsSection";
import { RecommendedPostsSection } from "@/components/discover/RecommendedPostsSection";
import { useState } from "react";
import { ChevronLeft } from "lucide-react-native";
import { Button } from "@/components/ui/native/button";

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
            <Pressable onPress={() => setCurrentSection("analysis")}>
              <Card style={styles.gridCard}>
                <Text style={styles.cardTitle}><Text>分析</Text></Text>
                <Text style={styles.cardDescription}>
                  あなたの目醒め状況を分析し、アドバイスを提供します
                </Text>
              </Card>
            </Pressable>

            <Pressable onPress={() => setCurrentSection("regional")}>
              <Card style={styles.gridCard}>
                <Text style={styles.cardTitle}><Text>地域毎の活動状況</Text></Text>
                <Text style={styles.cardDescription}>
                  各地域での活動状況や注目のイベントをチェック
                </Text>
              </Card>
            </Pressable>

            <Pressable onPress={() => setCurrentSection("events")}>
              <Card style={styles.gridCard}>
                <Text style={styles.cardTitle}><Text>イベント</Text></Text>
                <Text style={styles.cardDescription}>
                  目醒め人が企画するイベントを探す・企画する
                </Text>
              </Card>
            </Pressable>

            <Pressable onPress={() => setCurrentSection("recommended")}>
              <Card style={styles.gridCard}>
                <Text style={styles.cardTitle}><Text>おすすめ投稿</Text></Text>
                <Text style={styles.cardDescription}>
                  あなたにおすすめの投稿をピックアップ
                </Text>
              </Card>
            </Pressable>
          </View>
        );
    }
  };

  const styles = StyleSheet.create({
    cardDescription: {
      color: '#666',
      fontSize: 14,
    },
    cardTitle: {
      color: '#000',
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
    },
    container: {
      backgroundColor: '#fff',
      flex: 1,
    },
    content: {
      padding: 16,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    gridCard: {
      padding: 16,
      width: (Dimensions.get('window').width - 48) / 2,
    },
    header: {
      alignItems: 'center',
      borderBottomColor: '#e5e7eb',
      borderBottomWidth: 1,
      flexDirection: 'row',
      padding: 16,
    },
    scrollView: {
      flex: 1,
    },
    sectionCard: {
      padding: 16,
    },
    title: {
      color: '#000',
      fontSize: 24,
      fontWeight: 'bold',
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
