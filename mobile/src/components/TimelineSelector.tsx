import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type TimelineType = 'family' | 'watch';

interface TimelineSelectorProps {
  currentType: TimelineType;
  onSelect: (type: TimelineType) => void;
}

export function TimelineSelector({ currentType, onSelect }: TimelineSelectorProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          currentType === 'family' && styles.activeButton
        ]}
        onPress={() => onSelect('family')}
        testID="family-button"
      >
        <Text style={[
          styles.buttonText,
          currentType === 'family' && styles.activeButtonText
        ]}>
          ファミリー
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.button,
          currentType === 'watch' && styles.activeButton
        ]}
        onPress={() => onSelect('watch')}
        testID="watch-button"
      >
        <Text style={[
          styles.buttonText,
          currentType === 'watch' && styles.activeButtonText
        ]}>
          ウォッチ
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: '#0284c7',
    borderColor: '#0284c7',
  },
  buttonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  activeButtonText: {
    color: '#ffffff',
  },
}); 