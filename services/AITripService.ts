
import { TripPreferences, TripItinerary, Activity, DayItinerary, AIInsight } from '@/types/TripTypes';

export class AITripService {
  private static aiCompanies = [
    'Google AI', 'OpenAI', 'Anthropic', 'DeepMind', 'Meta AI', 'Microsoft Research',
    'NVIDIA', 'Tesla AI', 'Uber AI', 'Airbnb AI', 'Netflix ML', 'Amazon AI'
  ];

  private static techHubs = [
    'Silicon Valley', 'Seattle', 'Austin', 'Boston', 'New York', 'London',
    'Berlin', 'Tel Aviv', 'Singapore', 'Toronto', 'Vancouver', 'Amsterdam'
  ];

  private static aiEvents = [
    'AI Conference', 'Machine Learning Meetup', 'Tech Networking Event',
    'Startup Pitch Night', 'AI Research Symposium', 'Data Science Workshop'
  ];

  static generateItinerary(preferences: TripPreferences): TripItinerary {
    console.log('Generating AI-optimized itinerary for:', preferences.destination);
    
    const days = this.generateDays(preferences);
    const totalCost = days.reduce((sum, day) => sum + day.totalCost, 0);
    const overallAiScore = days.reduce((sum, day) => sum + day.aiScore, 0) / days.length;
    
    return {
      id: `trip_${Date.now()}`,
      destination: preferences.destination,
      startDate: preferences.startDate,
      endDate: preferences.endDate,
      days,
      totalCost,
      overallAiScore,
      recruiterHighlights: this.generateRecruiterHighlights(preferences, days),
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
      const aiScore = activities.reduce((sum, activity) => sum + (activity.aiRelevance || 0), 0) / activities.length;
      
      days.push({
        date: currentDate.toISOString().split('T')[0],
        activities,
        totalCost,
        aiScore
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
        aiRelevance: 10,
        recruiterImpact: 'Shows dedication by traveling for the opportunity'
      });
      
      activities.push({
        id: `networking_${dayIndex}`,
        name: 'Post-Interview Networking',
        description: 'Connect with local AI professionals and potential colleagues',
        location: 'Local Tech Hub',
        duration: 2,
        cost: 50,
        category: 'networking',
        aiRelevance: 9,
        recruiterImpact: 'Demonstrates proactive networking skills'
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
      
      // Add AI-relevant activities
      const aiActivity = this.generateAIActivity(preferences, dayIndex);
      activities.push(aiActivity);
      
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

  private static generateAIActivity(preferences: TripPreferences, dayIndex: number): Activity {
    const aiLocations = [
      'AI Research Lab Tour',
      'Tech Company Campus Visit',
      'Innovation District Exploration',
      'AI Startup Hub Visit',
      'University AI Department Tour'
    ];
    
    const location = aiLocations[dayIndex % aiLocations.length];
    const company = this.aiCompanies[Math.floor(Math.random() * this.aiCompanies.length)];
    
    return this.createActivity(
      `ai_${dayIndex}`,
      `${location} - ${company} Area`,
      `Explore the ${company} ecosystem and learn about their AI initiatives`,
      location,
      3,
      preferences.budget > 1000 ? 100 : 50,
      'learning',
      9,
      `Shows genuine interest in AI industry leaders like ${company}`
    );
  }

  private static generateLearningActivity(preferences: TripPreferences, dayIndex: number): Activity {
    const learningActivities = [
      'AI Workshop Attendance',
      'Machine Learning Bootcamp',
      'Data Science Seminar',
      'Tech Talk at Local University',
      'Open Source Contribution Session'
    ];
    
    const activity = learningActivities[dayIndex % learningActivities.length];
    const event = this.aiEvents[Math.floor(Math.random() * this.aiEvents.length)];
    
    return this.createActivity(
      `learning_${dayIndex}`,
      `${activity} - ${event}`,
      'Enhance technical skills and stay updated with latest AI trends',
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
      'AI Professionals Meetup',
      'Tech Startup Networking Event',
      'Industry Conference Networking',
      'Alumni Tech Gathering',
      'Innovation Hub Social Event'
    ];
    
    const event = networkingEvents[dayIndex % networkingEvents.length];
    
    return this.createActivity(
      `networking_${dayIndex}`,
      event,
      'Connect with AI professionals and expand your network',
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
    aiRelevance: number,
    recruiterImpact: string
  ): Activity {
    return {
      id,
      name,
      description,
      location,
      duration,
      cost,
      category,
      aiRelevance,
      recruiterImpact
    };
  }

  private static generateRecruiterHighlights(preferences: TripPreferences, days: DayItinerary[]): string[] {
    const highlights = [
      'Proactive approach to career development through strategic travel',
      'Strong networking skills demonstrated by connecting with AI professionals',
      'Commitment to continuous learning in AI and machine learning',
      'Cultural adaptability and global mindset',
      'Strategic thinking in combining travel with career advancement'
    ];
    
    if (preferences.hasJobInterview) {
      highlights.unshift('Dedication shown by traveling specifically for interview opportunity');
    }
    
    const totalAIActivities = days.reduce((sum, day) => 
      sum + day.activities.filter(a => a.category === 'learning' || a.category === 'networking').length, 0
    );
    
    if (totalAIActivities > 5) {
      highlights.push('Extensive engagement with AI community and learning opportunities');
    }
    
    return highlights.slice(0, 5);
  }

  private static generateUSPs(preferences: TripPreferences, days: DayItinerary[]): string[] {
    return [
      '🤖 AI-Optimized Itinerary: Every activity strategically chosen to enhance AI career prospects',
      '🎯 Recruiter-Focused Planning: Activities designed to create compelling interview stories',
      '🌐 Global AI Network Building: Connect with professionals across international AI hubs',
      '📈 Skill-Building Integration: Combine travel with hands-on AI learning experiences',
      '💡 Innovation Immersion: Deep dive into AI ecosystems and startup cultures',
      '🎪 Interview Story Generator: Create memorable experiences that stand out in interviews'
    ];
  }

  static generateAIInsights(itinerary: TripItinerary): AIInsight[] {
    const insights: AIInsight[] = [];
    
    // Networking insight
    const networkingActivities = itinerary.days.reduce((sum, day) => 
      sum + day.activities.filter(a => a.category === 'networking').length, 0
    );
    
    if (networkingActivities > 0) {
      insights.push({
        type: 'networking',
        title: 'Strategic Networking Opportunities',
        description: `${networkingActivities} networking events planned to expand your AI professional network`,
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
        description: `${learningActivities} learning activities to enhance your AI expertise`,
        impact: 'Demonstrates commitment to staying current with AI trends and technologies'
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
