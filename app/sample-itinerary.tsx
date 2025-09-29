
import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { TripPreferences } from '@/types/TripTypes';
import { AITripService } from '@/services/AITripService';

export default function SampleItineraryScreen() {
  useEffect(() => {
    // Create a sample trip preferences
    const samplePreferences: TripPreferences = {
      destination: 'San Francisco, CA',
      startDate: '2024-03-15',
      endDate: '2024-03-18',
      budget: 2000,
      interests: ['Machine Learning', 'Deep Learning', 'Startups', 'Networking'],
      travelStyle: 'mid-range',
      groupSize: 1,
      hasJobInterview: true,
      interviewDate: '2024-03-16',
      interviewLocation: 'OpenAI Headquarters',
      careerFocus: 'ai-engineering'
    };

    // Generate sample itinerary
    const sampleItinerary = AITripService.generateItinerary(samplePreferences);
    
    // Navigate to results with sample data
    router.replace({
      pathname: '/trip-results',
      params: { itinerary: JSON.stringify(sampleItinerary) }
    });
  }, []);

  return null; // This component just redirects
}
