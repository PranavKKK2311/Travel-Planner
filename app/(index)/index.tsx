
import React, { useEffect, useRef } from "react";
import { Stack, router } from "expo-router";
import { View, Text, StyleSheet, ScrollView, Pressable, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { colors, commonStyles } from "@/styles/commonStyles";
import HolidayImageGallery from "@/components/HolidayImageGallery";
import DestinationCard from "@/components/DestinationCard";

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  // Animation values for dynamic background
  const leafAnimation1 = useRef(new Animated.Value(0)).current;
  const leafAnimation2 = useRef(new Animated.Value(0)).current;
  const leafAnimation3 = useRef(new Animated.Value(0)).current;
  const gradientAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Continuous leaf floating animations
    const createLeafAnimation = (animValue: Animated.Value, duration: number, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Gradient color shifting animation
    const gradientLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnimation, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: false,
        }),
        Animated.timing(gradientAnimation, {
          toValue: 0,
          duration: 8000,
          useNativeDriver: false,
        }),
      ])
    );

    // Pulsing animation for organic feel
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    // Start all animations
    createLeafAnimation(leafAnimation1, 6000, 0).start();
    createLeafAnimation(leafAnimation2, 8000, 2000).start();
    createLeafAnimation(leafAnimation3, 7000, 4000).start();
    gradientLoop.start();
    pulseLoop.start();

    return () => {
      leafAnimation1.stopAnimation();
      leafAnimation2.stopAnimation();
      leafAnimation3.stopAnimation();
      gradientAnimation.stopAnimation();
      pulseAnimation.stopAnimation();
    };
  }, []);

  // Dynamic gradient colors that shift like sunlight through forest canopy
  const dynamicGradientColors = gradientAnimation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [
      '#1B4332', // Deep forest green
      '#2D5016', // Rich moss green
      '#40531B', // Jungle green
      '#52734D', // Sage green
      '#1B4332', // Back to deep forest
    ],
  });

  const secondaryGradientColors = gradientAnimation.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [
      '#2D5016', // Rich moss
      '#40531B', // Jungle green
      '#52734D', // Sage green
      '#2D5016', // Back to moss
    ],
  });

  const features = [
    {
      title: "Smart Planning",
      description: "Intelligent itineraries optimized for career success",
      icon: "brain",
      gradient: colors.gradients.rainforest,
    },
    {
      title: "Professional Appeal",
      description: "Activities designed to impress hiring managers",
      icon: "target",
      gradient: colors.gradients.canopy,
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
      gradient: colors.gradients.earth,
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
        {/* Dynamic Amazon Rainforest Hero Section */}
        <View style={styles.heroContainer}>
          {/* Animated Background Layers */}
          <Animated.View style={[styles.backgroundLayer, { backgroundColor: dynamicGradientColors }]} />
          <Animated.View style={[styles.backgroundLayer, styles.secondaryLayer, { backgroundColor: secondaryGradientColors, opacity: 0.7 }]} />
          
          {/* Floating Leaf Elements */}
          <Animated.View
            style={[
              styles.leafElement,
              styles.leaf1,
              {
                transform: [
                  {
                    translateY: leafAnimation1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -30],
                    }),
                  },
                  {
                    rotate: leafAnimation1.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '15deg'],
                    }),
                  },
                ],
                opacity: leafAnimation1.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.3, 0.8, 0.3],
                }),
              },
            ]}
          >
            <Text style={styles.leafEmoji}>🌿</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.leafElement,
              styles.leaf2,
              {
                transform: [
                  {
                    translateY: leafAnimation2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -40],
                    }),
                  },
                  {
                    rotate: leafAnimation2.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '-20deg'],
                    }),
                  },
                ],
                opacity: leafAnimation2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.2, 0.7, 0.2],
                }),
              },
            ]}
          >
            <Text style={styles.leafEmoji}>🍃</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.leafElement,
              styles.leaf3,
              {
                transform: [
                  {
                    translateY: leafAnimation3.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -25],
                    }),
                  },
                  {
                    rotate: leafAnimation3.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '10deg'],
                    }),
                  },
                ],
                opacity: leafAnimation3.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.4, 0.9, 0.4],
                }),
              },
            ]}
          >
            <Text style={styles.leafEmoji}>🌱</Text>
          </Animated.View>

          {/* Organic Pattern Overlay */}
          <View style={styles.patternOverlay}>
            <View style={styles.organicShape1} />
            <View style={styles.organicShape2} />
            <View style={styles.organicShape3} />
          </View>

          {/* Hero Content with Pulsing Animation */}
          <Animated.View style={[styles.heroContent, { transform: [{ scale: pulseAnimation }] }]}>
            <Text style={styles.heroEmoji}>🌳✈️</Text>
            <Text style={styles.heroTitle}>TravelPro</Text>
            <Text style={styles.heroSubtitle}>
              Discover the world&apos;s hidden gems with nature-inspired adventures
            </Text>
            
            <Button
              onPress={() => router.push('/trip-planner')}
              style={styles.ctaButton}
              textStyle={styles.ctaButtonText}
            >
              🌿 Explore Wild Destinations
            </Button>
          </Animated.View>

          {/* Subtle Light Rays */}
          <View style={styles.lightRay1} />
          <View style={styles.lightRay2} />
          <View style={styles.lightRay3} />
        </View>

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
                  colors={colors.gradients.canopy}
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
                color: colors.gradients.rainforest
              },
              {
                number: "2", 
                title: "Smart Analysis",
                description: "Our system analyzes local opportunities, events, and networking possibilities",
                color: colors.gradients.canopy
              },
              {
                number: "3",
                title: "Get Your Optimized Itinerary",
                description: "Receive a detailed plan with professional highlights and networking opportunities",
                color: colors.gradients.earth
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
            colors={colors.gradients.canopy}
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
          colors={colors.gradients.rainforest}
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
  heroContainer: {
    height: height * 0.75,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  secondaryLayer: {
    transform: [{ rotate: '45deg' }, { scale: 1.5 }],
  },
  leafElement: {
    position: 'absolute',
    zIndex: 2,
  },
  leaf1: {
    top: '20%',
    left: '15%',
  },
  leaf2: {
    top: '40%',
    right: '20%',
  },
  leaf3: {
    top: '60%',
    left: '25%',
  },
  leafEmoji: {
    fontSize: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  organicShape1: {
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 40,
    transform: [{ rotate: '45deg' }],
  },
  organicShape2: {
    position: 'absolute',
    bottom: '20%',
    left: '5%',
    width: 60,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 30,
    transform: [{ rotate: '-30deg' }],
  },
  organicShape3: {
    position: 'absolute',
    top: '50%',
    left: '70%',
    width: 100,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 25,
    transform: [{ rotate: '60deg' }],
  },
  lightRay1: {
    position: 'absolute',
    top: 0,
    left: '20%',
    width: 2,
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: [{ rotate: '15deg' }],
  },
  lightRay2: {
    position: 'absolute',
    top: '10%',
    right: '30%',
    width: 1,
    height: '25%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ rotate: '-10deg' }],
  },
  lightRay3: {
    position: 'absolute',
    bottom: '20%',
    left: '60%',
    width: 1.5,
    height: '20%',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    transform: [{ rotate: '25deg' }],
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 400,
    zIndex: 3,
    paddingHorizontal: 20,
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  heroTitle: {
    fontSize: 42,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: 'Nunito_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  ctaButton: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 16,
    borderRadius: 16,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    elevation: 8,
  },
  ctaButtonText: {
    color: '#1B4332',
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 16,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    elevation: 8,
  },
  ctaButtonSecondaryText: {
    color: '#1B4332',
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
