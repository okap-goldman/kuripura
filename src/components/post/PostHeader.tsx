import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from "@/components/ui/native/avatar";

interface PostHeaderProps {
  author: {
    name: string;
    image: string;
    id?: string;
  };
}

export function PostHeader({ author }: PostHeaderProps) {
  return (
    <View style={styles.container}>
      <Avatar
        source={{ uri: author.image }}
        fallback={author.name[0]}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{author.name}</Text>
        <Text style={styles.id}>
          {author.id || `@${author.name.toLowerCase().replace(/\s+/g, '')}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  id: {
    color: '#6b7280',
    fontSize: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
  },
});
