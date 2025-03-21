import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../../../user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../../../user';

export const Achievements = () => {
  const navigation = useNavigation();
  const {user} = useUser();

  const handleAddFlows = () => {
    navigation.navigate(ScreenName.AddAchievements);
  };

  return (
    <View style={styles.container}>
      {!user?.places.length ? (
        <>
          <Text style={styles.title}>
            You haven't created any achievements yet
          </Text>
          <TouchableOpacity onPress={handleAddFlows}>
            <Image source={require('../../../assets/icons/add_elements.png')} />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.achievementsContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {user.places.map((achievement, index) => (
              <TouchableOpacity key={index} style={styles.achievementCard}>
                {achievement.image && (
                  <Image
                    source={{uri: achievement.image}}
                    style={styles.achievementImage}
                  />
                )}
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                  <Text style={styles.achievementDescription} numberOfLines={2}>
                    {achievement.description}
                  </Text>
                  <View style={styles.achievementDetails}>
                    <Text style={styles.achievementDate}>
                      {new Date(achievement.date).toLocaleDateString()}
                    </Text>
                    {achievement.tags && (
                      <Text style={styles.achievementTags}>
                        {achievement.tags}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    gap: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  achievementsContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  achievementCard: {
    width: '100%',
    backgroundColor: 'rgba(30, 30, 30, 1)',
    borderRadius: 33,
    overflow: 'hidden',
  },
  achievementImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  achievementInfo: {
    padding: 16,
    gap: 8,
  },
  achievementName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  achievementDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  achievementDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  achievementDate: {
    fontSize: 12,
    color: '#4BA3F0',
    backgroundColor: 'rgba(75, 163, 240, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  achievementTags: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});
