
export interface TripPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  interests: string[];
  travelStyle: 'budget' | 'mid-range' | 'luxury';
  groupSize: number;
  hasJobInterview: boolean;
  interviewDate?: string;
  interviewLocation?: string;
  careerFocus: 'engineering' | 'tech' | 'startup' | 'research' | 'other';
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  duration: number; // in hours
  cost: number;
  category: 'sightseeing' | 'networking' | 'learning' | 'relaxation' | 'interview-prep';
  careerRelevance?: number; // 1-10 scale for career relevance
  professionalImpact?: string; // Why this would impress employers
}

export interface DayItinerary {
  date: string;
  activities: Activity[];
  totalCost: number;
  experienceScore: number; // How career-focused this day is
}

export interface TripItinerary {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  days: DayItinerary[];
  totalCost: number;
  overallScore: number;
  careerHighlights: string[];
  uniqueSellingPoints: string[];
}

export interface SmartInsight {
  type: 'networking' | 'learning' | 'showcase' | 'preparation';
  title: string;
  description: string;
  impact: string;
}
