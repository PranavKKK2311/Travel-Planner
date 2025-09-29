
import { TripItinerary, Activity, SmartInsight } from '@/types/TripTypes';
import { TripService } from '@/services/TripService';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/button';
import { Image } from 'expo-image';
import HolidayImageGallery from '@/components/HolidayImageGallery';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Dimensions
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { IconSymbol } from '@/components/IconSymbol';

const { width } = Dimensions.get('window');

export default function TripResultsScreen() {
  const { itinerary: itineraryParam } = useLocalSearchParams();
  const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
  const [smartInsights, setSmartInsights] = useState<SmartInsight[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    if (itineraryParam) {
      try {
        const parsedItinerary = JSON.parse(itineraryParam as string);
        setItinerary(parsedItinerary);
        setSmartInsights(TripService.generateSmartInsights(parsedItinerary));
        console.log('Loaded itinerary:', parsedItinerary);
      } catch (error) {
        console.error('Error parsing itinerary:', error);
        Alert.alert('Error', 'Failed to load itinerary');
      }
    }
  }, [itineraryParam]);

  const getCategoryIcon = (category: Activity['category']) => {
    const icons = {
      'sightseeing': 'camera',
      'learning': 'book',
      'networking': 'person.2',
      'interview-prep': 'briefcase',
      'cultural': 'building.columns',
      'food': 'fork.knife'
    };
    return icons[category] || 'star';
  };

  const getCategoryGradient = (category: Activity['category']) => {
    const gradients = {
      'sightseeing': colors.gradients.primary,
      'learning': colors.gradients.accent,
      'networking': colors.gradients.secondary,
      'interview-prep': colors.gradients.warm,
      'cultural': colors.gradients.cool,
      'food': ['#FF6B6B', '#FF8E53']
    };
    return gradients[category] || colors.gradients.primary;
  };

  const getInsightIcon = (type: SmartInsight['type']) => {
    const icons = {
      'networking': 'person.2.fill',
      'learning': 'graduationcap.fill',
      'showcase': 'star.fill',
      'cost': 'dollarsign.circle.fill'
    };
    return icons[type] || 'lightbulb.fill';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleShareItinerary = () => {
    Alert.alert('Share Itinerary', 'Sharing functionality would be implemented here');
  };

  const handleExportItinerary = () => {
    Alert.alert('Export Itinerary', 'Export functionality would be implemented here');
  };

  if (!itinerary) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your itinerary...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Your Itinerary",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShown: true,
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with Destination Image */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop' }}
            style={styles.headerImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.headerOverlay}
          />
          <View style={styles.headerContent}>
            <Text style={styles.destinationTitle}>{itinerary.destination}</Text>
            <Text style={styles.dateRange}>
              {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{itinerary.days.length}</Text>
                <Text style={styles.statLabel}>Days</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>${itinerary.totalCost}</Text>
                <Text style={styles.statLabel}>Total Cost</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{itinerary.overallScore.toFixed(1)}</Text>
                <Text style={styles.statLabel}>Career Score</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Holiday Images for Inspiration */}
        <HolidayImageGallery 
          destination={itinerary.destination}
          showTitle={false}
          style={styles.imageGallery}
        />

        {/* Smart Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Smart Insights</Text>
          {smartInsights.map((insight, index) => (
            <LinearGradient
              key={index}
              colors={colors.gradients.cool}
              style={styles.insightCard}
            >
              <View style={styles.insightHeader}>
                <IconSymbol 
                  name={getInsightIcon(insight.type) as any} 
                  size={24} 
                  color={colors.background} 
                />
                <Text style={styles.insightTitle}>{insight.title}</Text>
              </View>
              <Text style={styles.insightDescription}>{insight.description}</Text>
              <Text style={styles.insightImpact}>{insight.impact}</Text>
            </LinearGradient>
          ))}
        </View>

        {/* Day Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Daily Itinerary</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.daySelector}
          >
            {itinerary.days.map((day, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedDay(index)}
                style={[
                  styles.dayTab,
                  selectedDay === index && styles.dayTabSelected
                ]}
              >
                <Text style={[
                  styles.dayTabText,
                  selectedDay === index && styles.dayTabTextSelected
                ]}>
                  Day {index + 1}
                </Text>
                <Text style={[
                  styles.dayTabDate,
                  selectedDay === index && styles.dayTabDateSelected
                ]}>
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Selected Day Activities */}
        <View style={styles.section}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayTitle}>
              Day {selectedDay + 1} - {formatDate(itinerary.days[selectedDay].date)}
            </Text>
            <View style={styles.dayStats}>
              <Text style={styles.dayCost}>
                ${itinerary.days[selectedDay].totalCost}
              </Text>
              <View style={styles.scoreContainer}>
                <IconSymbol name="star.fill" size={16} color="#FFD700" />
                <Text style={styles.dayScore}>
                  {itinerary.days[selectedDay].experienceScore.toFixed(1)}
                </Text>
              </View>
            </View>
          </View>

          {itinerary.days[selectedDay].activities.map((activity, index) => (
            <View key={activity.id} style={styles.activityCard}>
              <LinearGradient
                colors={getCategoryGradient(activity.category)}
                style={styles.activityIcon}
              >
                <IconSymbol 
                  name={getCategoryIcon(activity.category) as any} 
                  size={20} 
                  color={colors.background} 
                />
              </LinearGradient>
              
              <View style={styles.activityContent}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityName}>{activity.name}</Text>
                  <Text style={styles.activityCost}>${activity.cost}</Text>
                </View>
                
                <Text style={styles.activityDescription}>{activity.description}</Text>
                
                <View style={styles.activityDetails}>
                  <View style={styles.activityDetail}>
                    <IconSymbol name="location" size={14} color={colors.textSecondary} />
                    <Text style={styles.activityDetailText}>{activity.location}</Text>
                  </View>
                  <View style={styles.activityDetail}>
                    <IconSymbol name="clock" size={14} color={colors.textSecondary} />
                    <Text style={styles.activityDetailText}>{activity.duration}h</Text>
                  </View>
                  {activity.careerRelevance && (
                    <View style={styles.activityDetail}>
                      <IconSymbol name="star.fill" size={14} color="#FFD700" />
                      <Text style={styles.activityDetailText}>{activity.careerRelevance}/10</Text>
                    </View>
                  )}
                </View>
                
                {activity.professionalImpact && (
                  <View style={styles.professionalImpact}>
                    <Text style={styles.professionalImpactText}>
                      💼 {activity.professionalImpact}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Career Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Career Highlights</Text>
          <LinearGradient
            colors={colors.gradients.warm}
            style={styles.highlightsCard}
          >
            <Text style={styles.highlightsTitle}>
              Why This Trip Will Boost Your Career
            </Text>
            {itinerary.careerHighlights.map((highlight, index) => (
              <View key={index} style={styles.highlight}>
                <Text style={styles.highlightBullet}>✓</Text>
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </LinearGradient>
        </View>

        {/* Unique Selling Points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Unique Selling Points</Text>
          {itinerary.uniqueSellingPoints.map((usp, index) => (
            <View key={index} style={styles.uspCard}>
              <Text style={styles.uspText}>{usp}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <View style={styles.actionButtons}>
            <Button
              onPress={handleShareItinerary}
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
            >
              📤 Share Itinerary
            </Button>
            <Button
              onPress={handleExportItinerary}
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
            >
              📄 Export PDF
            </Button>
          </View>
          
          <LinearGradient
            colors={colors.gradients.primary}
            style={styles.finalCta}
          >
            <Text style={styles.finalCtaTitle}>Ready to Book Your Journey?</Text>
            <Text style={styles.finalCtaDescription}>
              This itinerary is designed to maximize your career opportunities
            </Text>
            <Button
              onPress={() => router.push('/')}
              style={styles.finalCtaButton}
              textStyle={styles.finalCtaButtonText}
            >
              🎯 Plan Another Trip
            </Button>
          </LinearGradient>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
  },
  headerContainer: {
    height: 250,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  headerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  destinationTitle: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    marginBottom: 8,
  },
  dateRange: {
    fontSize: 16,
    fontFamily: 'Nunito_500Medium',
    color: colors.background,
    opacity: 0.9,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    opacity: 0.8,
  },
  imageGallery: {
    marginVertical: 0,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
    marginBottom: 16,
  },
  insightCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.background,
    marginLeft: 12,
  },
  insightDescription: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    marginBottom: 8,
    opacity: 0.9,
  },
  insightImpact: {
    fontSize: 14,
    fontFamily: 'Nunito_500Medium',
    color: colors.background,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  daySelector: {
    marginBottom: 20,
  },
  dayTab: {
    backgroundColor: colors.cardAlt,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  dayTabSelected: {
    backgroundColor: colors.primary,
  },
  dayTabText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  dayTabTextSelected: {
    color: colors.background,
  },
  dayTabDate: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    marginTop: 2,
  },
  dayTabDateSelected: {
    color: colors.background,
    opacity: 0.9,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
    flex: 1,
  },
  dayStats: {
    alignItems: 'flex-end',
  },
  dayCost: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.secondary,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dayScore: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: colors.text,
    marginLeft: 4,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  activityCost: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.secondary,
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  activityDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  activityDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDetailText: {
    fontSize: 12,
    fontFamily: 'Nunito_500Medium',
    color: colors.textSecondary,
    marginLeft: 4,
  },
  professionalImpact: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    padding: 12,
  },
  professionalImpactText: {
    fontSize: 13,
    fontFamily: 'Nunito_500Medium',
    color: colors.text,
    lineHeight: 18,
  },
  highlightsCard: {
    borderRadius: 16,
    padding: 20,
  },
  highlightsTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    marginBottom: 16,
    textAlign: 'center',
  },
  highlight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  highlightBullet: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    marginRight: 12,
    marginTop: 2,
  },
  highlightText: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    flex: 1,
    lineHeight: 22,
  },
  uspCard: {
    backgroundColor: colors.cardAlt,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  uspText: {
    fontSize: 15,
    fontFamily: 'Nunito_500Medium',
    color: colors.text,
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  finalCta: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  finalCtaTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    textAlign: 'center',
    marginBottom: 8,
  },
  finalCtaDescription: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  finalCtaButton: {
    width: '100%',
    backgroundColor: colors.background,
    paddingVertical: 16,
    borderRadius: 16,
  },
  finalCtaButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
});
