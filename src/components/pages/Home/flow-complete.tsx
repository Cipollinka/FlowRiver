import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import {ScreenName, useNavigation} from '../../../../user/lib/hooks/use-navigation.tsx';
import {Recipe} from '../../../../user/types';

interface FlowCompleteProps {
  route: {
    params: {
      recipe: Recipe;
    };
  };
}

export const FlowComplete = ({route}: FlowCompleteProps) => {
  const navigation = useNavigation();

  const handleBackToFlows = () => {
    navigation.navigate(ScreenName.Main);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../../assets/images/main_bg.png')}>
        <SafeAreaView style={styles.content}>
          <View style={styles.mainContent}>
            <View style={styles.confettiContainer}>
              {Array.from({length: 12}).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.confetti,
                    {
                      transform: [{rotate: `${index * 30}deg`}],
                      backgroundColor: index % 3 === 0 ? '#4BA3F0' : 
                                     index % 3 === 1 ? '#FF6B6B' : '#FFD93D',
                    },
                  ]}
                />
              ))}
            </View>
            <Text style={styles.congratsText}>Congratulations!</Text>
            <Text style={styles.subText}>
              Your task has been successfully completed
            </Text>
            <TouchableOpacity onPress={handleBackToFlows} style={styles.button}>
              <Text style={styles.buttonText}>Back to my flows</Text>
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
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  confettiContainer: {
    width: 200,
    height: 200,
    position: 'relative',
    marginBottom: 40,
  },
  confetti: {
    position: 'absolute',
    width: 20,
    height: 80,
    borderRadius: 10,
    opacity: 0.6,
    top: '50%',
    left: '50%',
    marginLeft: -10,
    marginTop: -40,
  },
  congratsText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  subText: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4BA3F0',
    borderRadius: 16,
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 