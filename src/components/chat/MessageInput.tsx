import { Camera, Send, Smile } from "lucide-react-native";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@/components/ui/native/button";
import { Input } from "@/components/ui/native/input";

type MessageInputProps = {
  onSend: (message: string) => void;
};

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Button
        variant="outline"
        onPress={() => {}}
      >
        <Camera size={20} color="#6b7280" />
      </Button>
      <View style={styles.inputContainer}>
        <Input
          value={message}
          onChangeText={setMessage}
          placeholder="メッセージを入力"
          style={styles.input}
        />
        <Button
          variant="outline"
          onPress={() => {}}
          style={styles.emojiButton}
        >
          <Smile size={20} color="#6b7280" />
        </Button>
      </View>
      <Button
        variant="outline"
        onPress={handleSubmit}
        disabled={!message.trim()}
      >
        <Send size={20} color={message.trim() ? "#3b82f6" : "#6b7280"} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 8,
    padding: 16,
  },
  emojiButton: {
    position: 'absolute',
    right: 4,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 9999,
    borderWidth: 0,
    paddingRight: 40,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
  },
}); 