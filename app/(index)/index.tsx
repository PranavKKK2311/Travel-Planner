
import React from "react";
import { Stack, router } from "expo-router";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { colors, commonStyles } from "@/styles/commonStyles";

export default function HomeScreen() {
  const features = [
    {
      title: "AI-Powered Planning",
      description: "Smart itineraries optimized for AI career success",
      icon: "🤖",
      color: colors.primary,
    },
    {
      title: "Recruiter Appeal",
      description: "Activities designed to impress hiring managers",
      icon: "🎯",
      color: colors.secondary,
    },
    {
      title: "Networking Focus",
      description: "Connect with AI professionals worldwide",
      icon: "🌐",
      color: colors.accent,
    },
    {
      title: "Interview Prep",
      description: "Build compelling stories for behavioral interviews",
      icon: "💼",
      color: colors.success,
    }
  ];

  const usps = [
    "🚀 Career-focused travel planning",
    "🎪 Interview story generation",
    "🤝 Strategic networking opportunities",
    "📈 Skill-building integration",
    "💡 Innovation ecosystem immersion",
    "⭐ Recruiter highlight creation"
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "AI Trip Planner",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>🤖✈️</Text>
          <Text style={commonStyles.title}>AI Trip Planner</Text>
          <Text style={commonStyles.textSecondary}>
            The world&apos;s first AI-powered travel planner designed specifically 
            for AI engineers seeking career advancement
          </Text>
          
          <Button
            onPress={() => router.push('/trip-planner')}
            style={styles.ctaButton}
          >
            🚀 Start Planning Your Career Trip
          </Button>
        </View>

        {/* Features Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Why Choose Our AI Planner?</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* USPs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Unique Selling Points</Text>
          <View style={styles.uspsList}>
            {usps.map((usp, index) => (
              <View key={index} style={styles.uspItem}>
                <Text style={styles.uspText}>{usp}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 How It Works</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Input Your Preferences</Text>
                <Text style={styles.stepDescription}>
                  Tell us your destination, dates, budget, and career focus
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>AI Analysis</Text>
                <Text style={styles.stepDescription}>
                  Our AI analyzes local AI hubs, networking events, and learning opportunities
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Get Your Optimized Itinerary</Text>
                <Text style={styles.stepDescription}>
                  Receive a detailed plan with recruiter highlights and networking opportunities
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Demo Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎪 Perfect for AI Engineers</Text>
          <View style={styles.demoCard}>
            <Text style={styles.demoTitle}>
              &quot;I used this planner for my San Francisco trip and landed 3 interviews!&quot;
            </Text>
            <Text style={styles.demoDescription}>
              The AI suggested visiting Google AI, attending ML meetups, and exploring 
              the innovation district. My recruiter was impressed by my proactive 
              approach to understanding the AI ecosystem.
            </Text>
            <Text style={styles.demoAuthor}>- Future AI Engineer (You!)</Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Impress Recruiters?</Text>
          <Text style={styles.ctaDescription}>
            Create your AI-optimized travel itinerary and stand out from other candidates
          </Text>
          
          <Button
            onPress={() => router.push('/trip-planner')}
            style={styles.ctaButton}
          >
            🎯 Plan My Career-Boosting Trip
          </Button>
          
          <Pressable 
            onPress={() => router.push('/sample-itinerary')}
            style={styles.demoLink}
          >
            <Text style={styles.demoLinkText}>👀 View Sample Itinerary</Text>
          </Pressable>
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
  hero: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
  },
  heroIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  ctaButton: {
    width: '100%',
    marginTop: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  uspsList: {
    gap: 8,
  },
  uspItem: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  uspText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  stepsContainer: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  demoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 24,
  },
  demoDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  demoAuthor: {
    fontSize: 12,
    color: colors.primary,
    fontStyle: 'italic',
  },
  ctaSection: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  demoLink: {
    marginTop: 12,
    padding: 8,
  },
  demoLinkText: {
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
  },
});
