import { View, Text, StyleSheet, Alert } from 'react-native';
import { Card } from "@/components/ui/native/card";
import { Button } from "@/components/ui/native/button";
import { ShoppingCart } from "lucide-react-native";

interface RegionSpecialtiesProps {
  specialties: string[];
}

export function RegionSpecialties({ specialties }: RegionSpecialtiesProps) {
  const handlePurchase = (item: string) => {
    Alert.alert(
      "カートに追加しました",
      `${item}をカートに追加しました。`
    );
  };

  return (
    <Card style={styles.container}>
      <Text style={styles.title}><Text>名産品</Text></Text>
      <View style={styles.grid}>
        {specialties.map((specialty, index) => (
          <Card key={index} style={styles.itemCard}>
            <View style={styles.imageContainer} />
            <Text style={styles.itemTitle}>{specialty}</Text>
            <View style={styles.itemFooter}>
              <Text style={styles.price}><Text>¥3,800</Text></Text>
              <Button
                onPress={() => handlePurchase(specialty)}
                style={styles.button}
              >
                <View style={styles.buttonContent}>
                  <ShoppingCart size={16} color="#fff" />
                  <Text style={styles.buttonText}><Text>購入</Text></Text>
                </View>
              </Button>
            </View>
          </Card>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 32,
  },
  buttonContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  container: {
    padding: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 16,
  },
  itemCard: {
    flex: 1,
    minWidth: '48%',
    padding: 16,
  },
  itemFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontWeight: '500',
    marginBottom: 8,
  },
  price: {
    color: '#6b7280',
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
});
