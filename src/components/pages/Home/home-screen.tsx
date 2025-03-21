import React from 'react';
import {
  Image, SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  ScreenName,
  useNavigation,
} from '../../../../user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../../../user';
import {Recipe} from '../../../../user/types';

export const Home = () => {
  const navigation = useNavigation();
  const {user} = useUser();

  const handleAddFlows = () => {
    navigation.navigate(ScreenName.AddFlows);
  };

  const handleFlowPress = (recipe: Recipe) => {
    navigation.navigate(ScreenName.FlowDetails, {recipe});
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.recipesContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {!user?.recipes.length ? (
            <View style={styles.emptyState}>
              <Text style={styles.title}>
                You haven't created any flows yet
              </Text>
            </View>
          ) : (
            user.recipes.map((recipe, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recipeCard}
                onPress={() => handleFlowPress(recipe)}>
                <Image
                  source={require('../../../assets/images/image_one_flow.png')}
                  style={styles.recipeImage}
                />
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeName}>{recipe.name}</Text>
                  <Text style={styles.recipeDescription} numberOfLines={2}>
                    {recipe.description}
                  </Text>
                  <View style={styles.recipeDetails}>
                    <Text style={styles.recipeCategory}>{recipe.category}</Text>
                    <Text style={styles.recipeDuration}>
                      {recipe.lessonDuration} min × {recipe.lessonCount} lessons
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
          <TouchableOpacity onPress={handleAddFlows} style={styles.addButton}>
            <Image source={require('../../../assets/icons/add_elements.png')} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  recipesContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  recipeCard: {
    width: '100%',
    height: 208,
    backgroundColor: 'rgba(30, 30, 30, 1)',
    borderRadius: 33,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  recipeInfo: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  recipeDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  recipeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  recipeCategory: {
    fontSize: 12,
    color: '#4BA3F0',
    backgroundColor: 'rgba(75, 163, 240, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recipeDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  addButton: {
    alignItems: 'center',
    marginTop: 16,
  },
});
