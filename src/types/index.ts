// PFA - Premier Fitness Alliance Training App
// Type Definitions

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export type UserRole = 'admin' | 'client';
export type AuthProvider = 'google' | 'apple';

export interface User {
  id: string; // Firebase Auth UID
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  authProvider: AuthProvider;
  createdAt: string;
  lastLoginAt?: string;
}

// ============================================================================
// CLIENT (ATHLETE)
// ============================================================================

export interface Client {
  id: string;
  userId?: string; // Link to User account (null until they accept invitation)
  name: string;
  email: string; // Required for sending invitation
  phone?: string;
  notes?: string;
  photoUri?: string; // Local image URI for athlete photo
  active?: boolean;
  invitationSent?: boolean;
  invitationSentAt?: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string; // Admin user ID
}

export interface ClientInvitation {
  id: string;
  clientId: string;
  email: string;
  invitationCode: string; // Unique token for linking
  status: 'pending' | 'accepted' | 'expired';
  sentAt: string;
  acceptedAt?: string;
  expiresAt: string;
  resendCount: number;
}

// ============================================================================
// EXERCISE
// ============================================================================

export type ExerciseType = 'strength' | 'cardio' | 'flexibility' | 'agility' | 'speed' | 'other';

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  muscleGroup?: string;
  equipment?: string;
  instructions?: string;
  videoUrl?: string;
  createdBy?: string; // Admin user ID (optional, for custom exercises)
  createdAt: string;
}

// ============================================================================
// WORKOUT
// ============================================================================

export type WorkoutCategory =
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'hybrid'
  | 'hiit'
  | 'speed'
  | 'agility'
  | 'conditioning'
  | 'recovery'
  | 'other';

export interface WorkoutExercise {
  exerciseId: string;
  order: number;
  // Planned parameters set by admin/coach
  targetSets: number;
  targetReps?: number; // per set (for rep-based exercises)
  targetWeight?: number; // in lbs
  targetDuration?: number; // in seconds (for time-based exercises)
  restTime?: number; // in seconds between sets
  notes?: string; // admin notes/modifications for this exercise
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  category: WorkoutCategory;
  videoUrl?: string; // URL for external videos (YouTube, Vimeo)
  videoLocalPath?: string; // Local device path for uploaded videos
  videoCloudPath?: string; // Cloud storage path (Firebase Storage, S3, etc.)
  thumbnailUrl?: string;
  exercises: WorkoutExercise[];
  isTemplate?: boolean;
  createdBy?: string; // Admin user ID
  createdAt: string;
  updatedAt?: string;
}

// ============================================================================
// WORKOUT ASSIGNMENT
// ============================================================================

export type AssignmentStatus = 'assigned' | 'in-progress' | 'completed';

export interface WorkoutAssignment {
  id: string;
  clientId: string;
  workoutId: string;
  assignedDate: string;
  dueDate?: string;
  status: AssignmentStatus;
  completedDate?: string;
  assignedBy: string; // Admin user ID
}

// ============================================================================
// WORKOUT LOGGING (CLIENT PERFORMANCE TRACKING)
// ============================================================================

export type SessionStatus = 'in-progress' | 'completed' | 'abandoned';

export interface SetLog {
  setNumber: number; // 1, 2, 3, etc.
  repsCompleted: number;
  weightUsed?: number; // in lbs
  duration?: number; // in seconds, for time-based exercises
  completed: boolean; // false if skipped
  notes?: string; // per-set notes
}

export interface ExerciseLog {
  id: string;
  workoutSessionId: string;
  exerciseId: string;
  workoutExerciseId?: string; // reference to planned exercise in workout
  // Planned (copied from workout for reference)
  targetSets?: number;
  targetReps?: number;
  targetWeight?: number;
  targetDuration?: number;
  // Actual performance
  sets?: SetLog[];
  completedAt?: string;
  notes?: string; // client's notes about this exercise
  createdAt?: string;
}

export interface WorkoutSession {
  id: string;
  clientId: string;
  workoutId: string;
  assignmentId?: string;
  startedAt: string;
  completedAt?: string; // null if in progress
  status: SessionStatus;
  totalDuration?: number; // in minutes
  overallNotes?: string;
  rating?: number; // 1-5 stars, optional
  exerciseLogs?: ExerciseLog[]; // Populated with exercise performance data
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export type RootStackParamList = {
  Login: undefined;
  AdminMain: undefined;
  ClientMain: undefined;
  AddClient: undefined;
  WorkoutBuilder: undefined;
  WorkoutLog: { workoutId: string };
  AssignWorkout: { workoutId: string };
  AthleteDetail: { clientId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Invitation: { invitationCode: string };
};

export type AdminTabParamList = {
  AdminHome: undefined;
  ClientList: undefined;
  WorkoutList: undefined;
  AdminMore: undefined;
};

export type ClientTabParamList = {
  ClientHome: undefined;
  Progress: undefined;
  ClientMore: undefined;
};

export type AthletesStackParamList = {
  AthleteList: undefined;
  AthleteDetail: { clientId: string };
  AthleteForm: { clientId?: string };
};

export type WorkoutsStackParamList = {
  WorkoutList: undefined;
  WorkoutDetail: { workoutId: string };
  WorkoutBuilder: { workoutId?: string };
  ExerciseLibrary: undefined;
};

export type AthleteWorkoutsStackParamList = {
  WorkoutList: undefined;
  WorkoutDetail: { workoutId: string; assignmentId: string };
  WorkoutSession: { workoutId: string; assignmentId: string; sessionId?: string };
  SessionSummary: { sessionId: string };
};

// ============================================================================
// CONTEXT STATE TYPES
// ============================================================================

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface ClientsState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

export interface WorkoutsState {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
}

export interface ExercisesState {
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
}

export interface AssignmentsState {
  assignments: WorkoutAssignment[];
  loading: boolean;
  error: string | null;
}

export interface SessionsState {
  sessions: WorkoutSession[];
  currentSession: WorkoutSession | null;
  loading: boolean;
  error: string | null;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface PerformanceComparison {
  exercise: Exercise;
  planned: {
    sets: number;
    reps?: number;
    weight?: number;
    duration?: number;
  };
  actual: {
    sets: number;
    avgReps?: number;
    avgWeight?: number;
    totalDuration?: number;
  };
  performanceRating: 'exceeded' | 'met' | 'close' | 'under' | 'skipped';
}

export interface ProgressMetrics {
  totalWorkouts: number;
  completedWorkouts: number;
  adherenceRate: number; // percentage
  avgWorkoutDuration: number; // minutes
  personalRecords: PersonalRecord[];
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  recordType: 'max_weight' | 'max_reps' | 'max_volume';
  value: number;
  achievedAt: string;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface ClientFormData {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}

export interface WorkoutFormData {
  name: string;
  description?: string;
  category: WorkoutCategory;
  videoUrl?: string;
}

export interface ExerciseFormData {
  name: string;
  type: ExerciseType;
  muscleGroup?: string;
  equipment?: string;
  instructions?: string;
  videoUrl?: string;
}

export interface WorkoutExerciseFormData {
  exerciseId: string;
  targetSets: number;
  targetReps?: number;
  targetWeight?: number;
  targetDuration?: number;
  restTime?: number;
  notes?: string;
}

export interface SetLogFormData {
  repsCompleted: number;
  weightUsed?: number;
  duration?: number;
  notes?: string;
}
