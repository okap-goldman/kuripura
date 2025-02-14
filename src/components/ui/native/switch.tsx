import type { FC } from 'react';
import { Switch as RNSwitch, StyleSheet } from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({ value, onValueChange }) => {
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
      thumbColor="#ffffff"
      ios_backgroundColor="#e5e7eb"
      style={styles.switch}
    />
  );
};

const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});
