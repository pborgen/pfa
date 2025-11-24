# Feature Specification: Workout Management

## Overview
Enable admins (trainers/coaches) to create, edit, and assign customized workouts to clients. The primary focus is on the admin workflow for managing a library of workouts that can be assigned to multiple clients.

## User Stories

### As an Admin (Trainer/Coach)
1. I want to **create a new workout** with a name and description so I can build a library of workouts
2. I want to **assign a category to a workout** (e.g., strength, cardio, flexibility, hybrid) for better organization
3. I want to **upload a video for a workout** to demonstrate the entire workout routine or provide instructions
4. I want to **add exercises to a workout** with specific parameters (sets, reps, weight, duration, rest time)
5. I want to **edit existing workouts** to update exercises, parameters, details, category, or video
6. I want to **reorder exercises within a workout** to adjust the workout flow
7. I want to **duplicate workouts** to create variations quickly for different client needs
8. I want to **view all my workouts** in a searchable/filterable list
9. I want to **filter workouts by category** to quickly find specific types of workouts
10. I want to **assign a workout to one or more clients** from my workout library
11. I want to **update an assigned workout** and have changes reflect for all assigned clients (or create a new version)
12. I want to **see which clients have been assigned which workouts**
13. I want to **manage my client list** (add, edit, remove clients)
14. I want to **create workout templates** that can be reused across multiple clients

### As a Client
1. I want to **view my assigned workouts** in a list
2. I want to **select a workout to start** and see all exercises with planned parameters
3. I want to **see the planned sets, reps, and weight** for each exercise set by my trainer
4. I want to **log my actual performance** for each exercise:
   - Number of sets completed (may match or differ from plan)
   - Reps completed per set (may match or differ from plan)
   - Weight used per set (may match or differ from plan)
   - Notes about my performance or how I felt
5. I want to **see a comparison** between what was planned vs what I actually did
6. I want to **mark individual exercises as complete** as I progress through the workout
7. I want to **mark the entire workout as complete** when finished
8. I want to **see my workout history** with past logged workouts
9. I want to **review my previous performance** on the same workout to track progress

## Core Entities

### Client
- ID (unique identifier)
- Name
- Email (optional)
- Phone (optional)
- Notes
- Active status
- Created date

### Workout
- ID (unique identifier)
- Name
- Description
- Category (string: strength, cardio, flexibility, hybrid, etc.)
- Video URL or local video file path (optional)
- Thumbnail image (optional)
- Created by (trainer ID)
- Created date
- Last modified date
- Is template (boolean)
- Exercises (ordered list)

### Exercise
- ID (unique identifier)
- Name
- Type (strength, cardio, flexibility, etc.)
- Target muscle group
- Equipment needed
- Instructions/notes
- Demo video URL (optional)

### Workout Exercise (junction between Workout and Exercise)
- Workout ID
- Exercise ID
- Order (position in workout)
- **Planned parameters (set by admin):**
  - Target sets (number)
  - Target reps per set (number) OR Target duration (seconds for time-based exercises)
  - Target weight/resistance (number, optional)
  - Rest time between sets (seconds, optional)
- Notes (exercise-specific modifications from admin)

### Client Workout Assignment
- Client ID
- Workout ID
- Assigned date
- Status (assigned, in-progress, completed)
- Due date (optional)
- Completion date (optional)

### Workout Session (Client's workout completion record)
- ID (unique identifier)
- Client ID
- Workout ID
- Assignment ID (reference to the workout assignment)
- Started at (timestamp)
- Completed at (timestamp, null if in progress)
- Status (in-progress, completed, abandoned)
- Total duration (minutes)
- Overall notes (optional - how client felt, general comments)

### Exercise Log (Individual exercise performance within a session)
- ID (unique identifier)
- Workout Session ID
- Exercise ID
- Workout Exercise ID (reference to the planned exercise in the workout)
- **Planned (from admin):**
  - Target sets
  - Target reps per set
  - Target weight
- **Actual (logged by client):**
  - Sets completed (array of set logs)
