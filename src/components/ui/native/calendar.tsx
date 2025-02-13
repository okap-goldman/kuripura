import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { ja } from 'date-fns/locale';

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ selected, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <ChevronLeft size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {format(currentMonth, 'yyyy年 MM月', { locale: ja })}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <ChevronRight size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.days}>
        {days.map((date) => {
          const isSelected = selected && isSameDay(date, selected);
          const isCurrentMonth = isSameMonth(date, currentMonth);

          return (
            <TouchableOpacity
              key={date.toISOString()}
              style={[
                styles.day,
                isSelected && styles.selectedDay,
                !isCurrentMonth && styles.otherMonthDay,
              ]}
              onPress={() => onSelect?.(date)}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected && styles.selectedDayText,
                  !isCurrentMonth && styles.otherMonthDayText,
                ]}
              >
                {format(date, 'd')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
  },
  selectedDay: {
    backgroundColor: '#3b82f6',
    borderRadius: 999,
  },
  selectedDayText: {
    color: '#fff',
  },
  otherMonthDay: {
    opacity: 0.5,
  },
  otherMonthDayText: {
    color: '#9ca3af',
  },
});
