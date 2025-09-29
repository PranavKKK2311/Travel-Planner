
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';

interface DestinationCardProps {
  title: string;
  location: string;
  imageUrl: string;
  price: string;
  rating: number;
  highlights: string[];
  onPress?: () => void;
  style?: any;
}

export default function DestinationCard({
  title,
  location,
  imageUrl,
  price,
  rating,
  highlights,
  onPress,
  style
}: DestinationCardProps) {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            contentFit="cover"
            transition={300}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.imageOverlay}
          />
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{price}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <IconSymbol name="star.fill" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.locationRow}>
            <IconSymbol name="location" size={16} color={colors.textSecondary} />
            <Text style={styles.location}>{location}</Text>
          </View>
          
          <View style={styles.highlightsContainer}>
            {highlights.slice(0, 3).map((highlight, index) => (
              <View key={index} style={styles.highlight}>
                <LinearGradient
                  colors={colors.gradients.accent}
                  style={styles.highlightDot}
                />
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
          
          <LinearGradient
            colors={colors.gradients.primary}
            style={styles.exploreButton}
          >
            <Text style={styles.exploreButtonText}>Explore Destination</Text>
            <IconSymbol name="arrow.right" size={16} color={colors.background} />
          </LinearGradient>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  priceTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.primary,
  },
  ratingBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    color: colors.background,
    marginLeft: 4,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Nunito_500Medium',
    color: colors.textSecondary,
    marginLeft: 4,
  },
  highlightsContainer: {
    marginBottom: 20,
  },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  highlightText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: colors.text,
    flex: 1,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  exploreButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.background,
    marginRight: 8,
  },
});
