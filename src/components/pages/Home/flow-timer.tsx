import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {ScreenName, useNavigation} from '../../../../user/lib/hooks/use-navigation.tsx';
import {Recipe} from '../../../../user/types';

interface FlowTimerProps {
  route: {
    params: {
      recipe: Recipe;
      currentLesson: number;
    };
  };
}

export const FlowTimer = ({route}: FlowTimerProps) => {
  const navigation = useNavigation();
  const {recipe, currentLesson} = route.params;
  const [timeLeft, setTimeLeft] = useState(parseInt(recipe.lessonDuration) * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          const totalTime = parseInt(recipe.lessonDuration) * 60;
          setProgress((totalTime - newTime) / totalTime);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      handleEndTask();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleBack = () => {
    navigation.navigate(ScreenName.FlowDetails, {recipe});
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleEndTask = () => {
    if (currentLesson < parseInt(recipe.lessonCount)) {
      navigation.navigate(ScreenName.FlowTimer, {
        recipe,
        currentLesson: currentLesson + 1,
      });
    } else {
      navigation.navigate(ScreenName.FlowComplete, {recipe});
    }
  };

  const progressAngle = progress * 360;

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
            <Text style={styles.headerTitle}>Task {currentLesson}</Text>
            <TouchableOpacity onPress={handleEndTask}>
              <Text style={styles.endTask}>End task</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainContent}>
            <Text style={styles.flowName}>{recipe.name}</Text>
            <View style={styles.timerContainer}>
              <View style={styles.progressCircle}>
                <View 
                  style={[
                    styles.progressFill, 
                    { transform: [{ rotate: `${progressAngle}deg` }] }
                  ]} 
                />
              </View>
              <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
            </View>
            <View style={styles.controls}>
              {isRunning ? (
                <TouchableOpacity onPress={toggleTimer} style={styles.controlButton}>
                  <Image source={require('../../../assets/icons/pause.png')} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={toggleTimer} style={styles.controlButton}>
                  <Image source={require('../../../assets/icons/playe.png')} />
                </TouchableOpacity>
              )}
            </View>
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
  endTask: {
    fontSize: 17,
    color: '#4BA3F0',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  flowName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  timerContainer: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  progressCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
    borderWidth: 4,
    borderColor: '#4BA3F0',
    position: 'absolute',
    overflow: 'hidden',
  },
  progressFill: {
    width: '50%',
    height: '100%',
    position: 'absolute',
    right: 0,
    backgroundColor: '#4BA3F0',
    transformOrigin: 'left center',
  },
  timer: {
    fontSize: 48,
    fontWeight: '600',
    color: '#fff',
  },
  controls: {
    flexDirection: 'row',
    gap: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4BA3F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 