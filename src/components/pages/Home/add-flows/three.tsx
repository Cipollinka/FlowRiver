import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView, 
  View,
} from 'react-native';

interface ThreeProps {
  selectedCategory: string;
  lessonDuration: string;
  lessonCount: string;
  setSelectedCategory: (value: string) => void;
  setLessonDuration: (value: string) => void;
  setLessonCount: (value: string) => void;
}

const categories = [
  {
    id: 'tasks',
    label: 'Tasks',
    icon: require('../../../../assets/icons/tasks.png'),
  },
  {
    id: 'learning',
    label: 'Learning',
    icon: require('../../../../assets/icons/tasks.png'),
  },
  {
    id: 'self-development',
    label: 'Self-development',
    icon: require('../../../../assets/icons/tasks.png'),
  },
  {
    id: 'language',
    label: 'Language',
    icon: require('../../../../assets/icons/tasks.png'),
  },
];

export const Three = ({
  selectedCategory,
  lessonDuration,
  lessonCount,
  setSelectedCategory,
  setLessonDuration,
  setLessonCount,
}: ThreeProps) => {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select a flow category</Text>

      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={styles.radioButton}
          onPress={() => setSelectedCategory(category.id)}>
          <View style={styles.radioOuter}>
            {selectedCategory === category.id && (
              <View style={styles.radioInner} />
            )}
          </View>
          <Image source={category.icon} style={{marginRight: 10}}/>
          <Text style={styles.radioText}>{category.label}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>How long one lesson/task lasts</Text>
      <TextInput
        style={styles.input}
        placeholder="0 min"
        placeholderTextColor="#A0A0A0"
        keyboardType="numeric"
        value={lessonDuration}
        onChangeText={setLessonDuration}
      />

      <Text style={styles.label}>
        How many total lessons/tasks you have in your flow
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the quantity"
        placeholderTextColor="#A0A0A0"
        keyboardType="numeric"
        value={lessonCount}
        onChangeText={setLessonCount}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4BA3F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4BA3F0',
  },
  radioText: {
    color: '#fff',
    fontSize: 16,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1B263B',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4BA3F0',
    fontSize: 16,
  },
});
