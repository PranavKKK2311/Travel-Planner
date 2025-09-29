
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
import { Button } from '@/components/button';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { TripItinerary, Activity, AIInsight } from '@/types/TripTypes';
import { AITripService } from '@/services/AITripService';

export default function TripResultsScreen() {
  const { itinerary: itineraryParam } = useLocalSearchParams();
  const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    if (itineraryParam && typeof itineraryParam === 'string') {
      try {
        const parsedItinerary = JSON.parse(itineraryParam);
        setItinerary(parsedItinerary);
        setInsights(AITripService.generateAIInsights(parsedItinerary));
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
      <View style={commonStyles.container}>
        <Text style={commonStyles.text}>Loading your AI-optimized itinerary...</Text>
      </View>
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

  const getCategoryColor = (category: Activity['category']) => {
    switch (category) {
      case 'networking': return colors.primary;
      case 'learning': return colors.secondary;
      case 'sightseeing': return colors.accent;
      case 'interview-prep': return colors.error;
      case 'relaxation': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getInsightIcon = (type: AIInsight['type']) => {
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
      'This feature would allow you to share your AI-optimized itinerary with recruiters or on professional networks.',
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
          title: 'Your AI Trip Plan',
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
        <View style={styles.header}>
          <Text style={commonStyles.title}>🎯 {itinerary.destination}</Text>
          <Text style={commonStyles.textSecondary}>
            {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
          </Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>${itinerary.totalCost}</Text>
              <Text style={styles.summaryLabel}>Total Cost</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{itinerary.overallAiScore.toFixed(1)}/10</Text>
              <Text style={styles.summaryLabel}>AI Score</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{itinerary.days.length}</Text>
              <Text style={styles.summaryLabel}>Days</Text>
            </View>
          </View>
        </View>

        {/* Unique Selling Points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Unique Selling Points</Text>
          {itinerary.uniqueSellingPoints.map((usp, index) => (
            <View key={index} style={styles.uspCard}>
              <Text style={styles.uspText}>{usp}</Text>
            </View>
          ))}
        </View>

        {/* AI Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🤖 AI Insights</Text>
          {insights.map((insight, index) => (
            <View key={index} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <Text style={styles.insightIcon}>{getInsightIcon(insight.type)}</Text>
                <Text style={styles.insightTitle}>{insight.title}</Text>
              </View>
              <Text style={styles.insightDescription}>{insight.description}</Text>
              <Text style={styles.insightImpact}>💡 {insight.impact}</Text>
            </View>
          ))}
        </View>

        {/* Day Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Daily Itinerary</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daySelector}>
            {itinerary.days.map((day, index) => (
              <Pressable
                key={index}
                style={[
                  styles.dayTab,
                  selectedDay === index && styles.selectedDayTab
                ]}
                onPress={() => setSelectedDay(index)}
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
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Selected Day Activities */}
        <View style={styles.section}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayTitle}>
              {formatDate(itinerary.days[selectedDay].date)}
            </Text>
            <View style={styles.dayStats}>
              <Text style={styles.dayStat}>
                ${itinerary.days[selectedDay].totalCost} • AI Score: {itinerary.days[selectedDay].aiScore.toFixed(1)}/10
              </Text>
            </View>
          </View>

          {itinerary.days[selectedDay].activities.map((activity, index) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <View style={styles.activityIcon}>
                  <Text style={styles.activityIconText}>
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
              
              {activity.aiRelevance && (
                <View style={styles.aiRelevanceBar}>
                  <Text style={styles.aiRelevanceLabel}>AI Relevance:</Text>
                  <View style={styles.aiRelevanceTrack}>
                    <View 
                      style={[
                        styles.aiRelevanceFill, 
                        { width: `${activity.aiRelevance * 10}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.aiRelevanceScore}>{activity.aiRelevance}/10</Text>
                </View>
              )}
              
              {activity.recruiterImpact && (
                <View style={styles.recruiterImpact}>
                  <Text style={styles.recruiterImpactLabel}>🎯 Recruiter Impact:</Text>
                  <Text style={styles.recruiterImpactText}>{activity.recruiterImpact}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Recruiter Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Recruiter Highlights</Text>
          <Text style={commonStyles.textSecondary}>
            Key points to mention in interviews:
          </Text>
          {itinerary.recruiterHighlights.map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              <Text style={styles.highlightBullet}>•</Text>
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <Button
            onPress={handleExportItinerary}
            style={styles.actionButton}
            variant="outline"
          >
            📄 Export Itinerary
          </Button>
          
          <Button
            onPress={() => router.push('/trip-planner')}
            style={styles.actionButton}
          >
            🔄 Plan Another Trip
          </Button>
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
  header: {
    padding: 20,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  uspCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  uspText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  insightCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  insightDescription: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  insightImpact: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  daySelector: {
    marginBottom: 16,
  },
  dayTab: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 60,
  },
  selectedDayTab: {
    backgroundColor: colors.primary,
  },
  dayTabText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
  selectedDayTabText: {
    color: colors.background,
  },
  dayTabDate: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  dayHeader: {
    marginBottom: 16,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  dayStats: {
    marginTop: 4,
  },
  dayStat: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  activityCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 18,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  activityLocation: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  activityMeta: {
    alignItems: 'flex-end',
  },
  activityDuration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  activityCost: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  activityDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  aiRelevanceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiRelevanceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginRight: 8,
  },
  aiRelevanceTrack: {
    flex: 1,
    height: 4,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 2,
    marginRight: 8,
  },
  aiRelevanceFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  aiRelevanceScore: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  recruiterImpact: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    padding: 12,
  },
  recruiterImpactLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  recruiterImpactText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  highlightBullet: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 8,
    marginTop: 2,
  },
  highlightText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
  actionSection: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  headerButton: {
    padding: 8,
  },
});
