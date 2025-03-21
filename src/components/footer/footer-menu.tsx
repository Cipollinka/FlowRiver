import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useRef} from 'react';

interface FooterProps {
  handlePage: (value: ((prevState: string) => string) | string) => void;
  activePage: string;
}

export const Footer = ({handlePage, activePage}: FooterProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Початкове значення прозорості

  useEffect(() => {
    fadeAnim.setValue(0);
    // Коли активна сторінка змінюється, виконується анімація появи футера
    Animated.timing(fadeAnim, {
      toValue: 1, // Робимо футер повністю видимим
      duration: 500, // Тривалість анімації (300 мс)
      useNativeDriver: true,
    }).start();
  }, [activePage]); // Виконуємо ефект при зміні сторінки

  const handleScreen = (page: string) => {
    handlePage(page);
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <TouchableOpacity onPress={() => handleScreen('My flows')}>
        <Image
          source={
            activePage === 'My flows'
              ? require('../../assets/icons/home.png')
              : require('../../assets/icons/home_not_active.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleScreen('My achievements')}>
        <Image
          source={
            activePage === 'My achievements'
              ? require('../../assets/icons/achievements_active.png')
              : require('../../assets/icons/achievements.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleScreen('Development')}>
        <Image
          source={
            activePage === 'Development'
              ? require('../../assets/icons/articles_active.png')
              : require('../../assets/icons/articles.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleScreen('Profile')}>
        <Image
          source={
            activePage === 'Profile'
              ? require('../../assets/icons/profile_active.png')
              : require('../../assets/icons/profile.png')
          }
        />
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 93,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
  },
});
