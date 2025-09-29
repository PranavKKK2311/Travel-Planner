
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Alert,
  Pressable
} from 'react-native';
import { Stack, router } from 'expo-router';
import { Button } from '@/components/button';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { TripPreferences } from '@/types/TripTypes';
import { AITripService } from '@/services/AITripService';

export default function TripPlannerScreen() {
  const [preferences, setPreferences] = useState<TripPreferences>({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 1000,
    interests: [],
    travelStyle: 'mid-range',
    groupSize: 1,
    hasJobInterview: false,
    interviewDate: '',
    interviewLocation: '',
    careerFocus: 'ai-engineering'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const interests = [
    'Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP',
    'Robotics', 'Data Science', 'Startups', 'Research', 'Networking'
  ];

  const travelStyles = [
    { key: 'budget', label: 'Budget-Friendly', icon: '💰' },
    { key: 'mid-range', label: 'Mid-Range', icon: '🏨' },
    { key: 'luxury', label: 'Luxury', icon: '✨' }
  ] as const;

  const careerFocuses = [
    { key: 'ai-engineering', label: 'AI Engineering', icon: '🤖' },
    { key: 'tech', label: 'General Tech', icon: '💻' },
    { key: 'startup', label: 'Startup', icon: '🚀' },
    { key: 'research', label: 'Research', icon: '🔬' },
    { key: 'other', label: 'Other', icon: '🎯' }
  ] as const;

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGenerateItinerary = async () => {
    if (!preferences.destination || !preferences.startDate || !preferences.endDate) {
      Alert.alert('Missing Information', 'Please fill in destination and dates');
      return;
    }

    if (preferences.hasJobInterview && (!preferences.interviewDate || !preferences.interviewLocation)) {
      Alert.alert('Interview Details', 'Please provide interview date and location');
      return;
    }

    setIsGenerating(true);
    console.log('Generating itinerary with preferences:', preferences);

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const itinerary = AITripService.generateItinerary(preferences);
      console.log('Generated itinerary:', itinerary);
      
      // Navigate to results screen with the generated itinerary
      router.push({
        pathname: '/trip-results',
        params: { itinerary: JSON.stringify(itinerary) }
      });
    } catch (error) {
      console.error('Error generating itinerary:', error);
      Alert.alert('Error', 'Failed to generate itinerary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'AI Trip Planner',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={commonStyles.title}>🤖 AI-Powered Trip Planner</Text>
          <Text style={commonStyles.textSecondary}>
            Plan your perfect trip optimized for AI career success
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Destination</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="Where are you traveling? (e.g., San Francisco, London)"
            value={preferences.destination}
            onChangeText={(text) => setPreferences(prev => ({ ...prev, destination: text }))}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Travel Dates</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateInput}>
              <Text style={styles.inputLabel}>Start Date</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="YYYY-MM-DD"
                value={preferences.startDate}
                onChangeText={(text) => setPreferences(prev => ({ ...prev, startDate: text }))}
              />
            </View>
            <View style={styles.dateInput}>
              <Text style={styles.inputLabel}>End Date</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="YYYY-MM-DD"
                value={preferences.endDate}
                onChangeText={(text) => setPreferences(prev => ({ ...prev, endDate: text }))}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💼 Career Focus</Text>
          <View style={styles.optionsGrid}>
            {careerFocuses.map((focus) => (
              <Pressable
                key={focus.key}
                style={[
                  styles.optionCard,
                  preferences.careerFocus === focus.key && styles.selectedOption
                ]}
                onPress={() => setPreferences(prev => ({ ...prev, careerFocus: focus.key }))}
              >
                <Text style={styles.optionIcon}>{focus.icon}</Text>
                <Text style={[
                  styles.optionText,
                  preferences.careerFocus === focus.key && styles.selectedOptionText
                ]}>
                  {focus.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Interests</Text>
          <View style={styles.interestsGrid}>
            {interests.map((interest) => (
              <Pressable
                key={interest}
                style={[
                  styles.interestChip,
                  preferences.interests.includes(interest) && styles.selectedInterest
                ]}
                onPress={() => handleInterestToggle(interest)}
              >
                <Text style={[
                  styles.interestText,
                  preferences.interests.includes(interest) && styles.selectedInterestText
                ]}>
                  {interest}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏨 Travel Style</Text>
          <View style={styles.optionsGrid}>
            {travelStyles.map((style) => (
              <Pressable
                key={style.key}
                style={[
                  styles.optionCard,
                  preferences.travelStyle === style.key && styles.selectedOption
                ]}
                onPress={() => setPreferences(prev => ({ ...prev, travelStyle: style.key }))}
              >
                <Text style={styles.optionIcon}>{style.icon}</Text>
                <Text style={[
                  styles.optionText,
                  preferences.travelStyle === style.key && styles.selectedOptionText
                ]}>
                  {style.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Budget</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="Total budget in USD"
            value={preferences.budget.toString()}
            onChangeText={(text) => setPreferences(prev => ({ 
              ...prev, 
              budget: parseInt(text) || 0 
            }))}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.sectionTitle}>🎤 Job Interview</Text>
              <Text style={commonStyles.textSecondary}>
                Do you have a job interview during this trip?
              </Text>
            </View>
            <Switch
              value={preferences.hasJobInterview}
              onValueChange={(value) => setPreferences(prev => ({ 
                ...prev, 
                hasJobInterview: value 
              }))}
              trackColor={{ false: colors.grey, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>

          {preferences.hasJobInterview && (
            <View style={styles.interviewDetails}>
              <TextInput
                style={commonStyles.input}
                placeholder="Interview Date (YYYY-MM-DD)"
                value={preferences.interviewDate}
                onChangeText={(text) => setPreferences(prev => ({ 
                  ...prev, 
                  interviewDate: text 
                }))}
              />
              <TextInput
                style={commonStyles.input}
                placeholder="Interview Location/Company"
                value={preferences.interviewLocation}
                onChangeText={(text) => setPreferences(prev => ({ 
                  ...prev, 
                  interviewLocation: text 
                }))}
              />
            </View>
          )}
        </View>

        <View style={styles.generateSection}>
          <Button
            onPress={handleGenerateItinerary}
            loading={isGenerating}
            disabled={isGenerating}
            style={styles.generateButton}
          >
            {isGenerating ? 'Generating AI Itinerary...' : '🚀 Generate AI-Optimized Trip'}
          </Button>
          
          <Text style={styles.disclaimer}>
            Our AI considers your career goals, networking opportunities, 
            and recruiter appeal when crafting your perfect itinerary.
          </Text>
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
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    marginBottom: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionCard: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: colors.background,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestChip: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedInterest: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  selectedInterestText: {
    color: colors.background,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  interviewDetails: {
    gap: 12,
  },
  generateSection: {
    padding: 20,
    alignItems: 'center',
  },
  generateButton: {
    width: '100%',
    marginBottom: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 20,
  },
});
