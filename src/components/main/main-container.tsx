import { Animated, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {Footer} from '../footer/footer-menu.tsx';
import {useEffect, useRef, useState} from 'react';
import {Home} from '../pages/Home/home-screen.tsx';
import {Achievements} from '../pages/Achievements/achievements-page.tsx';
import {Articles} from '../pages/Articles/articles-page.tsx';
import {Profile} from '../pages/Profile/profile-page.tsx';
import {useUser} from '../../../user';

export const Main = () => {
  const {user} = useUser();
  const [page, setPage] = useState('My flows');
  const fadeAnim = useRef(new Animated.Value(0)).current; // Початкове значення прозорості

  useEffect(() => {
    fadeAnim.setValue(0);
    // Коли активна сторінка змінюється, виконується анімація появи футера
    Animated.timing(fadeAnim, {
      toValue: 1, // Робимо футер повністю видимим
      duration: 1500, // Тривалість анімації (300 мс)
      useNativeDriver: true,
    }).start();
  }, [page]); // Виконуємо ефект при зміні сторінки

  const renderPage = () => {
    switch (page) {
      case 'My flows':
        return <Home />;
      case 'My achievements':
        return <Achievements />;
      case 'Development':
        return <Articles />;
      case 'Profile':
        return <Profile />;
    }
  };

  console.log('User', user);

  return (
    <View>
      <ImageBackground
        style={styles.bg_image}
        source={require('../../assets/images/main_bg.png')}>
        <SafeAreaView style={[styles.header, {paddingBottom: 15}]}>
          <Text style={styles.header_title}>{page}</Text>
        </SafeAreaView>
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>{renderPage()}</Animated.View>
        <Footer handlePage={setPage} activePage={page} />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  bg_image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    height: 88,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(30, 30, 30, 1)',
  },
  header_title: {
    fontWeight: '600',
    fontSize: 17,
    color: 'rgba(255, 255, 255, 1)',
  },
});
