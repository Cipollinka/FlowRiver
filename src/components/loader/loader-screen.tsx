import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {
  ScreenName,
  useNavigation,
} from '../../../user/lib/hooks/use-navigation.tsx';

export const Loader = () => {
  const navigation = useNavigation();

  setTimeout(() => {
    navigation.navigate(ScreenName.Main);
  }, 2000);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg_image}
        source={require('../../assets/images/loader_image_bg.png')}>
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  bg_image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loader: {
    marginBottom: 80,
  },
});