- Completed at (timestamp)
- Notes (client's notes about this exercise)

### Set Log (Individual set performance)
- Set number (1, 2, 3, etc.)
- Reps completed (actual reps done)
- Weight used (actual weight used)
- Duration (for time-based exercises)
- Completed (boolean - did they complete this set or skip it)
- Notes (optional - per-set notes)

## Key Workflows

### Admin: Create Workout Flow
1. Admin navigates to "Workouts" section
2. Taps "Create New Workout" button
3. Enters workout name (required) and description (optional)
4. Selects or enters workout category (strength, cardio, flexibility, hybrid, etc.)
5. Optionally uploads a workout video:
   - Taps "Add Video" button
   - Chooses to either:
     - Record video with device camera
     - Select video from device gallery/camera roll
     - Enter a video URL (YouTube, Vimeo, etc.)
   - Video preview displays with option to remove/replace
6. Taps "Add Exercise" button
7. Either:
   - Selects from existing exercise library, OR
   - Creates a new exercise (name, type, instructions)
8. Enters exercise parameters:
   - Sets (number)
   - Reps (number) OR Duration (time for cardio/stretching)
   - Weight/Resistance (optional)
   - Rest time between sets (optional)
   - Exercise-specific notes (optional)
9. Repeats steps 6-8 for all exercises in the workout
10. Reorders exercises using drag-and-drop or up/down buttons
11. Saves workout to library

### Admin: Edit Workout Flow
1. Admin views workout list
2. Selects a workout to edit
3. Modifies workout details (name, description, category)
4. Updates or replaces workout video (or adds if not present)
5. Adds, removes, or edits exercises
6. Updates exercise parameters
7. Reorders exercises if needed
8. Saves changes
9. System prompts: "Update for all assigned clients?" or "Create new version?"

### Admin: Assign Workout Flow (Option A - From Client View)
1. Admin navigates to "Clients" section
2. Selects a client
3. Views client's profile/current workouts
4. Taps "Assign Workout"
5. Selects from workout library
6. Sets optional due date or start date
7. Confirms assignment

### Admin: Assign Workout Flow (Option B - From Workout View)
1. Admin views workout in library
2. Taps "Assign to Clients"
3. Selects one or multiple clients from list
4. Sets optional due date or start date
5. Confirms assignment for all selected clients

### Admin: View Workout Assignments
1. Admin navigates to "Assignments" or client detail page
2. Views list of all workout assignments
3. Filters by client, workout, date, or status
4. Can see assignment details and unassign if needed

### Client: Start Workout and Log Performance
1. Client opens app and sees list of assigned workouts
2. Client selects a workout to start
3. App displays workout overview:
   - Workout name, description, category
   - Video (if available)
   - List of all exercises with planned parameters
   - Estimated duration
4. Client taps "Start Workout" button
5. App creates new Workout Session record with status "in-progress"
6. App shows first exercise with:
   - Exercise name and instructions
   - **Planned parameters clearly displayed:**
     - "Target: 3 sets × 10 reps @ 50 lbs"
   - Empty logging form for actual performance
7. Client performs the exercise and logs each set:
   - **For each set, client enters:**
     - Reps completed (pre-filled with target, editable)
     - Weight used (pre-filled with target, editable)
     - Optional: Skip set if not completed
     - Optional: Add notes ("felt heavy", "easy", etc.)
   - Visual indicators show planned vs actual:
     - Green if matches or exceeds plan
     - Yellow if slightly under plan
     - Gray if skipped
8. Client taps "Add Set" to log additional sets (if they did more than planned)
9. Client taps "Complete Exercise" when done with all sets
10. App saves Exercise Log with all Set Logs
11. App moves to next exercise, repeating steps 6-10
12. After all exercises, client taps "Finish Workout"
13. App prompts for overall workout notes and rating (optional)
14. App marks Workout Session as "completed"
15. App shows workout summary:
    - Total duration
    - Exercises completed
    - Comparison: planned vs actual for each exercise
    - Option to view detailed breakdown

### Client: Review Previous Performance
1. Client opens a workout they've done before
2. App shows "Previous Sessions" section
3. Client taps to view past session
4. App displays:
   - Date and duration of previous workout
   - Exercise-by-exercise breakdown
   - Planned vs actual comparison
   - Progress indicators (did they improve?)
5. Client can use this to inform their current workout

### Client: Resume In-Progress Workout
1. Client starts a workout but doesn't finish
2. Later, client opens app
3. App shows notification: "You have an in-progress workout"
4. Client can:
   - Resume workout (picks up where they left off)
   - Abandon workout (mark as abandoned, doesn't count)
   - View workout (see what they logged so far)

### Admin: View Client Workout History
1. Admin navigates to client detail screen
2. Admin sees "Workout History" section
3. List shows all completed workout sessions with:
   - Workout name
   - Date completed
   - Duration
   - Completion rate (exercises completed vs total)
4. Admin taps on a session to view details:
   - Exercise-by-exercise breakdown
   - Planned vs actual comparison
   - Client's notes
   - Performance trends
5. Admin can use this to adjust future workouts

## Acceptance Criteria

### Must Have (MVP)

#### Admin Features
- ✅ Admin can add/edit/delete clients
- ✅ Admin can create new workouts with name, description, and category
- ✅ Admin can upload a video to a workout (from gallery, camera, or URL)
- ✅ Admin can add multiple exercises to a workout
- ✅ **Each exercise has planned parameters: target sets, target reps, target weight**
- ✅ Admin can edit existing workouts (modify name, description, category, video, exercises)
- ✅ Admin can delete workouts from library
- ✅ Admin can filter workouts by category
- ✅ Admin can assign a workout to one or more clients
- ✅ Admin can view list of all workouts
- ✅ Admin can view list of all clients
- ✅ Admin can see which workouts are assigned to which clients
- ✅ **Admin can view client workout history with planned vs actual comparison**
- ✅ Data persists between app sessions (local storage)
- ✅ Admin can login via Google
- ✅ Admin can login via Apple

#### Client Features
- ✅ Client can login via Google or Apple (invitation-based)
- ✅ Client can view their assigned workouts
- ✅ **Client can start a workout and see planned parameters (sets, reps, weight) for each exercise**
- ✅ **Client can log actual performance for each set: reps completed, weight used**
- ✅ **Client can add/remove sets (if they did more or less than planned)**
- ✅ **Client can see visual comparison between planned vs actual performance**
- ✅ Client can add notes per set or per exercise
- ✅ Client can mark exercises and workouts as complete
- ✅ **Client can view their workout history**
- ✅ **Client can review previous performance on the same workout**
- ✅ Client can resume in-progress workouts

### Should Have (Enhanced Admin Features)
- Exercise library with pre-populated common exercises
- Ability to duplicate workouts (clone with new name)
- Ability to create exercise templates from workouts
- Reorder exercises within a workout (drag-and-drop)
- Search and filter workouts by name
- Search and filter clients by name
- View workout assignment history
- Unassign workouts from clients
- Add weight/resistance and rest time fields to exercises
- Add duration field for time-based exercises (cardio, planks, etc.)

### Could Have (Future Enhancements)
- Workout versioning (track changes over time)
- Bulk assign workouts to multiple clients at once
- Exercise demo videos/images
- Exercise categories and filtering (strength, cardio, flexibility)
- Workout tags/categories for organization
- Export workout as PDF
- Workout scheduling/calendar view
- Statistics: most-used exercises, popular workouts
- Client workout execution tracking (future client app features)
- Multiple admin/trainer support with permissions

## Technical Considerations

### Authentication
- Use Firebase Authentication or Supabase for OAuth providers
- Implement Google Sign-In using `@react-native-google-signin/google-signin` or Expo AuthSession
- Implement Apple Sign-In using `expo-apple-authentication`
- Store user authentication tokens securely
- Associate user data (workouts, clients) with authenticated user ID

### Video Upload & Storage
- Use Expo ImagePicker for selecting videos from gallery or recording
- Video file size limits (recommend max 100MB for mobile)
- Video format support: MP4, MOV (native iOS formats)
- Storage options:
  - Local device storage for offline access (using expo-file-system)
  - Cloud storage (Firebase Storage, AWS S3, or Cloudinary) for syncing across devices
- Video thumbnail generation for preview
- Support for external video URLs (YouTube, Vimeo) with embedded player
- Video compression for efficient storage and playback

### Workout Categories
- Predefined categories: Strength, Cardio, Flexibility, Hybrid, HIIT, Yoga, Pilates, etc.
- Allow custom categories (admin can add new ones)
- Store categories as enum or string array in constants
- Category-based filtering and search

### Data Persistence
- Use local storage (AsyncStorage or SQLite) for offline capability
- Sync data to cloud backend when online (if using Firebase/Supabase)
- Handle offline-first architecture for gym environments

### Navigation & UI
- Simple navigation structure (tabs or stack navigation)
- Form validation for required fields
- Video player component for workout videos
- Responsive design for different screen sizes
