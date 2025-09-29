
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
import { TripPreferences } from '@/types/TripTypes';
import { TripService } from '@/services/TripService';
import { colors, commonStyles } from '@/styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/button';
import { IconSymbol } from '@/components/IconSymbol';
import HolidayImageGallery from '@/components/HolidayImageGallery';
import React, { useState } from 'react';
import { Stack, router } from 'expo-router';

export default function TripPlannerScreen() {
  const [preferences, setPreferences] = useState<TripPreferences>({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 1000,
    interests: [],
    hasJobInterview: false,
    interviewDate: '',
    interviewLocation: '',
    travelStyle: 'balanced',
    groupSize: 1
  });

  const interestOptions = [
    { id: 'tech-hubs', label: '💻 Tech Hubs', description: 'Visit innovation centers' },
    { id: 'networking', label: '🤝 Networking', description: 'Professional meetups' },
    { id: 'learning', label: '📚 Learning', description: 'Workshops & conferences' },
    { id: 'startups', label: '🚀 Startups', description: 'Startup ecosystems' },
    { id: 'culture', label: '🎨 Culture', description: 'Local culture & arts' },
    { id: 'innovation', label: '💡 Innovation', description: 'R&D centers & labs' }
  ];

  const popularDestinations = [
    { name: 'San Francisco', emoji: '🌉', description: 'Silicon Valley tech hub' },
    { name: 'Seattle', emoji: '🏔️', description: 'Microsoft & Amazon HQ' },
    { name: 'New York', emoji: '🗽', description: 'Financial & tech center' },
    { name: 'Austin', emoji: '🎸', description: 'Emerging tech scene' },
    { name: 'Berlin', emoji: '🇩🇪', description: 'European startup capital' },
    { name: 'London', emoji: '🇬🇧', description: 'Global financial hub' }
  ];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleDestinationSelect = (destination: string) => {
    setPreferences(prev => ({ ...prev, destination }));
  };

  const handleGenerateItinerary = () => {
    if (!preferences.destination || !preferences.startDate || !preferences.endDate) {
      Alert.alert('Missing Information', 'Please fill in destination and travel dates');
      return;
    }

    console.log('Generating itinerary with preferences:', preferences);
    
    try {
      const itinerary = TripService.generateItinerary(preferences);
      router.push({
        pathname: '/trip-results',
        params: { itinerary: JSON.stringify(itinerary) }
      });
    } catch (error) {
      console.error('Error generating itinerary:', error);
      Alert.alert('Error', 'Failed to generate itinerary. Please try again.');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Plan Your Trip",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShown: true,
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>🎯 Plan Your Career Journey</Text>
          <Text style={styles.headerSubtitle}>
            Create a professional travel experience that enhances your career prospects
          </Text>
        </LinearGradient>

        {/* Holiday Images for Inspiration */}
        <HolidayImageGallery 
          destination={preferences.destination || 'Popular Destinations'}
          showTitle={false}
        />

        {/* Quick Destination Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 Popular Destinations</Text>
          <View style={styles.destinationsGrid}>
            {popularDestinations.map((dest, index) => (
              <Pressable
                key={index}
                onPress={() => handleDestinationSelect(dest.name)}
                style={[
                  styles.destinationChip,
                  preferences.destination === dest.name && styles.destinationChipSelected
                ]}
              >
                <Text style={styles.destinationEmoji}>{dest.emoji}</Text>
                <Text style={[
                  styles.destinationName,
                  preferences.destination === dest.name && styles.destinationNameSelected
                ]}>
                  {dest.name}
                </Text>
                <Text style={[
                  styles.destinationDescription,
                  preferences.destination === dest.name && styles.destinationDescriptionSelected
                ]}>
                  {dest.description}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Custom Destination Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Or Enter Custom Destination</Text>
          <View style={styles.inputContainer}>
            <IconSymbol name="location" size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your destination..."
              value={preferences.destination}
              onChangeText={(text) => setPreferences(prev => ({ ...prev, destination: text }))}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

        {/* Travel Dates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Travel Dates</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateInput}>
              <Text style={styles.dateLabel}>Start Date</Text>
              <View style={styles.inputContainer}>
                <IconSymbol name="calendar" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={preferences.startDate}
                  onChangeText={(text) => setPreferences(prev => ({ ...prev, startDate: text }))}
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>
            <View style={styles.dateInput}>
              <Text style={styles.dateLabel}>End Date</Text>
              <View style={styles.inputContainer}>
                <IconSymbol name="calendar" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={preferences.endDate}
                  onChangeText={(text) => setPreferences(prev => ({ ...prev, endDate: text }))}
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Budget */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Budget Range</Text>
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetLabel}>Total Budget: ${preferences.budget}</Text>
            <View style={styles.budgetOptions}>
              {[500, 1000, 2000, 5000].map((amount) => (
                <Pressable
                  key={amount}
                  onPress={() => setPreferences(prev => ({ ...prev, budget: amount }))}
                  style={[
                    styles.budgetChip,
                    preferences.budget === amount && styles.budgetChipSelected
                  ]}
                >
                  <Text style={[
                    styles.budgetChipText,
                    preferences.budget === amount && styles.budgetChipTextSelected
                  ]}>
                    ${amount}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Your Interests</Text>
          <Text style={styles.sectionDescription}>
            Select activities that align with your career goals
          </Text>
          <View style={styles.interestsGrid}>
            {interestOptions.map((interest) => (
              <Pressable
                key={interest.id}
                onPress={() => handleInterestToggle(interest.id)}
                style={[
                  styles.interestCard,
                  preferences.interests.includes(interest.id) && styles.interestCardSelected
                ]}
              >
                <LinearGradient
                  colors={preferences.interests.includes(interest.id) 
                    ? colors.gradients.primary 
                    : [colors.cardAlt, colors.cardAlt]
                  }
                  style={styles.interestCardGradient}
                >
                  <Text style={[
                    styles.interestLabel,
                    preferences.interests.includes(interest.id) && styles.interestLabelSelected
                  ]}>
                    {interest.label}
                  </Text>
                  <Text style={[
                    styles.interestDescription,
                    preferences.interests.includes(interest.id) && styles.interestDescriptionSelected
                  ]}>
                    {interest.description}
                  </Text>
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Job Interview Option */}
        <View style={styles.section}>
          <LinearGradient
            colors={colors.gradients.accent}
            style={styles.interviewSection}
          >
            <View style={styles.interviewHeader}>
              <IconSymbol name="briefcase" size={24} color={colors.background} />
              <Text style={styles.interviewTitle}>Job Interview Planning</Text>
            </View>
            <Text style={styles.interviewDescription}>
              Do you have a job interview during this trip?
            </Text>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Include interview preparation</Text>
              <Switch
                value={preferences.hasJobInterview}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, hasJobInterview: value }))}
                trackColor={{ false: 'rgba(255,255,255,0.3)', true: colors.background }}
                thumbColor={preferences.hasJobInterview ? colors.primary : colors.background}
              />
            </View>
            
            {preferences.hasJobInterview && (
              <View style={styles.interviewDetails}>
                <View style={styles.inputContainer}>
                  <IconSymbol name="calendar" size={20} color={colors.background} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.interviewInput]}
                    placeholder="Interview Date (YYYY-MM-DD)"
                    value={preferences.interviewDate}
                    onChangeText={(text) => setPreferences(prev => ({ ...prev, interviewDate: text }))}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <IconSymbol name="building.2" size={20} color={colors.background} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.interviewInput]}
                    placeholder="Company/Location"
                    value={preferences.interviewLocation}
                    onChangeText={(text) => setPreferences(prev => ({ ...prev, interviewLocation: text }))}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                  />
                </View>
              </View>
            )}
          </LinearGradient>
        </View>

        {/* Generate Button */}
        <View style={styles.section}>
          <LinearGradient
            colors={colors.gradients.warm}
            style={styles.generateSection}
          >
            <Text style={styles.generateTitle}>Ready to Create Your Journey?</Text>
            <Text style={styles.generateDescription}>
              Generate a personalized itinerary that will impress recruiters and advance your career
            </Text>
            <Button
              onPress={handleGenerateItinerary}
              style={styles.generateButton}
              textStyle={styles.generateButtonText}
            >
              🚀 Generate My Professional Itinerary
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
  header: {
    padding: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  destinationChip: {
    backgroundColor: colors.cardAlt,
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  destinationChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  destinationEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  destinationName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: 4,
  },
  destinationNameSelected: {
    color: colors.background,
  },
  destinationDescription: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  destinationDescriptionSelected: {
    color: colors.background,
    opacity: 0.9,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardAlt,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.text,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
    marginBottom: 8,
  },
  budgetContainer: {
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: 16,
  },
  budgetOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  budgetChip: {
    backgroundColor: colors.cardAlt,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  budgetChipSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  budgetChipText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  budgetChipTextSelected: {
    color: colors.background,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  interestCardSelected: {
    // Selected state handled by gradient
  },
  interestCardGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  interestLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  interestLabelSelected: {
    color: colors.background,
  },
  interestDescription: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  interestDescriptionSelected: {
    color: colors.background,
    opacity: 0.9,
  },
  interviewSection: {
    borderRadius: 20,
    padding: 24,
  },
  interviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  interviewTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    marginLeft: 12,
  },
  interviewDescription: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    marginBottom: 20,
    opacity: 0.9,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: colors.background,
  },
  interviewDetails: {
    gap: 16,
  },
  interviewInput: {
    color: colors.background,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  generateSection: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  generateTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    textAlign: 'center',
    marginBottom: 12,
  },
  generateDescription: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    opacity: 0.9,
  },
  generateButton: {
    width: '100%',
    backgroundColor: colors.background,
    paddingVertical: 16,
    borderRadius: 16,
  },
  generateButtonText: {
    color: colors.tertiary,
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
});
