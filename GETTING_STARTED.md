# Getting Started with PFA Training App

## ✅ Setup Complete!

Your Premier Fitness Alliance training app is ready to run. Here's what's been set up:

### What's Working
- ✅ Firebase configuration (CoachDeigo project)
- ✅ Complete navigation structure (Admin & Client flows)
- ✅ Authentication screens (Google & Apple sign-in)
- ✅ Admin screens (Dashboard, Athletes, Workouts)
- ✅ Client screens (Workouts, Logging, Progress)
- ✅ UI components (Button, Card, Input)
- ✅ Theme with Premier FA branding
- ✅ TypeScript types for all data models
- ✅ AsyncStorage service for offline data
- ✅ Placeholder app icons created

## 🚀 How to Run the App

### Option 1: Using Expo Go (Fastest)

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Open the app:**
   - **iOS**: Press `i` to open in iOS Simulator (requires Xcode)
   - **Android**: Press `a` to open in Android Emulator
   - **Physical Device**:
     - Install "Expo Go" app from App Store/Play Store
     - Scan the QR code with your camera (iOS) or Expo Go app (Android)

3. **If port 8081 is in use:**
   ```bash
   # Kill any existing processes
   pkill -f "expo start"

   # Or use a different port
   npm start -- --port 8082
   ```

### Option 2: Development Build (Full Native Features)

For Google/Apple Sign-In to work, you'll need a development build:

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS simulator
eas build --profile development --platform ios --local

# Or build for Android emulator
eas build --profile development --platform android --local
```

## 🔥 Firebase Setup (Required for Auth)

Before the app can authenticate users, configure Firebase:

### 1. Enable Authentication Methods

Go to [Firebase Console](https://console.firebase.google.com/project/coachdeigo/authentication/providers):

1. Click **"Authentication"** → **"Sign-in method"**

2. **Enable Google Sign-In:**
   - Click on Google provider
   - Toggle "Enable"
   - Add your project's support email
   - Click "Save"
   - **Copy the Web client ID** (you'll need this next)

3. **Enable Apple Sign-In:** (iOS only, requires Apple Developer account)
   - Click on Apple provider
   - Toggle "Enable"
   - Follow Apple setup instructions

### 2. Update Google Web Client ID

Edit `src/screens/auth/LoginScreen.tsx` line 12:

```typescript
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID_HERE', // Paste from Firebase Console
  offlineAccess: true,
});
```

### 3. Create Firestore Database

1. Go to [Firestore Database](https://console.firebase.google.com/project/coachdeigo/firestore)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a location (us-central1 recommended)
5. Click **"Enable"**

### 4. Enable Firebase Storage

1. Go to [Storage](https://console.firebase.google.com/project/coachdeigo/storage)
2. Click **"Get started"**
3. Choose **"Start in test mode"** (for development)
4. Click **"Done"**

## 📱 Testing the App

### Initial View
When you first run the app, you'll see the **Login Screen** with:
- "Sign in with Google" button
- "Sign in with Apple" button (iOS only)
- Premier FA branding

### After Setup
Once Firebase auth is configured, you can:
1. **Sign in** with Google/Apple
2. View the appropriate dashboard:
   - **Admins/Coaches**: Dashboard with athlete management and workout builder
   - **Athletes**: Assigned workouts and progress tracking

## ⚠️ Known Package Version Warnings

You may see warnings about package versions. These can be safely updated:

```bash
npx expo install --fix
```

This will update packages to their expected versions for Expo SDK 52.

## 🐛 Troubleshooting

### "Unable to resolve asset" errors
Run the asset generator:
```bash
node generate-assets.js
```

### Port 8081 already in use
```bash
pkill -f "expo start"
npm start
```

### TypeScript errors
```bash
npx tsc --noEmit --skipLibCheck
```

### Clear cache and restart
```bash
npm start -- --clear
```

### "Metro bundler won't start"
```bash
# Clear all caches
rm -rf node_modules
rm -rf .expo
npm install
npm start -- --clear
```

## 📝 Next Development Steps

### Phase 1: Complete Authentication ⏭️
- [ ] Add Google Web Client ID to LoginScreen
- [ ] Test Google Sign-In flow
- [ ] Test Apple Sign-In flow (iOS)
- [ ] Create auth context for user state management

### Phase 2: Admin Features
- [ ] Complete workout builder with exercise picker
- [ ] Add video upload functionality
- [ ] Implement workout assignment to athletes
- [ ] Test client invitation email flow

### Phase 3: Athlete Features
- [ ] Build workout logging UI with set-by-set tracking
- [ ] Add planned vs. actual performance indicators
- [ ] Create workout history view
- [ ] Add progress charts

### Phase 4: Polish
- [ ] Replace placeholder icons with PFA branding
- [ ] Add loading states and error handling
- [ ] Implement offline support
- [ ] Add push notifications for new workouts

## 📚 Documentation

- [README.md](README.md) - Project overview
- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Detailed Firebase guide
- [.speckit/](.speckit/) - Feature specifications and principles

## 🆘 Need Help?

- **Firebase Errors**: Check [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
- **Navigation Issues**: See [src/navigation/index.tsx](src/navigation/index.tsx)
- **Type Errors**: Check [src/types/index.ts](src/types/index.ts)

---

**Ready to build!** 🏗️

Start with: `npm start` and press `i` for iOS or `a` for Android.
