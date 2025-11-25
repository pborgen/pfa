# How to Run the PFA App

## Issue: No iOS Simulators Available

The error "No iOS devices available in Simulator.app" means you need to either:
1. Install iOS simulators via Xcode, or
2. Run on a physical device, or
3. Use Android emulator

---

## Option 1: Install iOS Simulators (Recommended for Mac)

### Install Xcode Simulators:

1. **Open Xcode**
2. Go to **Settings/Preferences** (⌘,)
3. Click **"Platforms"** (or "Components" in older Xcode)
4. Click the **download button** next to iOS simulators
5. Wait for download to complete

**Or via command line:**
```bash
# List available runtimes
xcrun simctl list runtimes

# Install latest iOS runtime
xcodebuild -downloadPlatform iOS
```

Then restart your terminal and run:
```bash
npm start
# Press 'i' for iOS
```

---

## Option 2: Run on Physical iPhone (Easiest)

### Using Expo Go App:

1. **Install Expo Go** on your iPhone:
   - Open App Store
   - Search "Expo Go"
   - Install the app

2. **Start the dev server:**
   ```bash
   npm start
   ```

3. **Scan the QR code:**
   - Open Camera app on iPhone
   - Point at the QR code in terminal
   - Tap the notification to open in Expo Go

**Note**: Google/Apple Sign-In won't work in Expo Go. You'll need a development build for that (see Option 4).

---

## Option 3: Use Android Emulator

### If you have Android Studio:

1. **Open Android Studio**
2. Go to **Tools** → **Device Manager**
3. **Create a new virtual device** or start an existing one

4. **In terminal:**
   ```bash
   npm start
   # Press 'a' for Android
   ```

### Install Android Studio:
```bash
# Download from: https://developer.android.com/studio
# Or with Homebrew:
brew install --cask android-studio
```

---

## Option 4: Build for Physical Device (For Full Features)

For Google/Apple Sign-In to work, you need a development build:

### Prerequisites:
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account (create free account if needed)
eas login
```

### Build for iOS:
```bash
# Configure project
eas build:configure

# Create development build for iOS device
eas build --profile development --platform ios

# Or for iOS Simulator (if you have simulators installed)
eas build --profile development --platform ios --local
```

### Install on Device:
1. After build completes, scan the QR code with your iPhone
2. Follow prompts to install the app
3. Trust the developer certificate in Settings

---

## Option 5: Run on Web (Limited Features)

Quick way to see the UI (no native features like auth):

```bash
npm start
# Press 'w' for web
```

**Note**: Google/Apple Sign-In won't work on web.

---

## Troubleshooting

### "No devices available"
- Make sure Xcode is installed: `xcode-select --install`
- Install iOS simulators (see Option 1)
- Or use physical device (see Option 2)

### "Port 8081 in use"
```bash
pkill -f "expo start"
npm start
```

### Metro bundler won't start
```bash
npm start -- --clear
```

### Can't scan QR code
```bash
# Use tunnel instead of LAN
npm start -- --tunnel
```

---

## Recommended Approach

**For Development:**
1. Use physical iPhone with Expo Go for quick UI testing
2. Set up iOS Simulator for faster iteration
3. Create development build when you need to test auth

**For Testing Auth:**
- You MUST use a development build (EAS Build)
- Expo Go doesn't support Google/Apple Sign-In

---

## Current Status

Your app is ready to run! Just need to choose a device:
- ✅ Code is complete
- ✅ Firebase configured
- ✅ Dev server can start
- ⚠️ Need iOS Simulator OR physical device to view

**Quick Start:**
```bash
# For physical iPhone:
npm start
# Scan QR with Camera app

# For web preview:
npm start
# Press 'w'
```

---

Let me know which option you'd like to pursue and I can help with setup!
