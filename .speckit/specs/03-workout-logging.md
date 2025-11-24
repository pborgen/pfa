# Feature Specification: Workout Logging & Performance Tracking

## Overview
Enable clients to log their actual workout performance against the workout plan created by their trainer. Clients can track sets, reps, and weight for each exercise, with the ability to deviate from the plan. Both clients and admins can view workout history and performance trends.

## User Stories

### As an Admin (Trainer/Coach)
1. I want to **set target parameters** (sets, reps, weight) when creating workout exercises
2. I want to **view my client's workout history** to see what they've completed
3. I want to **compare planned vs actual performance** for each workout session
4. I want to **see if my clients are meeting their targets** or consistently over/underperforming
5. I want to **track client progress over time** on specific exercises (e.g., bench press weight progression)
6. I want to **receive notifications** when clients complete workouts
7. I want to **use historical data** to adjust future workout plans

### As a Client
1. I want to **see my trainer's target parameters** (sets, reps, weight) for each exercise
2. I want to **log my actual performance** for each set as I complete it
3. I want to **quickly match the target** or easily adjust if I did more/less
4. I want to **add or skip sets** if I did extra work or couldn't complete all planned sets
5. I want to **see visual feedback** showing if I met, exceeded, or fell short of targets
6. I want to **add notes** about how the exercise felt or any issues
7. I want to **review my previous performance** on the same workout before starting
8. I want to **track my progress** and see improvements over time
9. I want to **resume incomplete workouts** if I have to stop mid-session
10. I want to **view my workout history** with detailed breakdowns

## Core Concepts

### Planned vs Actual
- **Planned**: What the admin/trainer sets as the target (e.g., "3 sets × 10 reps @ 135 lbs")
- **Actual**: What the client actually performs and logs (e.g., "3 sets: 10, 8, 8 reps @ 135 lbs")

### Visual Indicators
- **Green**: Met or exceeded target (e.g., did 10 reps when target was 10)
- **Yellow**: Close but slightly under (e.g., did 8-9 reps when target was 10)
- **Red**: Significantly under target (e.g., did 5 reps when target was 10)
- **Gray**: Skipped set

### Set Logging Flexibility
- Client can do more sets than planned (add sets)
- Client can do fewer sets than planned (skip sets)
- Client can adjust reps and weight per set
- Each set is logged individually for granular tracking

## Key Workflows

### Admin: Set Target Parameters in Workout
1. Admin creates or edits a workout
2. For each exercise, admin sets:
   - **Target Sets**: e.g., 3
   - **Target Reps per Set**: e.g., 10 (or duration for time-based)
   - **Target Weight**: e.g., 135 lbs (optional)
   - **Rest Time**: e.g., 60 seconds (optional)
3. Admin saves workout with all target parameters
4. When assigned to client, client sees these as their goals

### Client: Start Workout and See Targets
1. Client opens assigned workout
2. App displays workout overview with all exercises
3. Client taps "Start Workout"
4. App creates WorkoutSession with status "in-progress"
5. App records start time
6. Client sees first exercise with clear display:
   ```
   Exercise: Bench Press
   Target: 3 sets × 10 reps @ 135 lbs
   Rest: 60 seconds between sets
   ```

### Client: Log Performance Set-by-Set

**Scenario 1: Meets Target Perfectly**
1. Client performs Set 1: 10 reps @ 135 lbs
2. Client taps "Log Set" button
3. Input fields pre-filled with targets:
   - Reps: [10] ✓ (pre-filled)
   - Weight: [135] lbs ✓ (pre-filled)
4. Client confirms (taps "Done" or swipes to next)
5. Set 1 shows with green indicator: ✓ 10 reps @ 135 lbs
6. Rest timer starts (60 seconds)
7. Repeat for Set 2 and Set 3

**Scenario 2: Deviates from Target**
1. Client performs Set 1: 10 reps @ 135 lbs (meets target)
2. Client performs Set 2: 8 reps @ 135 lbs (fell short)
3. Client logs Set 2:
   - Reps: [8] (edited from 10)
   - Weight: [135] lbs
4. Set 2 shows with yellow indicator: ⚠ 8 reps @ 135 lbs
5. Client performs Set 3: 12 reps @ 135 lbs (exceeded!)
6. Client logs Set 3:
   - Reps: [12] (edited from 10)
   - Weight: [135] lbs
7. Set 3 shows with green indicator: ✓ 12 reps @ 135 lbs

**Scenario 3: Does More Sets Than Planned**
1. Target was 3 sets
2. Client completes all 3 sets
3. Client feels good and wants to do a 4th set
4. Client taps "Add Another Set" button
5. App adds Set 4 with pre-filled target values
6. Client logs Set 4: 9 reps @ 135 lbs
7. Summary shows: "Completed 4 sets (Target: 3)"

