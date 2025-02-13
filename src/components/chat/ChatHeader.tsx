import { ArrowLeft, MoreVertical } from "lucide-react-native";
import { Button } from "@/components/ui/native/button";
import { Avatar } from "@/components/ui/native/avatar";
import { View, Text, StyleSheet } from "react-native";

type ChatHeaderProps = {
  user: {
    name: string;
    avatarUrl?: string;
  };
  onBack: () => void;
};

export const ChatHeader = ({ user, onBack }: ChatHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Button variant="outline" onPress={onBack}>
          <ArrowLeft size={20} color="#6b7280" />
        </Button>
        <Avatar 
          source={{ uri: user.avatarUrl }}
          fallback={user.name[0]}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.actions}>
          <Button variant="outline">
            <MoreVertical size={20} color="#6b7280" />
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginLeft: 'auto',
  },
  avatar: {
    height: 32,
    width: 32,
  },
  container: {
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    padding: 16,
  },
  name: {
    fontWeight: '500',
  },
});
