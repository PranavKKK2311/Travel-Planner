
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
  careerFocus: 'ai-engineering' | 'tech' | 'startup' | 'research' | 'other';
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  duration: number; // in hours
  cost: number;
  category: 'sightseeing' | 'networking' | 'learning' | 'relaxation' | 'interview-prep';
  aiRelevance?: number; // 1-10 scale for AI career relevance
  recruiterImpact?: string; // Why this would impress recruiters
}

export interface DayItinerary {
  date: string;
  activities: Activity[];
  totalCost: number;
  aiScore: number; // How AI-career focused this day is
}

export interface TripItinerary {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  days: DayItinerary[];
  totalCost: number;
  overallAiScore: number;
  recruiterHighlights: string[];
  uniqueSellingPoints: string[];
}

export interface AIInsight {
  type: 'networking' | 'learning' | 'showcase' | 'preparation';
  title: string;
  description: string;
  impact: string;
}
