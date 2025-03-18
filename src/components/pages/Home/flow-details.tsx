import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {ScreenName, useNavigation} from '../../../../user/lib/hooks/use-navigation.tsx';
import {Recipe} from '../../../../user/types';

interface FlowDetailsProps {
  route: {
    params: {
      recipe: Recipe;
    };
  };
}

export const FlowDetails = ({route}: FlowDetailsProps) => {
  const navigation = useNavigation();
  const {recipe} = route.params;

  const handleBack = () => {
    navigation.navigate(ScreenName.Main);
  };

  const handleStartFlow = () => {
    navigation.navigate(ScreenName.FlowTimer, {
      recipe,
      currentLesson: 1,
    });
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
          </View>

          <ScrollView style={styles.scrollView}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/images/image_one_flow.png')}
                style={styles.image}
              />
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{recipe.name}</Text>
              <Text style={styles.description}>{recipe.description}</Text>

              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Category</Text>
                  <Text style={styles.infoValue}>{recipe.category}</Text>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Duration</Text>
                  <Text style={styles.infoValue}>{recipe.lessonDuration} min</Text>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Total lessons</Text>
                  <Text style={styles.infoValue}>{recipe.lessonCount}</Text>
                </View>
              </View>

              <TouchableOpacity onPress={handleStartFlow} style={styles.startButton}>
                <Text style={styles.startButtonText}>Start Flow</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 24,
    lineHeight: 24,
  },
  infoContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#4BA3F0',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 