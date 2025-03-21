import React, {useRef, useEffect} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  ScreenName,
  useNavigation,
} from '../../../../user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../../../user';

const slides = [
  {
    id: 1,
    image: require('../../../assets/images/onboard_one.png'),
    title: 'Explore New Streams of Learning',
    description:
      'Discover skills through a flowing journey. Each step brings you closer to mastering something new.',
  },
  {
    id: 2,
    image: require('../../../assets/images/onboard_two.png'),
    title: 'Immerse Yourself in Knowledge',
    description:
      'Advance through each level to unlock new insights and get closer to your personal growth goals.',
  },
  {
    id: 3,
    image: require('../../../assets/images/onboard_three.png'),
    title: 'Unlock Rewards Along the River',
    description:
      'Earn treasures and bonuses for completing challenges and navigating through your learning journey.',
  },
];

export const OnBoards = () => {
  const navigation = useNavigation();
  const {user, saveUser} = useUser();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const textAnim = useRef(new Animated.Value(20)).current;

  // Перевірка, чи користувач уже пройшов онборди
  useEffect(() => {
    if (user?.flows?.onboardingCompleted) {
      navigation.navigate(ScreenName.Main); // Перехід на головну, якщо онборд пройдено
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [user, navigation]);

  const handleHome = () => {
    // Встановлюємо статус проходження онборду
    saveUser({...user, flows: {...user?.flows, onboardingCompleted: true}});
    navigation.navigate(ScreenName.Main); // Переходимо на головну
  };

  return (
    <ImageBackground
      style={styles.imageBg}
      source={require('../../../assets/images/main_bg.png')}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.skipButton} onPress={handleHome}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <Swiper
          loop={false}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}>
          {slides.map(slide => (
            <Animated.View
              key={slide.id}
              style={[styles.slide, {opacity: fadeAnim}]}>
              <Animated.Image
                source={slide.image}
                style={[styles.image, {transform: [{scale: scaleAnim}]}]}
              />
              <Animated.Text
                style={[styles.title, {transform: [{translateY: textAnim}]}]}>
                {slide.title}
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.description,
                  {transform: [{translateY: textAnim}]},
                ]}>
                {slide.description}
              </Animated.Text>
            </Animated.View>
          ))}
        </Swiper>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageBg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    color: '#FDCB58',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#DDD',
    textAlign: 'center',
  },
  dot: {
    backgroundColor: '#555',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
