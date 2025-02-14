import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface CarouselProps {
  children: React.ReactNode[];
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentIndex(pageNum);
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {children.map((child, index) => (
          <View key={index} style={[styles.slide, { width: screenWidth }]}>
            {child}
          </View>
        ))}
      </ScrollView>

      {currentIndex > 0 && (
        <TouchableOpacity
          style={[styles.button, styles.prevButton]}
          onPress={() => scrollToIndex(currentIndex - 1)}
        >
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {currentIndex < children.length - 1 && (
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={() => scrollToIndex(currentIndex + 1)}
        >
          <ChevronRight size={24} color="#fff" />
        </TouchableOpacity>
      )}

      <View style={styles.pagination}>
        {children.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
  },
  container: {
    position: 'relative',
  },
  nextButton: {
    right: 10,
  },
  pagination: {
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  paginationDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    height: 8,
    marginHorizontal: 4,
    width: 8,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
  },
  prevButton: {
    left: 10,
  },
  slide: {
    height: '100%',
  },
});
