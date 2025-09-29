
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#6366F1',      // Modern Indigo
  secondary: '#EC4899',    // Vibrant Pink
  accent: '#10B981',       // Emerald Green
  tertiary: '#F59E0B',     // Amber
  quaternary: '#8B5CF6',   // Purple
  background: '#FFFFFF',   // White background
  backgroundAlt: '#F8FAFC', // Very light blue-gray
  backgroundGradient: ['#6366F1', '#8B5CF6'], // Primary to Purple gradient
  text: '#1F2937',         // Dark gray text
  textSecondary: '#6B7280', // Medium gray text
  textLight: '#9CA3AF',    // Light gray text
  grey: '#E5E7EB',         // Light gray
  card: '#FFFFFF',         // White card background
  cardAlt: '#F9FAFB',      // Very light gray card
  border: '#E5E7EB',       // Light border
  borderLight: '#F3F4F6',  // Very light border
  success: '#10B981',      // Emerald
  warning: '#F59E0B',      // Amber
  error: '#EF4444',        // Red
  info: '#3B82F6',         // Blue
  // Gradient colors for cards and backgrounds
  gradients: {
    primary: ['#6366F1', '#8B5CF6'],
    secondary: ['#EC4899', '#F97316'],
    accent: ['#10B981', '#059669'],
    warm: ['#F59E0B', '#EF4444'],
    cool: ['#3B82F6', '#6366F1'],
  }
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 16
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
  input: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    width: '100%',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
});
