import { View, Text, StyleSheet } from 'react-native';
import { Input } from '@/components/ui/native/input';
import { Select, SelectItem } from '@/components/ui/native/select';
import { Button } from '@/components/ui/native/button';
import { FilterIcon } from 'lucide-react-native';
import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
  },
  searchInput: {
    flex: 1,
  },
  filterButton: {
    paddingHorizontal: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  filterSection: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  priceRange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceInput: {
    flex: 1,
  },
  priceSeparator: {
    color: '#6b7280',
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
            <Text style={styles.buttonText}>詳細検索</Text>
          </View>
        </Button>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.label}>開催場所</Text>
        <Select
          value={filters.location}
          onValueChange={(value: string) => handleFilterChange({ location: value })}
          placeholder="場所を選択"
        >
          <SelectItem value="all">すべて</SelectItem>
          <SelectItem value="tokyo">東京</SelectItem>
          <SelectItem value="osaka">大阪</SelectItem>
          <SelectItem value="online">オンライン</SelectItem>
        </Select>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.label}>参加費用</Text>
        <View style={styles.priceRange}>
          <Input
            placeholder="最小"
            value={filters.minPrice.toString()}
            onChangeText={(text) => handleFilterChange({ minPrice: Number(text) || 0 })}
            keyboardType="numeric"
            style={styles.priceInput}
          />
          <Text style={styles.priceSeparator}>〜</Text>
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