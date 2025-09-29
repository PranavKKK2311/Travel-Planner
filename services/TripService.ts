
import { TripPreferences, TripItinerary, Activity, DayItinerary, SmartInsight } from '@/types/TripTypes';

export class TripService {
  private static techCompanies = [
    'Google', 'Microsoft', 'Apple', 'Meta', 'Amazon', 'Netflix',
    'NVIDIA', 'Tesla', 'Uber', 'Airbnb', 'Spotify', 'Adobe'
  ];

  private static techHubs = [
    'Silicon Valley', 'Seattle', 'Austin', 'Boston', 'New York', 'London',
    'Berlin', 'Tel Aviv', 'Singapore', 'Toronto', 'Vancouver', 'Amsterdam'
  ];

  private static professionalEvents = [
    'Tech Conference', 'Professional Meetup', 'Industry Networking Event',
    'Startup Pitch Night', 'Innovation Symposium', 'Skills Workshop'
  ];

  static generateItinerary(preferences: TripPreferences): TripItinerary {
    console.log('Generating personalized itinerary for:', preferences.destination);
    
    const days = this.generateDays(preferences);
    const totalCost = days.reduce((sum, day) => sum + day.totalCost, 0);
    const overallScore = days.reduce((sum, day) => sum + day.experienceScore, 0) / days.length;
    
    return {
      id: `trip_${Date.now()}`,
      destination: preferences.destination,
      startDate: preferences.startDate,
      endDate: preferences.endDate,
      days,
      totalCost,
      overallScore,
      careerHighlights: this.generateCareerHighlights(preferences, days),
      uniqueSellingPoints: this.generateUSPs(preferences, days)
    };
  }

  private static generateDays(preferences: TripPreferences): DayItinerary[] {
    const startDate = new Date(preferences.startDate);
    const endDate = new Date(preferences.endDate);
    const days: DayItinerary[] = [];
    
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const isInterviewDay = preferences.hasJobInterview && 
        preferences.interviewDate === currentDate.toISOString().split('T')[0];
      
      const activities = this.generateActivitiesForDay(preferences, i, totalDays, isInterviewDay);
      const totalCost = activities.reduce((sum, activity) => sum + activity.cost, 0);
      const experienceScore = activities.reduce((sum, activity) => sum + (activity.careerRelevance || 0), 0) / activities.length;
      
      days.push({
        date: currentDate.toISOString().split('T')[0],
        activities,
        totalCost,
        experienceScore
      });
    }
    
