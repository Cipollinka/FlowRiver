import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import art from '../../../assets/data/development.json';

export const Articles = () => {
  console.log(art);
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          width: '100%',
          height: 455,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 15,
            }}>
            {art.articles.map((item, index) => (
              <TouchableOpacity key={index} style={styles.items}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 1)',
                  }}>
                  {item.short_description}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}>
                  {item.content.slice(0, 125)}
                </Text>
                <View style={styles.time_container}>
                  <Image source={require('../../../assets/icons/clock.png')} />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '400',
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}>
                    {item.reading_time_minutes}min
                  </Text>
                </View>
                <View style={styles.result}>
                  <Image
                    source={require('../../../assets/icons/complite.png')}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '400',
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}>
                    Quest not complited
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: 'center',
  },
  items: {
    padding: 12,
    borderRadius: 16,
    width: 159,
    height: 262,
    borderColor: 'rgba(255, 255, 255, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  time_container: {
    flexDirection: 'row',
    width: 65,
    height: 21,
    paddingLeft: 10,
    paddingRight: 12,
    alignItems: 'center',
    gap: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 20,
  },
  result: {
    width: 126,
    height: 21,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(73, 75, 43, 1)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 20,
  },
});
