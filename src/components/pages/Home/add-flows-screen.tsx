import {
  Image,
  ImageBackground, SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {useState} from 'react';
import {One} from './add-flows/one.tsx';
import {Two} from './add-flows/two.tsx';
import {Three} from './add-flows/three.tsx';
import {
  ScreenName,
  useNavigation,
} from '../../../../user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../../../user';
import {Recipe, User} from '../../../../user/types';

const images = [
  {id: 'img_1', src: require('../../../assets/images/image_one_flow.png')},
  {id: 'img_2', src: require('../../../assets/images/image_two_flow.png')},
  {id: 'img_3', src: require('../../../assets/images/image_three_flow.png')},
  {id: 'img_4', src: require('../../../assets/images/image_four_flow.png')},
  {id: 'img_5', src: require('../../../assets/images/image_five_flow.png')},
  {id: 'img_6', src: require('../../../assets/images/image_six_flow.png')},
  {id: 'img_7', src: require('../../../assets/images/image_seven_flow.png')},
];

export const AddFlows = () => {
  const navigation = useNavigation();
  const {user, saveUser} = useUser();
  const [nameFlow, setNameFlow] = useState('');
  const [descriptionFlow, setDescriptionFlow] = useState('');
  const [imageFlow, setImageFlow] = useState('');
  const [nextPage, setNextPage] = useState('one');

  const [selectedCategory, setSelectedCategory] = useState('tasks');
  const [lessonDuration, setLessonDuration] = useState('');
  const [lessonCount, setLessonCount] = useState('');

  const handleBack = () => {
    navigation.navigate(ScreenName.Main);
  };

  const renderScreen = () => {
    switch (nextPage) {
      case 'one':
        return (
          <One
            nameValue={nameFlow}
            descriptionValue={descriptionFlow}
            name={setNameFlow}
            description={setDescriptionFlow}
          />
        );
      case 'two':
        return <Two image={imageFlow} setImage={setImageFlow} />;
      case 'three':
        return (
          <Three
            selectedCategory={selectedCategory}
            lessonDuration={lessonDuration}
            lessonCount={lessonCount}
            setSelectedCategory={setSelectedCategory}
            setLessonDuration={setLessonDuration}
            setLessonCount={setLessonCount}
          />
        );
    }
  };

  const isDisabled =
    nextPage === 'one' && (!nameFlow.trim() || !descriptionFlow.trim());

  const selectedImage = images.find(img => img.id === imageFlow)?.src;

  const handleNext = () => {
    if (nextPage === 'one') {
      if (!nameFlow.trim() || !descriptionFlow.trim()) {
        return;
      }
      setNextPage('two');
    } else if (nextPage === 'two') {
      if (!imageFlow) {
        return;
      }
      setNextPage('three');
    } else if (nextPage === 'three') {
      if (!user) {
        console.error('User is not initialized');
        return;
      }

      const newRecipe: Recipe = {
        name: nameFlow.trim(),
        description: descriptionFlow.trim(),
        image: imageFlow,
        category: selectedCategory,
        lessonDuration: lessonDuration,
        lessonCount: lessonCount,
      };

      console.log('🟢 New Recipe:', newRecipe);

      const updatedUser: User = {
        ...user,
        recipes: [...user.recipes, newRecipe],
      };

      console.log('🔵 Updated User:', updatedUser);
      saveUser(updatedUser);

      navigation.navigate(ScreenName.Main);
    }
  };

  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../../assets/images/main_bg.png')}>
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.back_btn}>
              <Image
                source={require('../../../assets/icons/shevron_back.png')}
              />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.header_title}>Create flow</Text>
            <View style={{width: 55.51}} />
          </SafeAreaView>
          <View>{renderScreen()}</View>
          <TouchableOpacity
            onPress={handleNext}
            disabled={isDisabled}
            style={[
              styles.next_btn,
              {
                backgroundColor: isDisabled
                  ? 'rgba(22, 32, 48, 0.5)'
                  : 'rgba(22, 32, 48, 1)',
                borderColor: isDisabled
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'rgba(255, 255, 255, 1)',
              },
            ]}>
            <Text
              style={[
                styles.nextText,
                {
                  color: isDisabled
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(255, 255, 255, 1)',
                },
              ]}>
              Next
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
});
