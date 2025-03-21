import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert, SafeAreaView
} from "react-native";
import {launchImageLibrary, MediaType} from 'react-native-image-picker';
import {useUser} from '../../../../user';
import {
  ScreenName,
  useNavigation,
} from '../../../../user/lib/hooks/use-navigation.tsx';

export const EditProfile = () => {
  const navigation = useNavigation();
  const {user, saveUser, clearUser} = useUser();
  const [name, setName] = useState(user?.profile?.userName || 'Mango Name');
  const [email, setEmail] = useState(user?.profile?.email || 'Mango@mango.com');
  const [avatar, setAvatar] = useState(
    user?.profile?.photo
      ? {uri: user.profile.photo}
      : require('../../../assets/images/profile_photo.png'),
  );

  const handleConfirm = () => {
    const updatedUser = {
      ...user,
      profile: {
        userName: name,
        photo: avatar?.uri || '',
        email: email,
      },
      flows: user?.flows || [],
      recipes: user?.recipes || [],
      places: user?.places || [],
    };

    saveUser(updatedUser);
    navigation.navigate(ScreenName.Main);
  };

  const pickImage = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 1 as const,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Користувач відмінив вибір зображення');
      } else if (response.errorMessage) {
        console.log('Помилка вибору зображення: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setAvatar({uri: response.assets[0].uri});
      }
    });
  };

  const removeAvatar = () => setAvatar(null);

  const handleBack = () => {
    navigation.navigate(ScreenName.Main);
  };

  const handleClearData = () => {
    Alert.alert(
      'Видалити дані користувача',
      'Ви впевнені, що хочете видалити всі дані користувача? Цю дію неможливо скасувати.',
      [
        {
          text: 'Скасувати',
          style: 'cancel',
        },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: () => {
            clearUser();
            navigation.navigate(ScreenName.Loader);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../../assets/images/main_bg.png')}>
        <SafeAreaView style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
              <Image source={require('../../../assets/icons/shevron_back.png')} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={styles.confirmText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.profileContainer}>
              {avatar ? (
                <View style={styles.avatarWrapper}>
                  <Image source={avatar} style={styles.avatar} />
                  <TouchableOpacity
                    style={styles.removeAvatar}
                    onPress={removeAvatar}>
                    <Text style={styles.removeText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.addAvatar} onPress={pickImage}>
                  <Text style={styles.addAvatarText}>+</Text>
                </TouchableOpacity>
              )}

              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
                placeholderTextColor="#888"
              />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Enter email"
                placeholderTextColor="#888"
              />
            </View>

            <TouchableOpacity onPress={handleClearData} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete user data</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
  },
  header: {
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30, 30, 30, 1)',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 1)',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backText: {
    fontSize: 17,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  confirmText: {
    fontSize: 17,
    color: '#4BA3F0',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
  },
  avatarWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  removeAvatar: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 16,
  },
  addAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addAvatarText: {
    color: '#fff',
    fontSize: 24,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 15,
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 16,
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
