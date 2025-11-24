# PFA - Premier Fitness Alliance Training App - Specification Overview

## Project Summary
The PFA mobile app is the official training platform for **[Premier Fitness Alliance](https://www.premierfa.com/)**, a Connecticut-based performance training organization specializing in athletic development for female soccer players. The app empowers coaches to create biomechanics-based training programs and enables athletes to track their performance, progress, and development toward elite-level play.

**Premier FA Mission:** "Empower the next generation of female athletes by harmonizing elite science with authentic mentorship."

### Target Users
- **Coaches (Admins)**: PFA coaches creating precision training programs
- **Athletes (Clients)**: Young female soccer players (youth & high school) training for performance improvement

## 📁 Specification Documents

### Core Documents
1. **[PRINCIPLES.md](PRINCIPLES.md)** - Project vision and core principles
2. **[designs/technical-approach.md](designs/technical-approach.md)** - Technical architecture and technology stack
3. **[designs/branding-guidelines.md](designs/branding-guidelines.md)** - Brand identity, visual design, and UI guidelines
4. **[tasks/implementation-plan.md](tasks/implementation-plan.md)** - Step-by-step implementation checklist

### Feature Specifications
1. **[specs/01-workout-management.md](specs/01-workout-management.md)** - Admin workout creation, editing, and assignment
2. **[specs/02-authentication-and-invitations.md](specs/02-authentication-and-invitations.md)** - Google/Apple login and client invitation system
3. **[specs/03-workout-logging.md](specs/03-workout-logging.md)** - Client workout execution and performance logging (planned vs actual)

## 🎯 Key Features

### For Admins (Trainers/Coaches)
- ✅ Sign in with Google or Apple
- ✅ Create and manage clients
- ✅ Send email invitations to new clients
- ✅ Create workouts with name, description, and category
- ✅ Upload workout videos (from camera, gallery, or URL)
- ✅ Add multiple exercises to workouts with parameters (sets, reps, weight, rest time)
- ✅ Categorize workouts (strength, cardio, flexibility, hybrid, HIIT, etc.)
- ✅ Filter workouts by category
- ✅ Edit and delete workouts
- ✅ Assign workouts to one or more clients
- ✅ View which clients have which workouts assigned

### For Clients
- ✅ Receive email invitation from trainer
- ✅ Sign in with Google or Apple
- ✅ View assigned workouts
- ✅ Watch workout videos
- ✅ See planned parameters (target sets, reps, weight) for each exercise
- ✅ **Start workout and log actual performance set-by-set**
- ✅ **See visual comparison between planned vs actual (green/yellow/red indicators)**
- ✅ **Add or skip sets if doing more/less than planned**
- ✅ **Add notes per set, per exercise, or per workout**
- ✅ **Resume in-progress workouts**
- ✅ **View detailed workout history**
- ✅ **Compare current performance with previous sessions**
- ✅ Track progress over time with analytics

## 🏗️ Technology Stack

### Core
- **React Native** via Expo SDK ~52
- **TypeScript** for type safety
- **React Navigation** for navigation
- **React Native Paper** for UI components

### Authentication
- **Firebase Authentication** (recommended) or Supabase Auth
- **expo-apple-authentication** for Apple Sign-In
- **@react-native-google-signin/google-signin** for Google Sign-In

### Data Storage
- **AsyncStorage** for local data persistence
- **Firebase Firestore** or **Supabase Database** for cloud sync
- **Firebase Storage** or **AWS S3** for video storage

### Video & Media
- **expo-image-picker** for video selection/recording
- **expo-av** for video playback
- **expo-file-system** for local storage
- **expo-video-thumbnails** for thumbnail generation

### State Management
- **React Context API** with useReducer
- Separate contexts for Auth, Clients, Workouts, Exercises, Videos

## 📊 Data Models

### User
- ID, Email, Display Name, Role (admin/client), Auth Provider

### Client
- ID, User ID (linked after invitation accepted), Name, Email, Phone, Notes, Invitation Status

### Workout
- ID, Name, Description, Category, Video URLs, Exercises, Created By, Timestamps

### Exercise
- ID, Name, Type, Muscle Group, Equipment, Instructions

### Workout Exercise
- Exercise ID, Order, Sets, Reps, Weight, Duration, Rest Time, Notes

### Workout Assignment
- Client ID, Workout ID, Assigned Date, Due Date, Status

## 🔄 Key Workflows

### Admin Creates Client
1. Admin enters client details (name, email required)
2. System saves client
3. System sends invitation email to client
4. Email contains app download link and invitation code

### Client First-Time Sign In
1. Client receives email invitation
2. Client downloads app and opens invitation link
3. Client signs in with Google or Apple
4. System links client account to trainer's client profile
5. Client sees their assigned workouts

### Admin Creates Workout
1. Admin enters workout name, description, and category
2. Admin optionally uploads video (camera, gallery, or URL)
3. Admin adds exercises with parameters
4. Admin saves workout to library
5. Admin assigns workout to one or more clients

## 📝 Implementation Phases

1. **Authentication & Foundation** - Set up Firebase/Supabase, Google/Apple login, navigation
2. **Client Management & Invitations** - Client CRUD, invitation emails, client onboarding
3. **Exercise Library** - Pre-populate exercises, exercise management
4. **Workout Builder with Video & Categories** - Workout creation, video upload, categories
5. **Workout Assignment** - Assign workouts to clients, view assignments
6. **Client Workout Execution** (Future) - Client workout view, logging, history
7. **Polish & Enhancement** - Search, filters, analytics, offline video caching

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Expo CLI
- iOS development environment (Mac with Xcode)
- Firebase or Supabase account

### Next Steps
1. Review [PRINCIPLES.md](PRINCIPLES.md) to understand project vision
2. Read [technical-approach.md](designs/technical-approach.md) for architecture decisions
3. Follow [implementation-plan.md](tasks/implementation-plan.md) for development checklist
4. Reference feature specs for detailed requirements:
   - [01-workout-management.md](specs/01-workout-management.md)
   - [02-authentication-and-invitations.md](specs/02-authentication-and-invitations.md)

## 📧 Contact
For questions about this specification, consult the documents above or reach out to the project team.

---

*This specification was created using [Speckit](https://github.com/jwill9999/spec-kit) - Spec-Driven Development made simple.*
