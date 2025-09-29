
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
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/button';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { TripPreferences } from '@/types/TripTypes';
import { TripService } from '@/services/TripService';

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
    careerFocus: 'engineering'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const interests = [
    'Technology', 'Innovation', 'Startups', 'Networking', 
    'Learning', 'Research', 'Design', 'Business', 'Leadership'
  ];

  const travelStyles = [
    { key: 'budget', label: 'Budget-Friendly', icon: '💰', gradient: colors.gradients.accent },
    { key: 'mid-range', label: 'Mid-Range', icon: '🏨', gradient: colors.gradients.primary },
    { key: 'luxury', label: 'Luxury', icon: '✨', gradient: colors.gradients.secondary }
  ] as const;

  const careerFocuses = [
    { key: 'engineering', label: 'Engineering', icon: '⚙️', gradient: colors.gradients.primary },
    { key: 'tech', label: 'General Tech', icon: '💻', gradient: colors.gradients.cool },
    { key: 'startup', label: 'Startup', icon: '🚀', gradient: colors.gradients.warm },
    { key: 'research', label: 'Research', icon: '🔬', gradient: colors.gradients.accent },
    { key: 'other', label: 'Other', icon: '🎯', gradient: colors.gradients.secondary }
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
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const itinerary = TripService.generateItinerary(preferences);
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
          title: 'Plan Your Trip',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.headerTitle}>🌟 Smart Trip Planner</Text>
          <Text style={styles.headerSubtitle}>
            Plan your perfect trip optimized for career success
          </Text>
        </LinearGradient>

        {/* Destination */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Destination</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Where are you traveling? (e.g., San Francisco, London)"
              placeholderTextColor={colors.textLight}
              value={preferences.destination}
              onChangeText={(text) => setPreferences(prev => ({ ...prev, destination: text }))}
            />
          </View>
        </View>

        {/* Travel Dates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Travel Dates</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateInput}>
              <Text style={styles.inputLabel}>Start Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textLight}
                value={preferences.startDate}
                onChangeText={(text) => setPreferences(prev => ({ ...prev, startDate: text }))}
              />
            </View>
            <View style={styles.dateInput}>
              <Text style={styles.inputLabel}>End Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textLight}
                value={preferences.endDate}
                onChangeText={(text) => setPreferences(prev => ({ ...prev, endDate: text }))}
              />
            </View>
          </View>
        </View>

        {/* Career Focus */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💼 Career Focus</Text>
          <View style={styles.optionsGrid}>
            {careerFocuses.map((focus) => (
              <Pressable
                key={focus.key}
                onPress={() => setPreferences(prev => ({ ...prev, careerFocus: focus.key }))}
              >
                <LinearGradient
                  colors={preferences.careerFocus === focus.key ? focus.gradient : [colors.cardAlt, colors.cardAlt]}
                  style={[styles.optionCard, preferences.careerFocus === focus.key && styles.selectedOption]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.optionIcon}>{focus.icon}</Text>
                  <Text style={[
                    styles.optionText,
                    preferences.careerFocus === focus.key && styles.selectedOptionText
                  ]}>
                    {focus.label}
                  </Text>
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Interests */}
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
                <LinearGradient
                  colors={preferences.interests.includes(interest) ? colors.gradients.accent : [colors.cardAlt, colors.cardAlt]}
                  style={styles.interestGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={[
                    styles.interestText,
                    preferences.interests.includes(interest) && styles.selectedInterestText
                  ]}>
                    {interest}
                  </Text>
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Travel Style */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏨 Travel Style</Text>
          <View style={styles.optionsGrid}>
            {travelStyles.map((style) => (
              <Pressable
                key={style.key}
                onPress={() => setPreferences(prev => ({ ...prev, travelStyle: style.key }))}
              >
                <LinearGradient
                  colors={preferences.travelStyle === style.key ? style.gradient : [colors.cardAlt, colors.cardAlt]}
                  style={[styles.optionCard, preferences.travelStyle === style.key && styles.selectedOption]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.optionIcon}>{style.icon}</Text>
                  <Text style={[
                    styles.optionText,
                    preferences.travelStyle === style.key && styles.selectedOptionText
                  ]}>
                    {style.label}
                  </Text>
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Budget */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Budget</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Total budget in USD"
              placeholderTextColor={colors.textLight}
              value={preferences.budget.toString()}
              onChangeText={(text) => setPreferences(prev => ({ 
                ...prev, 
                budget: parseInt(text) || 0 
              }))}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Job Interview Toggle */}
        <View style={styles.section}>
          <View style={styles.switchContainer}>
            <LinearGradient
              colors={colors.gradients.cool}
              style={styles.switchCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.switchContent}>
                <View style={styles.switchInfo}>
                  <Text style={styles.switchTitle}>🎤 Job Interview</Text>
                  <Text style={styles.switchDescription}>
                    Do you have a job interview during this trip?
                  </Text>
                </View>
                <Switch
                  value={preferences.hasJobInterview}
                  onValueChange={(value) => setPreferences(prev => ({ 
                    ...prev, 
                    hasJobInterview: value 
                  }))}
                  trackColor={{ false: colors.grey, true: colors.background }}
                  thumbColor={preferences.hasJobInterview ? colors.primary : colors.background}
                />
              </View>
            </LinearGradient>
          </View>

          {preferences.hasJobInterview && (
            <View style={styles.interviewDetails}>
              <TextInput
                style={styles.input}
                placeholder="Interview Date (YYYY-MM-DD)"
                placeholderTextColor={colors.textLight}
                value={preferences.interviewDate}
                onChangeText={(text) => setPreferences(prev => ({ 
                  ...prev, 
                  interviewDate: text 
                }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Interview Location/Company"
                placeholderTextColor={colors.textLight}
                value={preferences.interviewLocation}
                onChangeText={(text) => setPreferences(prev => ({ 
                  ...prev, 
                  interviewLocation: text 
                }))}
              />
            </View>
          )}
        </View>

        {/* Generate Button */}
        <View style={styles.generateSection}>
          <LinearGradient
            colors={colors.gradients.warm}
            style={styles.generateButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Button
              onPress={handleGenerateItinerary}
              loading={isGenerating}
              disabled={isGenerating}
              style={styles.generateButtonInner}
              textStyle={styles.generateButtonText}
            >
              {isGenerating ? 'Creating Your Perfect Trip...' : '🚀 Generate My Optimized Trip'}
            </Button>
          </LinearGradient>
          
          <Text style={styles.disclaimer}>
            Our intelligent system considers your career goals, networking opportunities, 
            and professional appeal when crafting your perfect itinerary.
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
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
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
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: 16,
  },
  inputContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  input: {
    backgroundColor: colors.cardAlt,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 16,
  },
  dateInput: {
    flex: 1,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
    minHeight: 80,
    justifyContent: 'center',
  },
  selectedOption: {
    transform: [{ scale: 1.05 }],
  },
  optionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: colors.background,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestChip: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  interestGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  selectedInterest: {
    transform: [{ scale: 1.05 }],
  },
  interestText: {
    fontSize: 14,
    fontFamily: 'Nunito_500Medium',
    color: colors.text,
  },
  selectedInterestText: {
    color: colors.background,
  },
  switchContainer: {
    marginBottom: 16,
  },
  switchCard: {
    borderRadius: 16,
    padding: 2,
  },
  switchContent: {
    backgroundColor: colors.background,
    borderRadius: 14,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchInfo: {
    flex: 1,
  },
  switchTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  switchDescription: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
  },
  interviewDetails: {
    gap: 16,
  },
  generateSection: {
    padding: 20,
    alignItems: 'center',
  },
  generateButton: {
    width: '100%',
    borderRadius: 20,
    padding: 2,
    marginBottom: 16,
  },
  generateButtonInner: {
    backgroundColor: colors.background,
    borderRadius: 18,
    paddingVertical: 18,
  },
  generateButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.tertiary,
  },
  disclaimer: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});