    return days;
  }

  private static generateActivitiesForDay(
    preferences: TripPreferences, 
    dayIndex: number, 
    totalDays: number, 
    isInterviewDay: boolean
  ): Activity[] {
    const activities: Activity[] = [];
    
    if (isInterviewDay) {
      // Interview day activities
      activities.push({
        id: `interview_${dayIndex}`,
        name: 'Job Interview Preparation',
        description: 'Final preparation and interview at target company',
        location: preferences.interviewLocation || 'Interview Location',
        duration: 4,
        cost: 0,
        category: 'interview-prep',
        careerRelevance: 10,
        professionalImpact: 'Shows dedication by traveling for the opportunity'
      });
      
      activities.push({
        id: `networking_${dayIndex}`,
        name: 'Post-Interview Networking',
        description: 'Connect with local professionals and potential colleagues',
        location: 'Local Tech Hub',
        duration: 2,
        cost: 50,
        category: 'networking',
        careerRelevance: 9,
        professionalImpact: 'Demonstrates proactive networking skills'
      });
    } else {
      // Regular day activities based on preferences
      if (dayIndex === 0) {
        // Arrival day
        activities.push(this.createActivity(
          `arrival_${dayIndex}`,
          'Arrival & City Orientation',
          'Get oriented with the city and visit key tech districts',
          'City Center',
          3,
          30,
          'sightseeing',
          6,
          'Shows adaptability and exploration mindset'
        ));
      }
      
      // Add career-relevant activities
      const careerActivity = this.generateCareerActivity(preferences, dayIndex);
      activities.push(careerActivity);
      
      // Add learning activity
      const learningActivity = this.generateLearningActivity(preferences, dayIndex);
      activities.push(learningActivity);
      
      // Add networking if not last day
      if (dayIndex < totalDays - 1) {
        const networkingActivity = this.generateNetworkingActivity(preferences, dayIndex);
        activities.push(networkingActivity);
      }
    }
    
    return activities;
  }

  private static generateCareerActivity(preferences: TripPreferences, dayIndex: number): Activity {
    const careerLocations = [
      'Tech Company Campus Visit',
      'Innovation District Exploration',
      'Startup Hub Visit',
      'University Tech Department Tour',
      'Industry Research Center'
    ];
    
    const location = careerLocations[dayIndex % careerLocations.length];
    const company = this.techCompanies[Math.floor(Math.random() * this.techCompanies.length)];
    
    return this.createActivity(
      `career_${dayIndex}`,
      `${location} - ${company} Area`,
      `Explore the ${company} ecosystem and learn about their innovative initiatives`,
      location,
      3,
      preferences.budget > 1000 ? 100 : 50,
      'learning',
      9,
      `Shows genuine interest in industry leaders like ${company}`
    );
  }

  private static generateLearningActivity(preferences: TripPreferences, dayIndex: number): Activity {
    const learningActivities = [
      'Professional Workshop Attendance',
      'Skills Development Bootcamp',
      'Industry Seminar',
      'Tech Talk at Local University',
      'Innovation Lab Session'
    ];
    
    const activity = learningActivities[dayIndex % learningActivities.length];
    const event = this.professionalEvents[Math.floor(Math.random() * this.professionalEvents.length)];
    
    return this.createActivity(
      `learning_${dayIndex}`,
      `${activity} - ${event}`,
      'Enhance technical skills and stay updated with latest industry trends',
      'Tech Hub',
      4,
      preferences.budget > 1000 ? 150 : 75,
      'learning',
      8,
      'Demonstrates commitment to continuous learning and skill development'
    );
  }

  private static generateNetworkingActivity(preferences: TripPreferences, dayIndex: number): Activity {
    const networkingEvents = [
      'Tech Professionals Meetup',
      'Startup Networking Event',
      'Industry Conference Networking',
      'Alumni Tech Gathering',
      'Innovation Hub Social Event'
    ];
    
    const event = networkingEvents[dayIndex % networkingEvents.length];
    
    return this.createActivity(
      `networking_${dayIndex}`,
      event,
      'Connect with industry professionals and expand your network',
      'Tech District',
      2,
      40,
      'networking',
      7,
      'Shows strong networking skills and industry engagement'
    );
  }

  private static createActivity(
    id: string,
    name: string,
    description: string,
    location: string,
    duration: number,
    cost: number,
    category: Activity['category'],
    careerRelevance: number,
    professionalImpact: string
  ): Activity {
    return {
      id,
      name,
      description,
      location,
      duration,
      cost,
      category,
      careerRelevance,
      professionalImpact
    };
  }

  private static generateCareerHighlights(preferences: TripPreferences, days: DayItinerary[]): string[] {
    const highlights = [
      'Proactive approach to career development through strategic travel',
      'Strong networking skills demonstrated by connecting with industry professionals',
      'Commitment to continuous learning and professional development',
      'Cultural adaptability and global mindset',
      'Strategic thinking in combining travel with career advancement'
    ];
    
    if (preferences.hasJobInterview) {
      highlights.unshift('Dedication shown by traveling specifically for interview opportunity');
    }
    
    const totalProfessionalActivities = days.reduce((sum, day) => 
      sum + day.activities.filter(a => a.category === 'learning' || a.category === 'networking').length, 0
    );
    
    if (totalProfessionalActivities > 5) {
      highlights.push('Extensive engagement with professional community and learning opportunities');
    }
    
    return highlights.slice(0, 5);
  }

  private static generateUSPs(preferences: TripPreferences, days: DayItinerary[]): string[] {
    return [
      '🎯 Career-Optimized Itinerary: Every activity strategically chosen to enhance your professional prospects',
      '💼 Professional-Focused Planning: Activities designed to create compelling interview stories',
      '🌐 Global Network Building: Connect with professionals across international tech hubs',
      '📈 Skill-Building Integration: Combine travel with hands-on learning experiences',
      '💡 Innovation Immersion: Deep dive into tech ecosystems and startup cultures',
      '⭐ Experience Generator: Create memorable experiences that stand out in interviews'
    ];
  }

  static generateSmartInsights(itinerary: TripItinerary): SmartInsight[] {
    const insights: SmartInsight[] = [];
    
    // Networking insight
    const networkingActivities = itinerary.days.reduce((sum, day) => 
      sum + day.activities.filter(a => a.category === 'networking').length, 0
    );
    
    if (networkingActivities > 0) {
      insights.push({
        type: 'networking',
        title: 'Strategic Networking Opportunities',
        description: `${networkingActivities} networking events planned to expand your professional network`,
        impact: 'Builds valuable connections that can lead to job referrals and industry insights'
      });
    }
    
    // Learning insight
    const learningActivities = itinerary.days.reduce((sum, day) => 
      sum + day.activities.filter(a => a.category === 'learning').length, 0
    );
    
    if (learningActivities > 0) {
      insights.push({
        type: 'learning',
        title: 'Continuous Learning Focus',
        description: `${learningActivities} learning activities to enhance your expertise`,
        impact: 'Demonstrates commitment to staying current with industry trends and technologies'
      });
    }
    
    // Showcase insight
    insights.push({
      type: 'showcase',
      title: 'Interview Story Material',
      description: 'Each activity creates compelling stories for behavioral interviews',
      impact: 'Provides concrete examples of initiative, learning, and cultural adaptability'
    });
    
    return insights;
  }
}