**Scenario 4: Skips a Set**
1. Client completes Set 1 and Set 2
2. Client is too fatigued for Set 3
3. Client taps "Skip Set" for Set 3
4. Set 3 shows as: ✗ Skipped
5. Client can add optional note: "Too fatigued"
6. Client moves to next exercise

**Scenario 5: Different Weight Per Set (Pyramid)**
1. Client performs Set 1: 10 reps @ 135 lbs
2. Client performs Set 2: 8 reps @ 155 lbs (increased weight)
3. Client logs each with actual weight used
4. App tracks weight progression within exercise

### Client: Add Notes and Context
- **Per-Set Notes**: "Last rep was hard", "Form broke down", "Felt easy"
- **Per-Exercise Notes**: "Shoulder felt tight", "Best I've ever felt on this"
- **Per-Workout Notes**: "Great energy today", "Tired from poor sleep"

### Client: Complete Exercise
1. Client logs all sets (or skips remaining)
2. Client taps "Complete Exercise" button
3. App shows quick summary:
   ```
   Bench Press Complete! ✓
   - Set 1: 10 reps @ 135 lbs ✓
   - Set 2: 8 reps @ 135 lbs ⚠
   - Set 3: 12 reps @ 135 lbs ✓
   Target: 3 × 10 @ 135 lbs
   You averaged 10 reps per set
   ```
4. App saves ExerciseLog with all SetLogs
5. App moves to next exercise

### Client: Complete Workout
1. Client completes all exercises (or remaining)
2. Client taps "Finish Workout" button
3. App prompts for:
   - Overall workout notes (optional)
   - Workout rating (1-5 stars, optional)
4. App calculates total workout duration
5. App updates WorkoutSession:
   - Status: "completed"
   - Completed at: current timestamp
   - Total duration: calculated
6. App shows workout summary screen:
   ```
   Workout Complete! 🎉
   Duration: 45 minutes
   Exercises: 5/5 completed

   Bench Press: 3 sets ✓
   Squats: 4 sets ✓ (1 extra!)
   Deadlifts: 3 sets ⚠ (2 reps short on set 3)
   ...

   Overall: You met or exceeded targets on 90% of exercises!
   ```
7. Client can view detailed breakdown or return to home

