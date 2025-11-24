# PFA - Premier Fitness Alliance Training App

A React Native mobile app for Premier Fitness Alliance to manage athlete training programs. Built for female soccer athletes with elite science and authentic mentorship.

## 🏃‍♀️ Features

### For Coaches (Admin)
- Create and manage customized workout programs
- Add exercises with detailed parameters (sets, reps, weight, duration)
- Upload workout videos
- Categorize workouts (strength, cardio, speed, agility, etc.)
- Manage athlete roster
- Invite athletes via email
- Track athlete progress

### For Athletes (Clients)
- View assigned workouts
- Log workout performance with planned vs. actual tracking
- Visual indicators for performance (green/yellow/red)
- Set-by-set logging with weight and reps
- View workout history and progress
- Access instructional videos

## 🛠️ Tech Stack

- **Framework**: React Native with Expo SDK ~52
- **Language**: TypeScript
- **Navigation**: React Navigation 7
- **UI Components**: React Native Paper
- **Authentication**: Firebase Auth (Google & Apple Sign-In)
- **Database**: Firestore
- **Storage**: Firebase Storage (for videos)
- **Local Storage**: AsyncStorage
- **State Management**: React Context API

## 📋 Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Emulator
- Firebase project set up (see [FIREBASE_SETUP.md](FIREBASE_SETUP.md))

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Follow the setup guide in [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
2. Your Firebase credentials are already configured in `src/services/firebase.ts`

### 3. Configure Google Sign-In

Update the Google Web Client ID in `src/screens/auth/LoginScreen.tsx`:

```typescript
GoogleSignin.configure({
  webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // Get from Firebase Console
  offlineAccess: true,
});
```

### 4. Start Development Server

```bash
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## 📁 Project Structure

```
pfa/
├── .speckit/                 # Specification-driven development docs
│   ├── PRINCIPLES.md         # Project vision and principles
│   └── specs/                # Feature specifications
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/           # Button, Card, Input
│   │   ├── workout/          # Workout-specific components
│   │   └── client/           # Client-specific components
│   ├── navigation/           # Navigation configuration
│   │   └── index.tsx         # Root navigator with auth/main stacks
│   ├── screens/              # Screen components
│   │   ├── auth/             # Login, invitation
│   │   ├── admin/            # Coach dashboard, workout builder
│   │   └── client/           # Athlete workouts, logging, progress
│   ├── services/             # Business logic & external services
│   │   ├── firebase.ts       # Firebase auth, Firestore, Storage
│   │   └── storage.ts        # AsyncStorage wrapper
│   ├── theme/                # Styling and theming
│   │   └── index.ts          # Colors, typography, common styles
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # All interfaces and types
│   └── constants/            # App constants
│       └── index.ts          # Colors, categories, validation rules
├── App.js                    # App entry point
├── FIREBASE_SETUP.md         # Firebase configuration guide
└── package.json              # Dependencies and scripts
```

## 🎨 Branding

**Premier Fitness Alliance** colors:
- Primary: Dark Navy `#1a1a1a`
- Athletic Blue: `#0066CC`
- Action Green: `#00D084`
- Warning Yellow: `#FFB800`
- Alert Red: `#DC3545`

## 🔥 Firebase Configuration

Your app is configured for the **CoachDeigo** Firebase project:
- Project ID: `coachdeigo`
- Auth Domain: `coachdeigo.firebaseapp.com`
- Storage: `coachdeigo.firebasestorage.app`

### Next Steps for Firebase:

1. **Enable Authentication Methods** (Firebase Console → Authentication → Sign-in method):
   - Enable Google Sign-In
   - Enable Apple Sign-In (requires Apple Developer account)

2. **Create Firestore Database** (Firebase Console → Firestore Database):
   - Start in test mode for development
   - Collections will be created automatically

3. **Enable Firebase Storage** (Firebase Console → Storage):
   - Start in test mode for development
   - Used for workout videos

4. **Add Google Web Client ID** to LoginScreen (see step 3 above)

## 📝 Development Workflow

### Phase 1: Foundation ✅
- [x] Type system and constants
- [x] AsyncStorage service
- [x] Firebase configuration
- [x] Navigation structure
- [x] Theme and styling
- [x] Basic UI components

### Phase 2: Authentication (Next)
- [ ] Complete Google Sign-In flow
- [ ] Complete Apple Sign-In flow
- [ ] Auth state management (Context)
- [ ] Protected routes

### Phase 3: Admin Features
- [ ] Client invitation system
- [ ] Workout builder with exercises
- [ ] Video upload functionality
- [ ] Workout assignment to athletes

### Phase 4: Athlete Features
- [ ] Workout logging interface
- [ ] Performance tracking (planned vs. actual)
- [ ] Workout history
- [ ] Progress charts

## 🧪 Testing

Run TypeScript type checking:
```bash
npx tsc --noEmit --skipLibCheck
```

## 📚 Additional Documentation

- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Detailed Firebase configuration
- [.speckit/PRINCIPLES.md](.speckit/PRINCIPLES.md) - Project vision and principles
- [.speckit/specs/](./speckit/specs/) - Feature specifications

## 🤝 Contributing

This is a private project for Premier Fitness Alliance. For questions or support, contact the development team.

## 📄 License

Proprietary - Premier Fitness Alliance

---

Built with ❤️ for female soccer athletes
