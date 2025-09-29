
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';

interface HolidayImage {
  id: string;
  url: string;
  title: string;
  location: string;
  description: string;
}

interface HolidayImageGalleryProps {
  destination?: string;
  style?: any;
  showTitle?: boolean;
}

const { width } = Dimensions.get('window');
const imageWidth = (width - 60) / 2;

export default function HolidayImageGallery({ 
  destination = 'Popular Destinations', 
  style,
  showTitle = true 
}: HolidayImageGalleryProps) {
  const [images, setImages] = useState<HolidayImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<HolidayImage | null>(null);

  useEffect(() => {
    generateHolidayImages();
  }, [destination]);

  const generateHolidayImages = () => {
    // Generate beautiful holiday destination images from Unsplash
    const destinations = [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        title: 'Mountain Paradise',
        location: 'Swiss Alps',
        description: 'Breathtaking alpine views and pristine snow-capped peaks'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
        title: 'Tropical Beach',
        location: 'Maldives',
        description: 'Crystal clear waters and white sandy beaches'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
        title: 'City Lights',
        location: 'Tokyo',
        description: 'Vibrant urban landscape with modern architecture'
      },
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1471919743851-c4df8b6ee133?w=400&h=300&fit=crop',
        title: 'Desert Sunset',
        location: 'Sahara Desert',
        description: 'Golden dunes and spectacular desert sunsets'
      },
      {
        id: '5',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        title: 'Northern Lights',
        location: 'Iceland',
        description: 'Magical aurora borealis dancing across the sky'
      },
      {
        id: '6',
        url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
        title: 'Ancient Wonders',
        location: 'Machu Picchu',
        description: 'Historic ruins nestled in the Andes mountains'
      },
      {
        id: '7',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        title: 'Coastal Beauty',
        location: 'Santorini',
        description: 'Stunning Greek island with blue-domed churches'
      },
      {
        id: '8',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        title: 'Forest Adventure',
        location: 'Amazon Rainforest',
        description: 'Lush green canopy and exotic wildlife'
      }
    ];

    setImages(destinations);
  };

  const handleImagePress = (image: HolidayImage) => {
    setSelectedImage(image);
    console.log('Selected destination:', image.title);
  };

  return (
    <View style={[styles.container, style]}>
      {showTitle && (
        <View style={styles.header}>
          <Text style={styles.title}>🌍 Discover Amazing Destinations</Text>
          <Text style={styles.subtitle}>Real-time holiday inspiration from around the world</Text>
        </View>
      )}

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {images.map((image, index) => (
          <Pressable
            key={image.id}
            onPress={() => handleImagePress(image)}
            style={[
              styles.imageCard,
              index === 0 && styles.firstCard,
              index === images.length - 1 && styles.lastCard
            ]}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image.url }}
                style={styles.image}
                contentFit="cover"
                transition={300}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.imageOverlay}
              />
              <View style={styles.imageContent}>
                <View style={styles.locationBadge}>
                  <IconSymbol name="location" size={12} color={colors.background} />
                  <Text style={styles.locationText}>{image.location}</Text>
                </View>
                <Text style={styles.imageTitle}>{image.title}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {selectedImage && (
        <View style={styles.selectedImageContainer}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={styles.selectedImageCard}
          >
            <View style={styles.selectedImageContent}>
              <IconSymbol name="star.fill" size={20} color={colors.background} />
              <Text style={styles.selectedImageTitle}>{selectedImage.title}</Text>
              <Text style={styles.selectedImageDescription}>{selectedImage.description}</Text>
            </View>
          </LinearGradient>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  scrollContainer: {
    paddingLeft: 20,
  },
  imageCard: {
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  firstCard: {
    marginLeft: 0,
  },
  lastCard: {
    marginRight: 20,
  },
  imageContainer: {
    width: imageWidth,
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    borderRadius: 16,
  },
  imageContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Nunito_500Medium',
    color: colors.background,
    marginLeft: 4,
  },
  imageTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.background,
    lineHeight: 20,
  },
  selectedImageContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  selectedImageCard: {
    borderRadius: 16,
    padding: 20,
  },
  selectedImageContent: {
    alignItems: 'center',
  },
  selectedImageTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  selectedImageDescription: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
  },
});
