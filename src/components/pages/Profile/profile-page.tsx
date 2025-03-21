import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useUser } from '../../../../user';
import {
  ScreenName,
  useNavigation,
} from '../../../../user/lib/hooks/use-navigation.tsx';

export const Profile = () => {
  const { user } = useUser();
  
  // Початкове значення фото профілю
  const [image, setImage] = useState(
    user?.profile?.photo && typeof user.profile.photo === 'string'
      ? user.profile.photo
      : require('../../../assets/images/profile_photo.png')
  );

  const [userName, setUserName] = useState(user?.profile?.userName || 'Your Name');
  const [email, setEmail] = useState(user?.profile?.email || 'your@email.com');

  const navigation = useNavigation();

  // Логування для діагностики
  console.log('🔴 Profile Image:', image, '| Type:', typeof image);

  // Функція для вибору нового фото
  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  // Функція для редагування профілю
  const EditProfile = () => {
    navigation.navigate(ScreenName.EditProfile);
  };

  return (
    <View style={{ height: 480 }}>
      <ScrollView>
        <View style={styles.container}>
          {/* Фото профілю */}
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={typeof image === 'string' ? { uri: image } : image}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {/* Ім'я та email */}
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.email}>{email}</Text>

          {/* Статистика користувача */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={require('../../../assets/icons/complete.png')} />
                <Text style={styles.statTitle}>Task{'\n'}Completed</Text>
              </View>
              <Text style={styles.statValue}>12</Text>
            </View>

            <View style={styles.statBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={require('../../../assets/icons/duration.png')} />
                <Text style={styles.statTitle}>Time Duration</Text>
              </View>
              <Text style={styles.statValue}>
                3<Text style={styles.minutes}>h</Text> 46
                <Text style={styles.minutes}>m</Text>
              </Text>
            </View>
          </View>

          {/* Кнопки навігації */}
          <TouchableOpacity onPress={EditProfile} style={styles.button}>
            <Text style={styles.buttonText}>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Developer Website</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Terms of Use</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Appeal to developers</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// 🔹 СТИЛІ
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  statBox: {
    backgroundColor: 'rgba(22, 32, 48, 1)',
    width: 164,
    height: 132,
    padding: 15,
    borderRadius: 16,
    borderStyle: 'solid',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    flex: 1,
    marginHorizontal: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#ccc',
    marginVertical: 5,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  emoji: {
    fontSize: 20,
  },
  minutes: {
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 32, 48, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    width: 342,
    height: 49,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 16,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Profile;
