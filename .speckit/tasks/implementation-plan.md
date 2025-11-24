# Implementation Plan - PFA Admin Workout Management

## Phase 1: Project Setup & Foundation

### 1.1 Install Dependencies

#### Core Dependencies
- [ ] Install React Navigation dependencies
  ```bash
  npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
  npm install react-native-screens react-native-safe-area-context
  ```
- [ ] Install AsyncStorage
  ```bash
  npm install @react-native-async-storage/async-storage
  ```
- [ ] Install UUID for unique IDs
  ```bash
  npm install uuid
  npm install --save-dev @types/uuid
  ```
- [ ] Install UI component library (React Native Paper)
  ```bash
  npm install react-native-paper
  npm install react-native-vector-icons
  ```
- [ ] Install form handling
  ```bash
  npm install react-hook-form
  ```

#### Authentication Dependencies
- [ ] Install Firebase (recommended) or Supabase
  ```bash
  # Firebase option:
  npm install firebase
  npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/storage

  # OR Supabase option:
  npm install @supabase/supabase-js
  ```
- [ ] Install Google Sign-In
  ```bash
  npm install @react-native-google-signin/google-signin
  ```
- [ ] Install Apple Authentication
  ```bash
  npx expo install expo-apple-authentication
  ```
- [ ] Install Secure Storage
  ```bash
  npx expo install expo-secure-store
  ```

#### Video & Media Dependencies
- [ ] Install video and image handling libraries
  ```bash
  npx expo install expo-image-picker
  npx expo install expo-av
  npx expo install expo-file-system
  npx expo install expo-video-thumbnails
  ```

### 1.2 Create Project Structure
- [ ] Create `/src` directory with subdirectories:
  - `/components/common`
  - `/components/workout`
  - `/components/client`
  - `/screens/clients`
  - `/screens/workouts`
  - `/screens/exercises`
  - `/navigation`
  - `/context`
  - `/hooks`
  - `/services`
  - `/types`
  - `/constants`
  - `/utils`

### 1.3 Define TypeScript Types
- [ ] Create `src/types/index.ts` with all data model interfaces:
  - Client
  - Exercise
  - WorkoutExercise
  - Workout
  - WorkoutAssignment

### 1.4 Create Storage Service
- [ ] Create `src/services/storage.ts`
- [ ] Implement methods for:
  - `saveClients(clients: Client[])`
  - `getClients(): Promise<Client[]>`
  - `saveWorkouts(workouts: Workout[])`
  - `getWorkouts(): Promise<Workout[]>`
  - `saveExercises(exercises: Exercise[])`
  - `getExercises(): Promise<Exercise[]>`
  - `saveAssignments(assignments: WorkoutAssignment[])`
  - `getAssignments(): Promise<WorkoutAssignment[]>`

## Phase 2: Client Management

### 2.1 Client Context & State
- [ ] Create `src/context/ClientContext.tsx`
- [ ] Implement ClientProvider with state and actions:
  - `clients: Client[]`
  - `addClient(client: Client)`
  - `updateClient(id: string, updates: Partial<Client>)`
  - `deleteClient(id: string)`
  - `getClient(id: string)`

### 2.2 Client List Screen
- [ ] Create `src/screens/clients/ClientListScreen.tsx`
- [ ] Display list of all clients
- [ ] Add "Add Client" button
- [ ] Implement navigation to client detail

### 2.3 Add/Edit Client Screen
- [ ] Create `src/screens/clients/ClientFormScreen.tsx`
- [ ] Form fields: name (required), email, phone, notes
- [ ] Form validation
- [ ] Save to storage via context

### 2.4 Client Detail Screen
- [ ] Create `src/screens/clients/ClientDetailScreen.tsx`
- [ ] Display client info
- [ ] Show assigned workouts
- [ ] Edit and delete buttons

## Phase 3: Exercise Library

### 3.1 Exercise Context & State
- [ ] Create `src/context/ExerciseContext.tsx`
- [ ] Implement ExerciseProvider with state and actions:
  - `exercises: Exercise[]`
  - `addExercise(exercise: Exercise)`
  - `updateExercise(id: string, updates: Partial<Exercise>)`
  - `deleteExercise(id: string)`
- [ ] Seed with common exercises (push-ups, squats, bench press, etc.)

### 3.2 Exercise List Component
- [ ] Create `src/components/workout/ExerciseList.tsx`
- [ ] Display selectable list of exercises
- [ ] Search/filter functionality

### 3.3 Exercise Form Component
- [ ] Create `src/components/workout/ExerciseForm.tsx`
- [ ] Form for creating new exercises
- [ ] Fields: name, type, muscle group, equipment, instructions

## Phase 4: Workout Management

