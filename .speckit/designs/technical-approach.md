# Technical Approach - PFA

## Technology Stack

### Core Framework
- **React Native** (via Expo) - Cross-platform mobile development
- **Expo SDK ~52** - Simplifies development and deployment
- **React 18.3.1** - UI component library

### Navigation
- **React Navigation** - Standard for React Native apps
  - Stack Navigator for main flows
  - Tab Navigator for primary sections (Clients, Workouts, Profile)

### State Management
- **React Context API** + **useReducer** - For global state (clients, workouts)
- Local component state for UI-specific state
- **React Query** (optional, for future API integration)

### Data Persistence
- **AsyncStorage** (Expo) - For simple key-value storage
- Alternative: **SQLite** (expo-sqlite) - If complex queries needed
- Start with AsyncStorage, migrate to SQLite if performance issues arise

### UI Components
- **React Native Paper** or **NativeBase** - Pre-built component library
- Custom components built on top for brand consistency

### Forms & Validation
- **React Hook Form** - Efficient form management
- **Zod** or **Yup** - Schema validation

### Authentication & User Management
- **Firebase Authentication** or **Supabase Auth** - OAuth providers (Google, Apple)
- **expo-apple-authentication** - Apple Sign-In
- **@react-native-google-signin/google-signin** or **Expo AuthSession** - Google Sign-In
- **Firebase Cloud Functions** or **Supabase Edge Functions** - Send welcome emails to new clients

### Video Upload & Media
- **expo-image-picker** - Select/record videos from device
- **expo-av** - Video playback component
- **expo-file-system** - Local video storage
- **Firebase Storage** or **AWS S3** or **Cloudinary** - Cloud video storage
- **expo-video-thumbnails** - Generate video thumbnails

### Additional Libraries
- **uuid** - Generate unique IDs
- **date-fns** - Date manipulation
- **@expo/vector-icons** - Icon library
- **react-native-video** - Advanced video playback (if needed)

## Architecture

### Folder Structure
```
/src
  /components       # Reusable UI components
    /common         # Buttons, inputs, cards, etc.
    /workout        # Workout-specific components
    /client         # Client-specific components
  /screens          # Full screen components
    /clients        # Client list, client detail
    /workouts       # Workout list, workout builder
    /exercises      # Exercise library
  /navigation       # Navigation configuration
  /context          # React Context providers
  /hooks            # Custom React hooks
  /utils            # Helper functions
  /services         # Data layer (storage, API)
  /types            # TypeScript types/interfaces
  /constants        # App constants, theme
```

### Data Layer Architecture

#### Storage Service
```typescript
// services/storage.ts
- saveClients(clients)
- getClients()
- saveWorkouts(workouts)
- getWorkouts()
- saveExercises(exercises)
- getExercises()
// etc.
```

#### Context Structure
- **AuthContext** - Manages authentication (admin/trainer and client login)
- **ClientContext** - Manages client data and operations
- **WorkoutContext** - Manages workout data and operations
- **ExerciseContext** - Manages exercise library
- **VideoContext** - Manages video upload and storage

### Data Models

```typescript
interface User {
  id: string; // Firebase/Supabase Auth UID
  email: string;
  displayName?: string;
  role: 'admin' | 'client';
  createdAt: string;
  lastLoginAt?: string;
}

interface Client {
  id: string;
  userId?: string; // Link to User account (null until they accept invitation)
  name: string;
  email: string; // Required for sending invitation
  phone?: string;
  notes?: string;
  active: boolean;
  invitationSent: boolean;
  invitationSentAt?: string;
  createdAt: string;
  createdBy: string; // Admin user ID
}

interface Exercise {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'other';
  muscleGroup?: string;
  equipment?: string;
  instructions?: string;
  videoUrl?: string;
}

interface WorkoutExercise {
  exerciseId: string;
  order: number;
  // Planned parameters set by admin
  targetSets: number;
  targetReps?: number; // per set
  targetWeight?: number;
  targetDuration?: number; // seconds, for time-based exercises
  restTime?: number; // seconds between sets
  notes?: string; // admin notes/modifications
}

interface Workout {
  id: string;
  name: string;
  description?: string;
  category: string; // 'strength', 'cardio', 'flexibility', 'hybrid', 'hiit', etc.
  videoUrl?: string; // URL for external videos (YouTube, Vimeo)
  videoLocalPath?: string; // Local device path for uploaded videos
  videoCloudPath?: string; // Cloud storage path (Firebase Storage, S3, etc.)
  thumbnailUrl?: string;
  exercises: WorkoutExercise[];
  isTemplate: boolean;
  createdBy: string; // Admin user ID
  createdAt: string;
  updatedAt: string;
}

interface WorkoutAssignment {
  id: string;
  clientId: string;
  workoutId: string;
  assignedDate: string;
  dueDate?: string;
  status: 'assigned' | 'in-progress' | 'completed';
  completedDate?: string;
}

interface WorkoutSession {
  id: string;
  clientId: string;
  workoutId: string;
  assignmentId: string;
  startedAt: string;
  completedAt?: string; // null if in progress
  status: 'in-progress' | 'completed' | 'abandoned';
  totalDuration?: number; // minutes
  overallNotes?: string;
  rating?: number; // 1-5 stars, optional
}

interface ExerciseLog {
  id: string;
  workoutSessionId: string;
  exerciseId: string;
  workoutExerciseId: string; // reference to planned exercise
  // Planned (copied from workout for reference)
  targetSets: number;
  targetReps?: number;
  targetWeight?: number;
  // Actual performance
  setLogs: SetLog[];
  completedAt?: string;
  notes?: string; // client's notes about this exercise
}

interface SetLog {
  setNumber: number; // 1, 2, 3, etc.
  repsCompleted: number;
  weightUsed?: number;
  duration?: number; // for time-based exercises
  completed: boolean; // false if skipped
  notes?: string; // per-set notes
}
```

