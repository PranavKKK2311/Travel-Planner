
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable
} from 'react-native';
import { Stack, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/button';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function SampleItineraryScreen() {
  const sampleActivities = [
    {
      day: 1,
      title: "Arrival & Tech District Exploration",
      activities: [
        {
          time: "10:00 AM",
          name: "Tech Campus Visit - Google Area",
          location: "Mountain View, CA",
          icon: "🏢",
          gradient: colors.gradients.primary
        },
        {
          time: "2:00 PM", 
          name: "Innovation Hub Tour",
          location: "Palo Alto",
          icon: "💡",
          gradient: colors.gradients.accent
        },
        {
          time: "6:00 PM",
          name: "Tech Professionals Meetup",
          location: "San Francisco",
          icon: "🤝",
          gradient: colors.gradients.secondary
        }
      ]
    },
    {
      day: 2,
      title: "Learning & Networking Day",
      activities: [
        {
          time: "9:00 AM",
          name: "Professional Workshop",
          location: "Stanford University",
          icon: "📚",
          gradient: colors.gradients.cool
        },
        {
          time: "1:00 PM",
          name: "Startup Hub Visit",
          location: "SOMA District",
          icon: "🚀",
          gradient: colors.gradients.warm
        },
        {
          time: "5:00 PM",
          name: "Industry Conference Networking",
          location: "Moscone Center",
          icon: "🌐",
          gradient: colors.gradients.primary
        }
      ]
    },
    {
      day: 3,
      title: "Interview & Professional Growth",
      activities: [
        {
          time: "10:00 AM",
          name: "Job Interview Preparation",
          location: "Target Company",
          icon: "🎤",
          gradient: colors.gradients.secondary
        },
        {
          time: "2:00 PM",
          name: "Skills Development Session",
          location: "Tech Hub",
          icon: "📈",
          gradient: colors.gradients.accent
        },
        {
          time: "6:00 PM",
          name: "Professional Celebration",
          location: "Rooftop Venue",
          icon: "🎉",
          gradient: colors.gradients.warm
        }
      ]
    }
  ];

  const highlights = [
    "🎯 Strategic networking with 15+ industry professionals",
    "📚 Hands-on learning at 3 prestigious institutions", 
    "🏢 Exclusive access to 5 major tech company campuses",
    "🚀 Direct exposure to cutting-edge startup ecosystem",
    "💼 Interview preparation with industry mentors",
    "⭐ Memorable experiences perfect for interview stories"
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Sample Itinerary',
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
          <Text style={styles.headerTitle}>🌟 Sample Professional Trip</Text>
          <Text style={styles.headerSubtitle}>San Francisco, CA • 3 Days</Text>
          <Text style={styles.headerDescription}>
            See how our intelligent planning creates the perfect career-boosting experience
          </Text>
        </LinearGradient>

        {/* Trip Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Trip Overview</Text>
          <LinearGradient
            colors={colors.gradients.accent}
            style={styles.overviewCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.overviewContent}>
              <View style={styles.overviewStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>$850</Text>
                  <Text style={styles.statLabel}>Total Cost</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>9.2/10</Text>
                  <Text style={styles.statLabel}>Experience Score</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Activities</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Daily Itinerary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Daily Breakdown</Text>
          {sampleActivities.map((day, dayIndex) => (
            <View key={dayIndex} style={styles.dayContainer}>
              <LinearGradient
                colors={colors.gradients.secondary}
                style={styles.dayHeader}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.dayTitle}>Day {day.day}</Text>
                <Text style={styles.daySubtitle}>{day.title}</Text>
              </LinearGradient>

              {day.activities.map((activity, activityIndex) => (
                <LinearGradient
                  key={activityIndex}
                  colors={activity.gradient}
                  style={styles.activityCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.activityContent}>
                    <View style={styles.activityHeader}>
                      <View style={styles.activityTime}>
                        <Text style={styles.timeText}>{activity.time}</Text>
                      </View>
                      <View style={styles.activityInfo}>
                        <Text style={styles.activityName}>
                          {activity.icon} {activity.name}
                        </Text>
                        <Text style={styles.activityLocation}>📍 {activity.location}</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              ))}
            </View>
          ))}
        </View>

        {/* Professional Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Professional Highlights</Text>
          <Text style={styles.highlightsDescription}>
            What makes this trip perfect for career advancement:
          </Text>
          {highlights.map((highlight, index) => (
            <LinearGradient
              key={index}
              colors={colors.gradients.cool}
              style={styles.highlightCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.highlightContent}>
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            </LinearGradient>
          ))}
        </View>

        {/* Success Story */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💼 Success Story</Text>
          <LinearGradient
            colors={colors.gradients.warm}
            style={styles.storyCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.storyContent}>
              <Text style={styles.storyQuote}>
                &quot;This itinerary helped me land my dream job! The networking events connected me with my future manager, and the campus visits gave me incredible insights to share during interviews.&quot;
              </Text>
              <Text style={styles.storyAuthor}>- Sarah Chen, Software Engineer at Google</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Call to Action */}
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.ctaSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.ctaTitle}>Ready to Create Your Own?</Text>
          <Text style={styles.ctaDescription}>
            Start planning your career-boosting trip today and unlock new opportunities
          </Text>
          
          <Button
            onPress={() => router.push('/trip-planner')}
            style={styles.ctaButton}
            textStyle={styles.ctaButtonText}
          >
            🚀 Plan My Professional Trip
          </Button>
          
          <Pressable 
            onPress={() => router.back()}
            style={styles.backLink}
          >
            <Text style={styles.backLinkText}>← Back to Home</Text>
          </Pressable>
        </LinearGradient>
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
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.background,
    marginBottom: 12,
    opacity: 0.9,
  },
  headerDescription: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
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
  overviewCard: {
    borderRadius: 20,
    padding: 2,
  },
  overviewContent: {
    backgroundColor: colors.background,
    borderRadius: 18,
    padding: 24,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    marginTop: 4,
  },
  dayContainer: {
    marginBottom: 24,
  },
  dayHeader: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  dayTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    marginBottom: 4,
  },
  daySubtitle: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    opacity: 0.9,
  },
  activityCard: {
    borderRadius: 12,
    marginBottom: 8,
    padding: 2,
  },
  activityContent: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityTime: {
    backgroundColor: colors.cardAlt,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 16,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.primary,
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
  highlightsDescription: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 22,
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
  },
  highlightText: {
    fontSize: 15,
    fontFamily: 'Nunito_500Medium',
    color: colors.text,
    lineHeight: 22,
  },
  storyCard: {
    borderRadius: 20,
    padding: 2,
  },
  storyContent: {
    backgroundColor: colors.background,
    borderRadius: 18,
    padding: 24,
  },
  storyQuote: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.text,
    lineHeight: 24,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  storyAuthor: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.primary,
  },
  ctaSection: {
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaDescription: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    opacity: 0.9,
  },
  ctaButton: {
    width: '100%',
    backgroundColor: colors.background,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  ctaButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  backLink: {
    padding: 12,
  },
  backLinkText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: colors.background,
    textAlign: 'center',
    opacity: 0.9,
  },
});
