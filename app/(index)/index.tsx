
import React from "react";
import { Stack, router } from "expo-router";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { colors, commonStyles } from "@/styles/commonStyles";
import HolidayImageGallery from "@/components/HolidayImageGallery";
import DestinationCard from "@/components/DestinationCard";

export default function HomeScreen() {
  const features = [
    {
      title: "Smart Planning",
      description: "Intelligent itineraries optimized for career success",
      icon: "brain",
      gradient: colors.gradients.primary,
    },
    {
      title: "Professional Appeal",
      description: "Activities designed to impress hiring managers",
      icon: "target",
      gradient: colors.gradients.secondary,
    },
    {
      title: "Global Networking",
      description: "Connect with professionals worldwide",
      icon: "globe.americas",
      gradient: colors.gradients.accent,
    },
    {
      title: "Career Stories",
      description: "Build compelling narratives for interviews",
      icon: "briefcase",
      gradient: colors.gradients.warm,
    }
  ];

  const popularDestinations = [
    {
      title: "Silicon Valley Tech Hub",
      location: "San Francisco, CA",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      price: "From $1,200",
      rating: 4.9,
      highlights: [
        "Visit Google, Apple, Meta campuses",
        "Attend tech meetups & conferences",
        "Network with industry leaders"
      ]
    },
    {
      title: "Innovation District",
      location: "Seattle, WA",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
      price: "From $900",
      rating: 4.8,
      highlights: [
        "Microsoft & Amazon headquarters",
        "Startup ecosystem exploration",
        "Professional development workshops"
      ]
    },
    {
      title: "European Tech Capital",
      location: "Berlin, Germany",
      imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
      price: "From $800",
      rating: 4.7,
      highlights: [
        "Thriving startup scene",
        "International networking events",
        "Innovation labs & co-working spaces"
      ]
    }
  ];

  const benefits = [
    "🚀 Career-focused travel planning",
    "📖 Interview story generation", 
    "🤝 Strategic networking opportunities",
    "📈 Skill-building integration",
    "💡 Innovation ecosystem immersion",
    "⭐ Professional highlight creation"
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "TravelPro",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShown: false,
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Section with Gradient */}
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroEmoji}>✈️🌟</Text>
            <Text style={styles.heroTitle}>TravelPro</Text>
            <Text style={styles.heroSubtitle}>
              The ultimate travel planner designed for ambitious professionals
            </Text>
            
            <Button
              onPress={() => router.push('/trip-planner')}
              style={styles.ctaButton}
              textStyle={styles.ctaButtonText}
            >
              🚀 Start Planning Your Journey
            </Button>
          </View>
        </LinearGradient>

        {/* Holiday Image Gallery */}
        <HolidayImageGallery />

        {/* Popular Destinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Top Professional Destinations</Text>
          <Text style={styles.sectionSubtitle}>
            Handpicked locations where careers are made
          </Text>
          
          {popularDestinations.map((destination, index) => (
            <DestinationCard
              key={index}
              {...destination}
              onPress={() => {
                console.log('Selected destination:', destination.title);
                router.push('/trip-planner');
              }}
              style={styles.destinationCard}
            />
          ))}
        </View>

        {/* Features Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Why Choose TravelPro?</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <LinearGradient
                key={index}
                colors={feature.gradient}
                style={styles.featureCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.featureContent}>
                  <IconSymbol 
                    name={feature.icon as any} 
                    color={colors.background} 
                    size={32} 
                    style={styles.featureIcon}
                  />
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </LinearGradient>
            ))}
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Unique Benefits</Text>
          <View style={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <LinearGradient
                  colors={colors.gradients.accent}
                  style={styles.benefitDot}
                />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 How It Works</Text>
          <View style={styles.stepsContainer}>
            {[
              {
                number: "1",
                title: "Input Your Preferences",
                description: "Tell us your destination, dates, budget, and career focus",
                color: colors.gradients.primary
              },
              {
                number: "2", 
                title: "Smart Analysis",
                description: "Our system analyzes local opportunities, events, and networking possibilities",
                color: colors.gradients.secondary
              },
              {
                number: "3",
                title: "Get Your Optimized Itinerary",
                description: "Receive a detailed plan with professional highlights and networking opportunities",
                color: colors.gradients.accent
              }
            ].map((step, index) => (
              <View key={index} style={styles.step}>
                <LinearGradient
                  colors={step.color}
                  style={styles.stepNumber}
                >
                  <Text style={styles.stepNumberText}>{step.number}</Text>
                </LinearGradient>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Testimonial Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💼 Perfect for Professionals</Text>
          <LinearGradient
            colors={colors.gradients.cool}
            style={styles.testimonialCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.testimonialQuote}>
              &quot;I used this planner for my San Francisco trip and landed 3 interviews!&quot;
            </Text>
            <Text style={styles.testimonialDescription}>
              The system suggested visiting tech campuses, attending professional meetups, and exploring 
              the innovation district. My interviewer was impressed by my proactive 
              approach to understanding the industry ecosystem.
            </Text>
            <Text style={styles.testimonialAuthor}>- Future Professional (You!)</Text>
          </LinearGradient>
        </View>

        {/* CTA Section */}
        <LinearGradient
          colors={colors.gradients.warm}
          style={styles.ctaSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.ctaTitle}>Ready to Elevate Your Career?</Text>
          <Text style={styles.ctaDescription}>
            Create your professionally-optimized travel itinerary and stand out from other candidates
          </Text>
          
          <Button
            onPress={() => router.push('/trip-planner')}
            style={styles.ctaButtonSecondary}
            textStyle={styles.ctaButtonSecondaryText}
          >
            🎯 Plan My Career-Boosting Trip
          </Button>
          
          <Pressable 
            onPress={() => router.push('/sample-itinerary')}
            style={styles.demoLink}
          >
            <Text style={styles.demoLinkText}>👀 View Sample Itinerary</Text>
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
  hero: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 42,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
    marginBottom: 12,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
    opacity: 0.9,
  },
  ctaButton: {
    width: '100%',
    backgroundColor: colors.background,
    paddingVertical: 16,
    borderRadius: 16,
  },
  ctaButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  destinationCard: {
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  featureCard: {
    borderRadius: 20,
    width: '48%',
    minHeight: 160,
    padding: 2,
  },
  featureContent: {
    backgroundColor: colors.background,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  featureIcon: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  benefitsList: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardAlt,
    borderRadius: 16,
    padding: 16,
  },
  benefitDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 16,
  },
  benefitText: {
    fontSize: 16,
    fontFamily: 'Nunito_500Medium',
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
  stepsContainer: {
    gap: 24,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: colors.background,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: colors.textSecondary,
    lineHeight: 22,
  },
  testimonialCard: {
    borderRadius: 20,
    padding: 24,
  },
  testimonialQuote: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.background,
    marginBottom: 16,
    lineHeight: 28,
  },
  testimonialDescription: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: colors.background,
    lineHeight: 22,
    marginBottom: 16,
    opacity: 0.9,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: colors.background,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  ctaSection: {
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 32,
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
    marginBottom: 32,
    lineHeight: 24,
    opacity: 0.9,
  },
  ctaButtonSecondary: {
    width: '100%',
    backgroundColor: colors.background,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  ctaButtonSecondaryText: {
    color: colors.tertiary,
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  demoLink: {
    padding: 12,
  },
  demoLinkText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: colors.background,
    textAlign: 'center',
    opacity: 0.9,
  },
});