## Development Phases

### Phase 1: Authentication & Foundation
1. Set up Firebase or Supabase project
2. Implement authentication screens (login/signup)
3. Add Google Sign-In integration
4. Add Apple Sign-In integration
5. Create AuthContext for auth state management
6. Set up navigation structure (auth vs main app)
7. Create basic UI components
8. Implement storage service with AsyncStorage
9. Create contexts for state management

### Phase 2: Client Management & Invitations
1. Client list screen
2. Add/edit client screen with email field (required)
3. Client detail screen
4. CRUD operations for clients
5. Send invitation email when admin creates new client
   - Use Firebase Cloud Functions or Supabase Edge Functions
   - Email contains app download link and invitation code
6. Client registration flow (first-time login)
   - Client receives email
   - Downloads app
   - Signs in with Google/Apple
   - Account linked to client profile

### Phase 3: Exercise Library
1. Exercise list screen
2. Add/edit exercise screen
3. Exercise detail view
4. Seed with common exercises

### Phase 4: Workout Builder with Video & Categories
1. Workout list screen with category filters
2. Workout builder screen (add/remove exercises)
3. Category selector (strength, cardio, flexibility, hybrid, HIIT, etc.)
4. Video upload functionality:
   - Record video with camera
   - Select from gallery
   - Enter external URL (YouTube, Vimeo)
5. Video player component
6. Video storage (local + cloud sync)
7. Generate video thumbnails
8. Exercise parameter inputs (sets, reps, weight, duration, rest time)
9. Workout templates
10. Duplicate workout functionality

### Phase 5: Workout Assignment
1. Assign workout to client
2. Client workout list view
3. Workout assignment history
4. Filter assignments by client or workout

### Phase 6: Client Workout Execution & Logging
1. Client workout list screen (assigned workouts)
2. Workout detail screen showing planned parameters
3. "Start Workout" functionality - create WorkoutSession
4. Exercise-by-exercise progression UI with:
   - Display planned vs actual side-by-side
   - Set-by-set logging interface
   - Pre-filled inputs with target values
   - Add/remove set buttons
   - Visual indicators (green/yellow/gray)
5. Video playback in workout view
6. Save exercise logs and set logs to database
7. Workout completion screen with summary
8. Mark workout as complete, calculate duration
9. In-progress workout detection and resume functionality
10. Workout history screen for clients
11. Previous performance comparison view

### Phase 7: Admin Analytics & Client Progress Tracking
1. Admin view of client workout history
2. Client progress dashboard showing:
   - Workouts completed vs assigned
   - Adherence rate
   - Performance trends (weight progression, volume)
3. Exercise-level analytics:
   - Planned vs actual comparison charts
   - Progress over time for specific exercises
4. Export client reports (PDF)
5. Notifications when clients complete workouts

### Phase 8: Polish & Enhancement
1. Advanced workout history filtering and search
2. Search and filter functionality (workouts, clients, categories)
3. UI/UX improvements and animations
4. Performance optimization
5. Offline video caching
6. Video compression and optimization
7. Progressive workout difficulty (auto-adjust based on performance)
8. Personal records tracking (PRs)

## Key Technical Decisions

### Why AsyncStorage First?
- Simpler to implement
- Sufficient for MVP with moderate data
- Can migrate to SQLite later without major refactor
- Good for offline-first approach

### Why React Context over Redux?
- Simpler for small/medium apps
- Built into React (no extra dependencies)
- Sufficient for app's state management needs
- Can upgrade to Redux/Zustand if needed

### Why React Navigation?
- Industry standard for React Native
- Well documented and maintained
- Expo compatible
- Supports all navigation patterns needed

### TypeScript Considerations
- Use TypeScript for type safety
- Already configured in project (@types/react)
- Define interfaces for all data models
- Use strict mode for better error catching

## Performance Considerations
- Lazy load screens with React.lazy
- Memoize expensive computations with useMemo
- Optimize lists with FlatList and proper keyExtractor
- Implement pagination for large lists (50+ items)
- Cache exercise library in memory
- Debounce search inputs

## Testing Strategy
- Unit tests for utility functions and services
- Integration tests for contexts
- E2E tests for critical user flows
- Manual testing on iOS device
- Use Jest for unit/integration tests
- Use Detox or Expo's testing tools for E2E

## Deployment
- Use Expo EAS Build for iOS builds
- Configure for TestFlight distribution
- Follow Apple App Store guidelines for submission
