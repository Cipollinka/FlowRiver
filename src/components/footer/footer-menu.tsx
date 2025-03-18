import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

interface FooterProps {
  handlePage: (value: ((prevState: string) => string) | string) => void;
  activePage: string;
}

export const Footer = ({handlePage, activePage}: FooterProps) => {
  const handleScreen = (page: string) => {
    handlePage(page);
  };

  return (
    <View style={styles.container}>
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
    </View>
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
