import { View, Text, StyleSheet } from 'react-native';
import { Input } from '@/components/ui/native/input';
import { Select, SelectItem } from '@/components/ui/native/select';
import { Button } from '@/components/ui/native/button';
import { FilterIcon } from 'lucide-react-native';
import { useState } from 'react';

const styles = StyleSheet.create({
  buttonContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    color: '#6b7280',
    fontSize: 14,
  },
  container: {
    gap: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
  },
  filterSection: {
    gap: 8,
  },
  label: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  priceInput: {
    flex: 1,
  },
  priceRange: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  priceSeparator: {
    color: '#6b7280',
  },
  searchInput: {
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
  },
});

interface EventFilterProps {
  onFilterChange: (filters: EventFilters) => void
}

interface EventFilters {
  keyword: string
  location: string
  minPrice: number
  maxPrice: number
  date: Date | undefined
}

export function EventFilter({ onFilterChange }: EventFilterProps) {
  const [filters, setFilters] = useState<EventFilters>({
    keyword: "",
    location: "",
    minPrice: 0,
    maxPrice: 100000,
    date: undefined
  })

  const handleFilterChange = (newFilters: Partial<EventFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <Input
          placeholder="イベントを検索"
          value={filters.keyword}
          onChangeText={(text) => handleFilterChange({ keyword: text })}
          style={styles.searchInput}
        />
        <Button
          variant="outline"
          onPress={() => {}}
          style={styles.filterButton}
        >
          <View style={styles.buttonContent}>
            <FilterIcon size={16} color="#6b7280" />
            <Text style={styles.buttonText}><Text>詳細検索</Text></Text>
          </View>
        </Button>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.label}><Text>開催場所</Text></Text>
        <Select
          value={filters.location}
          onValueChange={(value: string) => handleFilterChange({ location: value })}
          placeholder="場所を選択"
        >
          <SelectItem value="all"><Text>すべて</Text></SelectItem>
          <SelectItem value="tokyo"><Text>東京</Text></SelectItem>
          <SelectItem value="osaka"><Text>大阪</Text></SelectItem>
          <SelectItem value="online"><Text>オンライン</Text></SelectItem>
        </Select>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.label}><Text>参加費用</Text></Text>
        <View style={styles.priceRange}>
          <Input
            placeholder="最小"
            value={filters.minPrice.toString()}
            onChangeText={(text) => handleFilterChange({ minPrice: Number(text) || 0 })}
            keyboardType="numeric"
            style={styles.priceInput}
          />
          <Text style={styles.priceSeparator}><Text>〜</Text></Text>
          <Input
            placeholder="最大"
            value={filters.maxPrice.toString()}
            onChangeText={(text) => handleFilterChange({ maxPrice: Number(text) || 0 })}
            keyboardType="numeric"
            style={styles.priceInput}
          />
        </View>
      </View>
    </View>
  )
}  