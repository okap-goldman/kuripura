import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';

interface CommandProps {
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  placeholder?: string;
}

interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export const Command: React.FC<CommandProps> = ({
  items,
  onSelect,
  placeholder = '検索...',
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem = ({ item, index }: { item: CommandItem; index: number }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedIndex === index && styles.selectedItem,
      ]}
      onPress={() => {
        setSelectedIndex(index);
        onSelect(item);
      }}
    >
      {item.icon && (
        <View style={styles.icon}>
          {item.icon}
        </View>
      )}
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={16} color="#6b7280" />
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
        />
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    color: '#111827',
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 12,
  },
  label: {
    color: '#111827',
    fontSize: 14,
  },
  list: {
    maxHeight: 300,
  },
  searchContainer: {
    alignItems: 'center',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedItem: {
    backgroundColor: '#f3f4f6',
  },
});
