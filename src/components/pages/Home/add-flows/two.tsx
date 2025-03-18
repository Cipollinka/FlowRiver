import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet, SafeAreaView} from 'react-native';

// Масив зображень із унікальними ID
const images = [
  {id: 'img_1', src: require('../../../../assets/images/image_one_flow.png')},
  {id: 'img_2', src: require('../../../../assets/images/image_two_flow.png')},
  {id: 'img_3', src: require('../../../../assets/images/image_three_flow.png')},
  {id: 'img_4', src: require('../../../../assets/images/image_four_flow.png')},
  {id: 'img_5', src: require('../../../../assets/images/image_five_flow.png')},
  {id: 'img_6', src: require('../../../../assets/images/image_six_flow.png')},
  {id: 'img_7', src: require('../../../../assets/images/image_seven_flow.png')},
];

interface TwoProps {
  image?: string;
  setImage?: (value: string) => void;
}

export const Two = ({image, setImage}: TwoProps) => {
  // Початкове зображення - перше в масиві
  const [currentImageId, setCurrentImageId] = useState(images[0].id);

  // Отримуємо поточне зображення за ID
  const currentImage = images.find(img => img.id === currentImageId)?.src;

  useEffect(() => {
    if (setImage) {
      const selectedImage = images.find(img => img.id === currentImageId);
      if (selectedImage) {
        setImage(selectedImage.id);
      }
    }
  }, [currentImageId, setImage]);

  const nextImage = () => {
    const currentIndex = images.findIndex(img => img.id === currentImageId);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImageId(images[nextIndex].id);
  };

  const prevImage = () => {
    const currentIndex = images.findIndex(img => img.id === currentImageId);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImageId(images[prevIndex].id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select image for flow</Text>
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={prevImage} style={styles.arrow}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={currentImage} style={styles.image} />
        <TouchableOpacity onPress={nextImage} style={styles.arrow}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    gap: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  imageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#6D28D9',
    marginHorizontal: 10,
  },
  arrow: {
    padding: 10,
  },
  arrowText: {
    fontSize: 30,
    color: '#fff',
  },
});
