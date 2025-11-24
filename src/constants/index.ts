// PFA - Premier Fitness Alliance Training App
// Constants

import { WorkoutCategory, ExerciseType } from '../types';

// ============================================================================
// BRANDING & THEME
// ============================================================================

export const COLORS = {
  // Primary Colors
  primary: '#1a1a1a', // Dark Navy/Black
  primaryLight: '#424242',
  background: '#FFFFFF', // White

  // Accent Colors
  actionGreen: '#00D084', // Success, met targets
  warningYellow: '#FFB800', // Close to target
  athleticBlue: '#0066CC', // Primary actions
  alertRed: '#DC3545', // Errors, under target

  // Neutral Colors
  lightGray: '#F5F5F5',
  mediumGray: '#9E9E9E',
  darkGray: '#424242',

  // Text Colors
  text: '#1a1a1a',
  textSecondary: '#9E9E9E',
  textLight: '#FFFFFF',

  // Status Colors
  success: '#00D084',
  warning: '#FFB800',
  error: '#DC3545',
  info: '#0066CC',
} as const;

export const FONT_SIZES = {
  extraLarge: 32,
  large: 24,
  medium: 18,
  regular: 16,
  small: 14,
  extraSmall: 12,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// ============================================================================
// APP CONFIGURATION
// ============================================================================

export const APP_NAME = 'PFA';
export const APP_FULL_NAME = 'Premier Fitness Alliance';
export const ORGANIZATION_URL = 'https://www.premierfa.com/';
export const ORGANIZATION_LOCATION = 'Wethersfield, Connecticut';

export const MISSION_STATEMENT =
  'Empower the next generation of female athletes by harmonizing elite science with authentic mentorship.';

// ============================================================================
// WORKOUT CATEGORIES
// ============================================================================

export const WORKOUT_CATEGORIES: { value: WorkoutCategory; label: string; description: string }[] = [
  {
    value: 'strength',
    label: 'Strength',
    description: 'Build muscle and power',
  },
  {
    value: 'cardio',
    label: 'Cardio',
    description: 'Improve cardiovascular endurance',
  },
  {
    value: 'speed',
    label: 'Speed',
    description: 'Increase sprint speed and acceleration',
  },
  {
    value: 'agility',
    label: 'Agility',
    description: 'Enhance quick direction changes',
  },
  {
    value: 'conditioning',
    label: 'Conditioning',
    description: 'Build game-ready fitness',
  },
  {
    value: 'flexibility',
    label: 'Flexibility',
    description: 'Improve range of motion',
  },
  {
    value: 'hiit',
    label: 'HIIT',
    description: 'High-intensity interval training',
  },
  {
    value: 'hybrid',
    label: 'Hybrid',
    description: 'Combination of multiple types',
  },
  {
    value: 'recovery',
    label: 'Recovery',
    description: 'Active recovery and regeneration',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Custom workout type',
  },
];

// ============================================================================
// EXERCISE TYPES
// ============================================================================

export const EXERCISE_TYPES: { value: ExerciseType; label: string; icon: string }[] = [
  {
    value: 'strength',
    label: 'Strength',
    icon: 'dumbbell',
  },
  {
    value: 'cardio',
    label: 'Cardio',
    icon: 'run',
  },
  {
    value: 'speed',
    label: 'Speed',
    icon: 'flash',
  },
  {
    value: 'agility',
    label: 'Agility',
    icon: 'trending-up',
  },
  {
    value: 'flexibility',
    label: 'Flexibility',
    icon: 'body',
  },
  {
    value: 'other',
    label: 'Other',
    icon: 'ellipsis-horizontal',
  },
];

// ============================================================================
// COMMON EXERCISES (SEED DATA)
// ============================================================================

export const COMMON_EXERCISES = [
  // Lower Body - Strength
  { name: 'Back Squat', type: 'strength' as ExerciseType, muscleGroup: 'Legs', equipment: 'Barbell' },
  { name: 'Front Squat', type: 'strength' as ExerciseType, muscleGroup: 'Legs', equipment: 'Barbell' },
  { name: 'Deadlift', type: 'strength' as ExerciseType, muscleGroup: 'Legs', equipment: 'Barbell' },
  { name: 'Romanian Deadlift', type: 'strength' as ExerciseType, muscleGroup: 'Legs', equipment: 'Barbell' },
  { name: 'Bulgarian Split Squat', type: 'strength' as ExerciseType, muscleGroup: 'Legs', equipment: 'Dumbbells' },
  { name: 'Lunges', type: 'strength' as ExerciseType, muscleGroup: 'Legs', equipment: 'Bodyweight' },
  { name: 'Step-Ups', type: 'strength' as ExerciseType, muscleGroup: 'Legs', equipment: 'Box' },
  { name: 'Leg Press', type: 'strength' as ExerciseType, muscleGroup: 'Legs', equipment: 'Machine' },
  { name: 'Leg Curl', type: 'strength' as ExerciseType, muscleGroup: 'Hamstrings', equipment: 'Machine' },
  { name: 'Calf Raises', type: 'strength' as ExerciseType, muscleGroup: 'Calves', equipment: 'Dumbbells' },

  // Upper Body - Strength
  { name: 'Bench Press', type: 'strength' as ExerciseType, muscleGroup: 'Chest', equipment: 'Barbell' },
  { name: 'Push-Ups', type: 'strength' as ExerciseType, muscleGroup: 'Chest', equipment: 'Bodyweight' },
  { name: 'Overhead Press', type: 'strength' as ExerciseType, muscleGroup: 'Shoulders', equipment: 'Barbell' },
  { name: 'Pull-Ups', type: 'strength' as ExerciseType, muscleGroup: 'Back', equipment: 'Bar' },
  { name: 'Rows', type: 'strength' as ExerciseType, muscleGroup: 'Back', equipment: 'Barbell' },
  { name: 'Bicep Curls', type: 'strength' as ExerciseType, muscleGroup: 'Arms', equipment: 'Dumbbells' },
  { name: 'Tricep Dips', type: 'strength' as ExerciseType, muscleGroup: 'Arms', equipment: 'Bodyweight' },

  // Core
  { name: 'Plank', type: 'strength' as ExerciseType, muscleGroup: 'Core', equipment: 'Bodyweight' },
  { name: 'Russian Twists', type: 'strength' as ExerciseType, muscleGroup: 'Core', equipment: 'Medicine Ball' },
  { name: 'Dead Bug', type: 'strength' as ExerciseType, muscleGroup: 'Core', equipment: 'Bodyweight' },
  { name: 'Bicycle Crunches', type: 'strength' as ExerciseType, muscleGroup: 'Core', equipment: 'Bodyweight' },

  // Speed & Agility
  { name: 'Sprints', type: 'speed' as ExerciseType, muscleGroup: 'Full Body', equipment: 'None' },
  { name: 'Cone Drills', type: 'agility' as ExerciseType, muscleGroup: 'Full Body', equipment: 'Cones' },
  { name: 'Ladder Drills', type: 'agility' as ExerciseType, muscleGroup: 'Full Body', equipment: 'Agility Ladder' },
  { name: 'Box Jumps', type: 'agility' as ExerciseType, muscleGroup: 'Legs', equipment: 'Box' },
  { name: 'Shuttle Runs', type: 'speed' as ExerciseType, muscleGroup: 'Full Body', equipment: 'Cones' },

  // Cardio/Conditioning
  { name: 'Running', type: 'cardio' as ExerciseType, muscleGroup: 'Full Body', equipment: 'None' },
  { name: 'Rowing', type: 'cardio' as ExerciseType, muscleGroup: 'Full Body', equipment: 'Rowing Machine' },
  { name: 'Bike', type: 'cardio' as ExerciseType, muscleGroup: 'Legs', equipment: 'Bike' },
  { name: 'Jump Rope', type: 'cardio' as ExerciseType, muscleGroup: 'Full Body', equipment: 'Jump Rope' },
  { name: 'Burpees', type: 'cardio' as ExerciseType, muscleGroup: 'Full Body', equipment: 'Bodyweight' },

  // Flexibility
  { name: 'Hamstring Stretch', type: 'flexibility' as ExerciseType, muscleGroup: 'Hamstrings', equipment: 'None' },
  { name: 'Hip Flexor Stretch', type: 'flexibility' as ExerciseType, muscleGroup: 'Hips', equipment: 'None' },
  { name: 'Shoulder Stretch', type: 'flexibility' as ExerciseType, muscleGroup: 'Shoulders', equipment: 'None' },
  { name: 'Foam Rolling', type: 'flexibility' as ExerciseType, muscleGroup: 'Full Body', equipment: 'Foam Roller' },
];

// ============================================================================
// PERFORMANCE THRESHOLDS
// ============================================================================

export const PERFORMANCE_THRESHOLDS = {
  exceeded: 1.0, // 100% or more of target
  met: 1.0, // Exactly 100% of target
  close: 0.8, // 80-99% of target
  under: 0.8, // Less than 80% of target
} as const;

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION = {
  client: {
    nameMinLength: 2,
    nameMaxLength: 100,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneRegex: /^[\d\s\-\+\(\)]+$/,
  },
  workout: {
    nameMinLength: 2,
    nameMaxLength: 100,
    descriptionMaxLength: 500,
  },
  exercise: {
    nameMinLength: 2,
    nameMaxLength: 100,
    instructionsMaxLength: 1000,
  },
  performance: {
    minSets: 1,
    maxSets: 20,
    minReps: 1,
    maxReps: 200,
    minWeight: 0,
    maxWeight: 1000, // lbs
    minDuration: 1, // seconds
    maxDuration: 3600, // 1 hour
  },
} as const;

// ============================================================================
// API & STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  user: '@pfa/user',
  authToken: '@pfa/auth_token',
  clients: '@pfa/clients',
  workouts: '@pfa/workouts',
  exercises: '@pfa/exercises',
  assignments: '@pfa/assignments',
  sessions: '@pfa/sessions',
  exerciseLogs: '@pfa/exercise_logs',
} as const;

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  auth: {
    loginFailed: 'Unable to sign in. Please try again.',
    signupFailed: 'Unable to create account. Please try again.',
    invalidCredentials: 'Invalid email or password.',
    emailInUse: 'This email is already in use.',
    networkError: 'Network error. Please check your connection.',
  },
  client: {
    notFound: 'Athlete not found.',
    createFailed: 'Unable to create athlete.',
    updateFailed: 'Unable to update athlete.',
    deleteFailed: 'Unable to delete athlete.',
    invalidEmail: 'Please enter a valid email address.',
  },
  workout: {
    notFound: 'Training session not found.',
    createFailed: 'Unable to create training session.',
    updateFailed: 'Unable to update training session.',
    deleteFailed: 'Unable to delete training session.',
    noExercises: 'Please add at least one exercise.',
  },
  session: {
    saveFailed: 'Unable to save your progress.',
    resumeFailed: 'Unable to resume training session.',
  },
  general: {
    unknown: 'An unexpected error occurred.',
    offline: 'You are offline. Some features may be limited.',
  },
} as const;

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  client: {
    created: 'Athlete added successfully!',
    updated: 'Athlete updated successfully!',
    deleted: 'Athlete removed.',
    invitationSent: 'Invitation sent to {email}',
  },
  workout: {
    created: 'Training session created!',
    updated: 'Training session updated!',
    deleted: 'Training session deleted.',
    assigned: 'Training session assigned to {count} athlete(s)',
  },
  session: {
    completed: 'Training session complete! Great work! 💪',
    saved: 'Progress saved.',
  },
} as const;

// ============================================================================
// INVITATION
// ============================================================================

export const INVITATION = {
  expirationDays: 30,
  deepLinkScheme: 'pfa://',
  emailSubject: "You're invited to Premier Fitness Alliance!",
} as const;
