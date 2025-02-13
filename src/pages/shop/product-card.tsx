import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from '@/components/ui/native/avatar';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    seller: {
      name: string;
      image: string;
    };
  };
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.container}
    >
      {/* 商品画像 */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
        />
      </View>

      {/* 商品情報 */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        
        <Text style={styles.price}>
          ¥{product.price.toLocaleString()}
        </Text>

        <View style={styles.sellerContainer}>
          <Avatar
            source={{ uri: product.seller.image }}
            fallback={product.seller.name[0]}
            size="small"
          />
          <Text style={styles.sellerName}>
            {product.seller.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    aspectRatio: 1,
  },
  infoContainer: {
    gap: 8,
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
  },
  sellerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  sellerName: {
    color: '#6b7280',
    fontSize: 14,
  },
}); 