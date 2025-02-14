import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface SidebarProps {
  children: React.ReactNode;
  position?: 'left' | 'right';
  width?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  position = 'left',
  width = 300,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(position === 'left' ? -width : width))[0];

  const toggleSidebar = () => {
    const toValue = isOpen ? (position === 'left' ? -width : width) : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          position === 'left' ? styles.toggleButtonLeft : styles.toggleButtonRight,
          { [position]: isOpen ? width : 0 },
        ]}
        onPress={toggleSidebar}
      >
        {position === 'left' ? (
          <ChevronRight size={24} color="#000" />
        ) : (
          <ChevronLeft size={24} color="#000" />
        )}
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.sidebar,
          {
            width,
            [position]: 0,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <ScrollView style={styles.content}>
          {children}
        </ScrollView>
      </Animated.View>

      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleSidebar}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  sidebar: {
    backgroundColor: '#fff',
    bottom: 0,
    elevation: 5,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    top: 0,
    zIndex: 1000,
  },
  toggleButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    top: '50%',
    width: 40,
    zIndex: 1001,
  },
  toggleButtonLeft: {
    left: 0,
    transform: [{ translateY: -20 }],
  },
  toggleButtonRight: {
    right: 0,
    transform: [{ translateY: -20 }],
  },
});