### Client: Resume In-Progress Workout
1. Client starts workout but has to leave
2. Client closes app without finishing
3. Later, client reopens app
4. App detects in-progress WorkoutSession
5. App shows banner: "You have an incomplete workout from 2 hours ago"
6. Client options:
   - **Resume**: Pick up where they left off
   - **Abandon**: Mark as abandoned (doesn't count toward stats)
   - **View**: See what they've logged so far
7. If resumed, client continues from next incomplete exercise

### Client: View Workout History
1. Client navigates to "History" tab
2. App displays list of completed WorkoutSessions:
   ```
   [Date] [Workout Name] [Duration] [Status]
   Today    Chest Day      45 min    ✓ Completed
   2 days   Leg Day        52 min    ✓ Completed
   5 days   Chest Day      43 min    ✓ Completed
   ```
3. Client taps on a session to view details
4. App shows:
   - Date and time
   - Total duration
   - Exercise-by-exercise breakdown
   - Planned vs actual comparison
   - Notes
5. Client can filter history by:
   - Date range
   - Specific workout
   - Completion status

### Client: Compare with Previous Performance
1. Client opens a workout they've done before
2. Before starting, app shows "Previous Sessions" section:
   ```
   Last Time (3 days ago):
   - Duration: 43 minutes
   - Bench Press: 3 × 10 @ 135 lbs
   - Squats: 3 × 12 @ 185 lbs
   ...
   ```
3. Client can see what they did last time
4. Client can use this to gauge if they should increase weight
5. During workout, app can show progress indicators:
   ```
   Bench Press
   Target: 3 × 10 @ 135 lbs
   Last Time: You did 10, 9, 9 @ 135 lbs
   ```

### Admin: View Client Workout History
1. Admin navigates to client detail screen
2. Admin sees "Workout History" section
3. Admin views list of all sessions for this client
4. Admin taps session to see details:
   - Date, duration, workout name
   - Exercise-by-exercise with planned vs actual
   - Visual indicators for each set
   - Client notes
5. Admin sees trends:
   ```
   Bench Press Progress (Last 4 Sessions):
   Week 1: 3 × 10 @ 135 lbs
   Week 2: 3 × 10 @ 140 lbs ↑
   Week 3: 3 × 9 @ 145 lbs ↑
   Week 4: 3 × 10 @ 145 lbs ✓
   ```

### Admin: Adjust Future Workouts Based on Data
1. Admin reviews client's performance trends
2. Admin notices client consistently exceeds targets
3. Admin creates new workout or edits existing:
   - Increases target weight: 135 lbs → 145 lbs
   - Increases target reps: 10 → 12
4. Admin assigns updated workout to client
5. Client sees new challenges based on their progress

## UI/UX Considerations

### During Workout - Logging Interface
```
┌─────────────────────────────────────┐
│  Exercise 2 of 5: Bench Press       │
│  Target: 3 sets × 10 reps @ 135 lbs │
├─────────────────────────────────────┤
│  Set 1  ✓                           │
│  10 reps @ 135 lbs                  │
│                                     │
│  Set 2  ✓                           │
│  10 reps @ 135 lbs                  │
├─────────────────────────────────────┤
│  Set 3 (Current)                    │
│                                     │
│  Reps: [  10  ] 👆                  │
│  Weight: [ 135 ] lbs 👆             │
│                                     │
│  [Add Note]                         │
│                                     │
│  [Log Set] [Skip Set]               │
├─────────────────────────────────────┤
│  [Add Another Set]                  │
│  [Complete Exercise]                │
└─────────────────────────────────────┘
```

### Quick Input Methods
- Number pad for reps/weight (large, easy to tap)
- Stepper buttons (+/-) for fine adjustments
- Voice input option: "Ten reps at one thirty five"
- "Same as last set" button for quick logging
- Swipe gestures for quick confirmation

### Rest Timer
- Automatic countdown between sets (based on rest time)
- Optional: Skip timer if ready sooner
- Optional: Extend timer if need more rest
- Visual progress bar
- Audio cue when rest is complete

## Data Storage Strategy

### Real-time Saving
- Save each set log immediately as client enters it
- Don't wait until workout complete
- Ensures no data loss if app crashes

### Offline Support
- Client can log workouts offline
- Data stored locally
- Syncs to cloud when connection available
- Show sync status indicator

### Data Structure Example
```json
{
  "workoutSession": {
    "id": "session_123",
    "clientId": "client_456",
    "workoutId": "workout_789",
    "assignmentId": "assignment_101",
    "startedAt": "2024-01-15T10:00:00Z",
    "completedAt": "2024-01-15T10:45:00Z",
    "status": "completed",
    "totalDuration": 45,
    "overallNotes": "Great energy today!",
    "rating": 5,
    "exerciseLogs": [
      {
        "id": "exlog_1",
        "exerciseId": "ex_bench",
        "workoutExerciseId": "wex_1",
        "targetSets": 3,
        "targetReps": 10,
        "targetWeight": 135,
        "setLogs": [
          {
            "setNumber": 1,
            "repsCompleted": 10,
            "weightUsed": 135,
            "completed": true,
            "notes": ""
          },
          {
            "setNumber": 2,
            "repsCompleted": 8,
            "weightUsed": 135,
            "completed": true,
            "notes": "Last 2 reps were hard"
          },
          {
            "setNumber": 3,
            "repsCompleted": 12,
            "weightUsed": 135,
            "completed": true,
            "notes": "Felt strong!"
          }
        ],
        "completedAt": "2024-01-15T10:15:00Z",
        "notes": "Best bench session yet"
      }
    ]
  }
}
```

## Analytics & Insights

### For Clients
- **Personal Records**: Track PRs for each exercise (max weight, max reps, max volume)
- **Progress Charts**: Visualize improvement over time
- **Consistency Score**: % of assigned workouts completed
- **Performance Trends**: Are you getting stronger?
- **Body Part Focus**: Which muscle groups trained most

### For Admins
- **Client Adherence**: Are they completing assigned workouts?
- **Target Achievement Rate**: How often do they meet targets?
- **Progressive Overload Tracking**: Are they progressing appropriately?
- **Exercise Performance**: Which exercises do they struggle with?
- **Volume Tracking**: Total weight × reps × sets over time

## Acceptance Criteria

### Must Have
- ✅ Admin sets target sets, reps, and weight when creating workout
- ✅ Client sees targets clearly displayed before and during workout
- ✅ Client can log actual reps and weight for each set
- ✅ Client can add more sets than planned
- ✅ Client can skip sets
- ✅ Visual indicators show planned vs actual (green/yellow/red)
- ✅ App saves data in real-time as sets are logged
- ✅ Client can complete workout and see summary
- ✅ Client can view workout history
- ✅ Admin can view client workout history with planned vs actual
- ✅ App handles in-progress workouts and allows resuming

### Should Have
- Rest timer between sets
- Voice input for logging
- "Same as last set" quick button
- Comparison with previous performance before starting
- Progress charts and analytics
- Personal records tracking
- Export workout history

### Could Have (Future)
- Progressive overload suggestions
- Form check reminders (video yourself)
- Integration with wearables (auto-log rest time, HR)
- Social features (share PRs)
- Workout streaks and gamification
- Predictive analytics (suggest when to increase weight)
