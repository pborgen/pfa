// PFA - Premier Fitness Alliance Training App
// Theme Configuration

import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants';

// ============================================================================
// REACT NATIVE PAPER THEME
// ============================================================================

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.athleticBlue,
    secondary: COLORS.actionGreen,
    tertiary: COLORS.primary,
    error: COLORS.alertRed,
    background: COLORS.background,
    surface: COLORS.background,
    surfaceVariant: COLORS.lightGray,
    onSurface: COLORS.text,
    onSurfaceVariant: COLORS.textSecondary,
    outline: COLORS.mediumGray,
  },
  fonts: {
    ...DefaultTheme.fonts,
    labelLarge: {
      ...DefaultTheme.fonts.labelLarge,
      fontSize: FONT_SIZES.regular,
      fontWeight: '600' as const,
    },
  },
};

// ============================================================================
// COMMON STYLES
// ============================================================================

export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: SPACING.lg,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentPadding: {
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  spaceBetween: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SPACING.md,
  },
};

// ============================================================================
// TEXT STYLES
// ============================================================================

export const textStyles = {
  h1: {
    fontSize: FONT_SIZES.extraLarge,
    fontWeight: 'bold' as const,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  h2: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold' as const,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  h3: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600' as const,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  body: {
    fontSize: FONT_SIZES.regular,
    color: COLORS.text,
    lineHeight: FONT_SIZES.regular * 1.5,
  },
  bodySecondary: {
    fontSize: FONT_SIZES.regular,
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZES.regular * 1.5,
  },
  caption: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  label: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600' as const,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
};

// ============================================================================
// BUTTON STYLES
// ============================================================================

export const buttonStyles = {
  primary: {
    backgroundColor: COLORS.athleticBlue,
    borderRadius: BORDER_RADIUS.md,
  },
  secondary: {
    backgroundColor: COLORS.actionGreen,
    borderRadius: BORDER_RADIUS.md,
  },
  outlined: {
    borderColor: COLORS.athleticBlue,
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.md,
  },
  text: {
    color: COLORS.athleticBlue,
  },
};

// ============================================================================
// PERFORMANCE INDICATOR STYLES
// ============================================================================

export const performanceStyles = {
  exceeded: {
    backgroundColor: COLORS.actionGreen,
    color: COLORS.textLight,
  },
  met: {
    backgroundColor: COLORS.actionGreen,
    color: COLORS.textLight,
  },
  close: {
    backgroundColor: COLORS.warningYellow,
    color: COLORS.text,
  },
  under: {
    backgroundColor: COLORS.alertRed,
    color: COLORS.textLight,
  },
};

// ============================================================================
// INPUT STYLES
// ============================================================================

export const inputStyles = {
  container: {
    marginBottom: SPACING.md,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    fontSize: FONT_SIZES.regular,
  },
  error: {
    color: COLORS.alertRed,
    fontSize: FONT_SIZES.small,
    marginTop: SPACING.xs,
  },
};

// ============================================================================
// WORKOUT CATEGORY COLORS
// ============================================================================

export const categoryColors: Record<string, string> = {
  strength: '#FF6B6B',
  cardio: '#4ECDC4',
  speed: '#FFE66D',
  agility: '#A8DADC',
  conditioning: '#1D3557',
  flexibility: '#F1FAEE',
  hiit: '#E63946',
  hybrid: '#457B9D',
  recovery: '#95E1D3',
  other: COLORS.mediumGray,
};

// ============================================================================
// SHADOW STYLES
// ============================================================================

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};
