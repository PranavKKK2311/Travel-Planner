
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/button';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { TripItinerary, Activity, SmartInsight } from '@/types/TripTypes';
import { TripService } from '@/services/TripService';

export default function TripResultsScreen() {
  const { itinerary: itineraryParam } = useLocalSearchParams();
  const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
  const [insights, setInsights] = useState<SmartInsight[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    if (itineraryParam && typeof itineraryParam === 'string') {
      try {
        const parsedItinerary = JSON.parse(itineraryParam);
        setItinerary(parsedItinerary);
        setInsights(TripService.generateSmartInsights(parsedItinerary));
        console.log('Loaded itinerary:', parsedItinerary);
      } catch (error) {
        console.error('Error parsing itinerary:', error);
        Alert.alert('Error', 'Failed to load itinerary');
        router.back();
      }
    }
  }, [itineraryParam]);

  if (!itinerary) {
    return (
      <LinearGradient
        colors={colors.gradients.primary}
        style={commonStyles.container}
      >
        <Text style={styles.loadingText}>Creating your perfect itinerary...</Text>
      </LinearGradient>
    );
  }

  const getCategoryIcon = (category: Activity['category']) => {
    switch (category) {
      case 'networking': return '🤝';
      case 'learning': return '📚';
      case 'sightseeing': return '🏛️';
      case 'interview-prep': return '🎤';
      case 'relaxation': return '🧘';
      default: return '📍';
    }
  };

  const getCategoryGradient = (category: Activity['category']) => {
    switch (category) {
      case 'networking': return colors.gradients.primary;
      case 'learning': return colors.gradients.secondary;
      case 'sightseeing': return colors.gradients.accent;
      case 'interview-prep': return colors.gradients.warm;
      case 'relaxation': return colors.gradients.cool;
      default: return colors.gradients.primary;
    }
  };

  const getInsightIcon = (type: SmartInsight['type']) => {
    switch (type) {
      case 'networking': return '🌐';
      case 'learning': return '🎓';
      case 'showcase': return '⭐';
      case 'preparation': return '🎯';
      default: return '💡';
    }
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
    Alert.alert(
      'Share Itinerary',
      'This feature would allow you to share your optimized itinerary with colleagues or on professional networks.',
      [{ text: 'OK' }]
    );
  };

  const handleExportItinerary = () => {
    Alert.alert(
      'Export Itinerary',
      'This feature would export your itinerary as a PDF or calendar events.',
      [{ text: 'OK' }]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Your Perfect Trip',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerRight: () => (
            <Pressable onPress={handleShareItinerary} style={styles.headerButton}>
              <IconSymbol name="square.and.arrow.up" color={colors.primary} size={20} />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Summary */}
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.headerTitle}>🎯 {itinerary.destination}</Text>
          <Text style={styles.headerSubtitle}>
            {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
          </Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>${itinerary.totalCost}</Text>
              <Text style={styles.summaryLabel}>Total Cost</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{itinerary.overallScore.toFixed(1)}/10</Text>
              <Text style={styles.summaryLabel}>Experience Score</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{itinerary.days.length}</Text>
              <Text style={styles.summaryLabel}>Days</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Unique Selling Points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Unique Benefits</Text>
          {itinerary.uniqueSellingPoints.map((usp, index) => (
            <LinearGradient
              key={index}
              colors={colors.gradients.accent}
              style={styles.uspCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.uspContent}>
                <Text style={styles.uspText}>{usp}</Text>
              </View>
            </LinearGradient>
          ))}
        </View>

        {/* Smart Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧠 Smart Insights</Text>
          {insights.map((insight, index) => (
            <LinearGradient
              key={index}
              colors={colors.gradients.cool}
              style={styles.insightCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.insightContent}>
                <View style={styles.insightHeader}>
                  <Text style={styles.insightIcon}>{getInsightIcon(insight.type)}</Text>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                </View>
                <Text style={styles.insightDescription}>{insight.description}</Text>
                <Text style={styles.insightImpact}>💡 {insight.impact}</Text>
              </View>
            </LinearGradient>
          ))}
        </View>

        {/* Day Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Daily Itinerary</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daySelector}>
            {itinerary.days.map((day, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedDay(index)}
              >
                <LinearGradient
                  colors={selectedDay === index ? colors.gradients.secondary : [colors.cardAlt, colors.cardAlt]}
                  style={styles.dayTab}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={[
                    styles.dayTabText,
                    selectedDay === index && styles.selectedDayTabText
                  ]}>
                    Day {index + 1}
                  </Text>
                  <Text style={[
                    styles.dayTabDate,
                    selectedDay === index && styles.selectedDayTabText
                  ]}>
                    {new Date(day.date).getDate()}
                  </Text>
                </LinearGradient>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Selected Day Activities */}
        <View style={styles.section}>
          <LinearGradient
            colors={colors.gradients.warm}
            style={styles.dayHeader}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.dayTitle}>
              {formatDate(itinerary.days[selectedDay].date)}
            </Text>
            <Text style={styles.dayStat}>
              ${itinerary.days[selectedDay].totalCost} • Score: {itinerary.days[selectedDay].experienceScore.toFixed(1)}/10
            </Text>
          </LinearGradient>

          {itinerary.days[selectedDay].activities.map((activity, index) => (
            <LinearGradient
              key={activity.id}
              colors={getCategoryGradient(activity.category)}
              style={styles.activityCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.activityContent}>
                <View style={styles.activityHeader}>
                  <View style={styles.activityIconContainer}>
                    <Text style={styles.activityIcon}>
                      {getCategoryIcon(activity.category)}
                    </Text>
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityName}>{activity.name}</Text>
                    <Text style={styles.activityLocation}>📍 {activity.location}</Text>
                  </View>
                  <View style={styles.activityMeta}>
                    <Text style={styles.activityDuration}>{activity.duration}h</Text>
                    <Text style={styles.activityCost}>${activity.cost}</Text>
                  </View>
                </View>
                
                <Text style={styles.activityDescription}>{activity.description}</Text>
                
                {activity.careerRelevance && (
                  <View style={styles.relevanceBar}>
                    <Text style={styles.relevanceLabel}>Career Relevance:</Text>
                    <View style={styles.relevanceTrack}>
                      <LinearGradient
                        colors={colors.gradients.accent}
                        style={[styles.relevanceFill, { width: `${activity.careerRelevance * 10}%` }]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      />
                    </View>
                    <Text style={styles.relevanceScore}>{activity.careerRelevance}/10</Text>
                  </View>
                )}
                
                {activity.professionalImpact && (
                  <View style={styles.professionalImpact}>
                    <Text style={styles.professionalImpactLabel}>🎯 Professional Impact:</Text>
                    <Text style={styles.professionalImpactText}>{activity.professionalImpact}</Text>
                  </View>
                )}
              </View>
            </LinearGradient>
          ))}
        </View>

        {/* Career Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Career Highlights</Text>
          <Text style={styles.highlightsSubtitle}>
            Key points to mention in interviews:
          </Text>
          {itinerary.careerHighlights.map((highlight, index) => (
            <LinearGradient
              key={index}
              colors={colors.gradients.secondary}
              style={styles.highlightCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.highlightContent}>
                <Text style={styles.highlightBullet}>•</Text>
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            </LinearGradient>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <LinearGradient
            colors={colors.gradients.cool}
            style={styles.actionButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Button
              onPress={handleExportItinerary}
              style={styles.actionButtonInner}
              textStyle={styles.actionButtonText}
            >
              📄 Export Itinerary
            </Button>
          </LinearGradient>
          
          <LinearGradient
            colors={colors.gradients.warm}
            style={styles.actionButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Button
              onPress={() => router.push('/trip-planner')}
              style={styles.actionButtonInner}
              textStyle={styles.actionButtonText}
            >
              🔄 Plan Another Trip
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
  loadingText: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.background,
    textAlign: 'center',
  },
  header: {
    padding: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    marginBottom: 24,
    opacity: 0.9,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    marginTop: 4,
    opacity: 0.8,
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
  uspCard: {
    borderRadius: 16,
    marginBottom: 12,
    padding: 2,
  },
  uspContent: {
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 16,
  },
  uspText: {
    fontSize: 15,
    fontFamily: 'Nunito_500Medium',
    color: colors.text,
    lineHeight: 22,
  },
  insightCard: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 2,
  },
  insightContent: {
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 20,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  insightTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    flex: 1,
  },
  insightDescription: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 22,
  },
  insightImpact: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  daySelector: {
    marginBottom: 20,
  },
  dayTab: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  dayTabText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
  },
  selectedDayTabText: {
    color: colors.background,
  },
  dayTabDate: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
    marginTop: 2,
  },
  dayHeader: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  dayTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.background,
    marginBottom: 4,
  },
  dayStat: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    opacity: 0.9,
  },
  activityCard: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 2,
  },
  activityContent: {
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 20,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.cardAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  activityLocation: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
  },
  activityMeta: {
    alignItems: 'flex-end',
  },
  activityDuration: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
  },
  activityCost: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.primary,
    marginTop: 2,
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: colors.text,
    lineHeight: 20,
    marginBottom: 16,
  },
  relevanceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  relevanceLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: colors.textSecondary,
    marginRight: 12,
  },
  relevanceTrack: {
    flex: 1,
    height: 6,
    backgroundColor: colors.borderLight,
    borderRadius: 3,
    marginRight: 12,
    overflow: 'hidden',
  },
  relevanceFill: {
    height: '100%',
    borderRadius: 3,
  },
  relevanceScore: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.primary,
  },
  professionalImpact: {
    backgroundColor: colors.cardAlt,
    borderRadius: 12,
    padding: 16,
  },
  professionalImpactLabel: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: 6,
  },
  professionalImpactText: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    lineHeight: 18,
  },
  highlightsSubtitle: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    marginBottom: 16,
  },
  highlightCard: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 2,
  },
  highlightContent: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  highlightBullet: {
    fontSize: 18,
    color: colors.primary,
    marginRight: 12,
    marginTop: 2,
  },
  highlightText: {
    fontSize: 14,
    fontFamily: 'Nunito_500Medium',
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
  actionSection: {
    padding: 20,
    gap: 16,
  },
  actionButton: {
    borderRadius: 16,
    padding: 2,
  },
  actionButtonInner: {
    backgroundColor: colors.background,
    borderRadius: 14,
    paddingVertical: 16,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.primary,
  },
  headerButton: {
    padding: 8,
  },
});
