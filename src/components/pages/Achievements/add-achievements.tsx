import {useState} from 'react';
import {
  ScreenName,
  useNavigation,
} from '../../../../user/lib/hooks/use-navigation.tsx';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useUser} from '../../../../user';
import {Achievement} from '../../../../user/types';

export const AddAchievements = () => {
  const navigation = useNavigation();
  const {user, saveUser} = useUser();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tags, setTags] = useState('');

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri || null);
      }
    });
  };

  const handleSave = () => {
    if (!user) {
      console.error('User is not initialized');
      return;
    }

    if (!name.trim() || !description.trim()) {
      return;
    }

    const newAchievement: Achievement = {
      name: name.trim(),
      description: description.trim(),
      image,
      date,
      tags: tags.trim(),
    };

    console.log('🟢 New Achievement:', newAchievement);

    const updatedUser = {
      ...user,
      places: [...user.places, newAchievement],
    };

    console.log('🔵 Updated User:', updatedUser);
    saveUser(updatedUser);

    navigation.navigate(ScreenName.Main);
  };

  const handleBack = () => {
    navigation.navigate(ScreenName.Main);
  };

  console.log('🟢 User:', user?.places);

  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../../assets/images/main_bg.png')}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.back_btn}>
              <Image
                source={require('../../../assets/icons/shevron_back.png')}
              />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.header_title}>Create achievement</Text>
            <View style={{width: 55.51}} />
          </View>
          <View style={{height: 500}}>
            <ScrollView>
              <View style={styles.container_main}>
                <Text style={styles.label}>Enter name of achievement</Text>
                <TextInput
                  style={styles.input}
                  placeholder="For example, won contest"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={name}
                  onChangeText={setName}
                />

                <Text style={styles.label}>
                  Enter description of achievement
                </Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  placeholder="Describe your accomplishment, what it is, major work accomplished"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  multiline
                  value={description}
                  onChangeText={setDescription}
                />

                <Text style={styles.label}>Add image</Text>
                <TouchableOpacity
                  style={styles.imagePicker}
                  onPress={pickImage}>
                  {image ? (
                    <Image source={{uri: image}} style={styles.image} />
                  ) : (
                    <Text style={styles.imageText}>Select from gallery</Text>
                  )}
                </TouchableOpacity>

                <Text style={styles.label}>Select the date of achievement</Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.dateButton}>
                  <Text style={styles.dateText}>{date.toDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <RNDateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) setDate(selectedDate);
                    }}
                  />
                )}

                <Text style={styles.label}>Add achievement tags</Text>
                <TextInput
                  style={styles.input}
                  placeholder="For example, computer science"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={tags}
                  onChangeText={setTags}
                />
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity
            style={[
              styles.next_btn,
              {
                backgroundColor: 'rgba(22, 32, 48, 1)',
                borderColor: 'rgba(255, 255, 255, 1)',
              },
            ]}
            onPress={handleSave}>
            <Text
              style={[
                styles.nextText,
                {
                  color: 'rgba(255, 255, 255, 1)',
                },
              ]}>
              Save
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  imageBg: {
    width: '100%',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 360,
  },
  header: {
    width: '100%',
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 1)',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 1)',
    borderStyle: 'solid',
  },
  header_title: {
    fontWeight: '600',
    fontSize: 17,
    color: 'rgba(255, 255, 255, 1)',
  },
  back_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  next_btn: {
    width: 342,
    height: 49,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '500',
  },
  container_main: {
    padding: 20,
    flex: 1,
  },
  label: {
    color: 'white',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: 'rgba(22, 32, 48, 1)',
    color: 'white',
    padding: 10,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'solid',
  },
  textarea: {
    height: 80,
  },
  imagePicker: {
    backgroundColor: '#1B263B',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    borderStyle: 'solid',
  },
  imageText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  dateButton: {
    backgroundColor: 'rgba(22, 32, 48, 1)',
    padding: 10,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    borderStyle: 'solid',
    alignItems: 'center',
  },
  dateText: {
    color: 'white',
  },
});