### 4.1 Workout Context & State
- [ ] Create `src/context/WorkoutContext.tsx`
- [ ] Implement WorkoutProvider with state and actions:
  - `workouts: Workout[]`
  - `addWorkout(workout: Workout)`
  - `updateWorkout(id: string, updates: Partial<Workout>)`
  - `deleteWorkout(id: string)`
  - `duplicateWorkout(id: string)`

### 4.2 Workout List Screen
- [ ] Create `src/screens/workouts/WorkoutListScreen.tsx`
- [ ] Display all workouts in a list
- [ ] Search/filter by name
- [ ] "Create Workout" button
- [ ] Navigate to workout detail on tap

### 4.3 Workout Builder Screen (Create/Edit)
- [ ] Create `src/screens/workouts/WorkoutBuilderScreen.tsx`
- [ ] Form fields: workout name, description
- [ ] "Add Exercise" button
- [ ] List of added exercises with parameters
- [ ] Exercise parameters form:
  - Sets (number input)
  - Reps (number input)
  - Weight (optional number input)
  - Rest time (optional number input)
  - Notes (text input)
- [ ] Remove exercise button
- [ ] Reorder exercises (up/down buttons or drag-and-drop)
- [ ] Save workout button

### 4.4 Workout Detail Screen
- [ ] Create `src/screens/workouts/WorkoutDetailScreen.tsx`
- [ ] Display workout name, description
- [ ] List all exercises with parameters
- [ ] Edit button → navigate to builder
- [ ] Delete button
- [ ] Duplicate button
- [ ] "Assign to Client" button

## Phase 5: Workout Assignment

### 5.1 Assignment Context & State
- [ ] Create `src/context/AssignmentContext.tsx`
- [ ] Implement AssignmentProvider with state and actions:
  - `assignments: WorkoutAssignment[]`
  - `assignWorkout(clientId: string, workoutId: string)`
  - `unassignWorkout(assignmentId: string)`
  - `getClientAssignments(clientId: string)`
  - `getWorkoutAssignments(workoutId: string)`

### 5.2 Assign Workout Modal/Screen
- [ ] Create `src/components/workout/AssignWorkoutModal.tsx`
- [ ] List of clients with checkboxes
- [ ] Optional due date picker
- [ ] Confirm button
- [ ] Save assignment to storage

### 5.3 Update Client Detail to Show Assignments
- [ ] Display assigned workouts on client detail screen
- [ ] Unassign button for each workout
- [ ] Navigate to workout detail on tap

### 5.4 Update Workout Detail to Show Assignments
- [ ] Display list of clients assigned to this workout
- [ ] Unassign button for each client

## Phase 6: Navigation Setup

### 6.1 Create Navigation Structure
- [ ] Create `src/navigation/AppNavigator.tsx`
- [ ] Bottom tab navigator with 3 tabs:
  - Clients tab
  - Workouts tab
  - Profile/Settings tab (placeholder)
- [ ] Stack navigators for each tab flow:
  - Clients: List → Detail → Form
  - Workouts: List → Detail → Builder → Assign

### 6.2 Update App.js
- [ ] Wrap app with NavigationContainer
- [ ] Wrap app with all Context Providers:
  - ClientProvider
  - ExerciseProvider
  - WorkoutProvider
  - AssignmentProvider
- [ ] Render AppNavigator

## Phase 7: UI/UX Polish

### 7.1 Styling
- [ ] Create theme in `src/constants/theme.ts`
- [ ] Apply consistent styling to all screens
- [ ] Add icons to navigation tabs
- [ ] Style buttons, forms, and cards

### 7.2 Loading & Error States
- [ ] Add loading indicators during data fetch
- [ ] Add error handling for storage operations
- [ ] Empty state messages (no clients, no workouts, etc.)

### 7.3 Confirmations & Feedback
- [ ] Confirmation dialogs for delete actions
- [ ] Success toasts/messages after save operations
- [ ] Validation error messages on forms

## Phase 8: Testing & Refinement

### 8.1 Manual Testing
- [ ] Test create/edit/delete workflows for clients
- [ ] Test create/edit/delete workflows for workouts
- [ ] Test exercise addition and reordering
- [ ] Test workout assignment and unassignment
- [ ] Test data persistence (close and reopen app)
- [ ] Test on physical iOS device

### 8.2 Edge Cases
- [ ] Handle deleting a client with assigned workouts
- [ ] Handle deleting a workout assigned to clients
- [ ] Handle editing a workout assigned to clients
- [ ] Validate required fields
- [ ] Handle empty lists gracefully

### 8.3 Performance
- [ ] Optimize list rendering with FlatList
- [ ] Implement memoization where needed
- [ ] Test with large datasets (50+ clients, 100+ workouts)

## Optional Enhancements (Post-MVP)
- [ ] Workout duplication feature
- [ ] Exercise library with pre-populated exercises
- [ ] Search and filter for clients/workouts
- [ ] Workout templates
- [ ] Export workout as PDF
- [ ] Dark mode support
