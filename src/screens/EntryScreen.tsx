import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

// Sample data for carousel slides - only images change
const carouselImages = [
  require('../../assets/image/entry1.jpg'),
  require('../../assets/image/entry2.jpg'),
  require('../../assets/image/entry3.jpg'),
];

// Create extended array for smoother transitions
const extendedImages = [...carouselImages, carouselImages[0]];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleGetStarted = () => {
    // Navigate to next screen
    console.log('Get Started pressed');
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);

    // Handle the extended image (last position)
    if (index >= carouselImages.length) {
      // Don't update currentIndex for the extended image
      return;
    }

    setCurrentIndex(index);
    scrollX.setValue(contentOffset);
  };

  const goToSlide = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });

    // Smooth animated transition for indicators
    Animated.timing(scrollX, {
      toValue: index * width,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setCurrentIndex(index);
  };

  // Auto-scroll functionality with seamless loop
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;

      if (nextIndex >= carouselImages.length) {
        // Smoothly scroll to the duplicate first image
        scrollViewRef.current?.scrollTo({
          x: carouselImages.length * width,
          animated: true,
        });

        // After animation, instantly jump back to the real first image
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: 0,
            animated: false,
          });
          setCurrentIndex(0);
          scrollX.setValue(0);
        }, 500);
      } else {
        // Normal scroll
        scrollViewRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        });

        Animated.timing(scrollX, {
          toValue: nextIndex * width,
          duration: 500,
          useNativeDriver: false,
        }).start();

        setCurrentIndex(nextIndex);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderCarouselItem = (image: any, index: number) => (
    <View key={index} style={styles.carouselItem}>
      <ImageBackground
        source={image}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Dark overlay with fade animation */}
        {/* <Animated.View style={styles.overlay}>
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View> */}
      </ImageBackground>
    </View>
  );

  const renderIndicators = () => {
    return (
      <View style={styles.indicatorContainer}>
        {carouselImages.map((_, index) => {
          const inputRange: number[] = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const indicatorWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              key={index}
              onPress={() => goToSlide(index)}
              style={styles.indicatorTouchable}
            >
              <Animated.View
                style={[
                  styles.indicator,
                  {
                    transform: [{ scale }],
                    opacity,
                    width: indicatorWidth,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Background Carousel - Only images change */}
      <View style={styles.backgroundContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
              listener: handleScroll,
            }
          )}
          scrollEventThrottle={16}
          style={styles.backgroundScrollView}
          decelerationRate="fast"
        >
          {extendedImages.map((image, index) => renderCarouselItem(image, index))}
        </Animated.ScrollView>
      </View>

      {/* Fixed Bottom Card */}
      <View style={styles.fixedBottomCard}>
        {/* Page Indicators */}
        {renderIndicators()}

        <Text style={styles.title}>
          Stoxly
        </Text>

        <Text style={styles.subtitle}>
          Inventory Management Made Simple
        </Text>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundScrollView: {
    flex: 1,
  },
  carouselItem: {
    width: width,
    height: height,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  fixedBottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 50,
    minHeight: height * 0.45,
    // Add shadow for better separation
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    justifyContent: 'space-between',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#388e3c',
  },
  indicatorTouchable: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  activeIndicator: {
    width: 8,
    backgroundColor: '#388e3c',
  },
  inactiveIndicator: {
    width: 8,
    backgroundColor: '#E0E0E0',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#388e3c',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: '#7A7A7A',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  getStartedButton: {
    backgroundColor: '#388e3c',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#388e3c',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingScreen;