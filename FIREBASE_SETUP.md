# Firebase Setup Guide for PFA App

## Step 1: Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon ⚙️ > **Project Settings**
4. Scroll down to "Your apps" section
5. Click the **</>** (Web) icon to add a web app if you haven't
6. Copy the `firebaseConfig` object

## Step 2: Update Firebase Config

Open `src/services/firebase.ts` and replace the placeholder config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Step 3: Enable Authentication Methods

### Google Sign-In
1. Firebase Console > **Authentication** > **Sign-in method**
2. Click **Google** > **Enable**
3. Add support email
4. Save

### Apple Sign-In
1. Firebase Console > **Authentication** > **Sign-in method**
2. Click **Apple** > **Enable**
3. You'll need an Apple Developer account
4. Follow Firebase's Apple Sign-In setup guide
5. Save

## Step 4: Set up Firestore Database

1. Firebase Console > **Firestore Database**
2. Click **Create database**
3. Start in **test mode** (for development)
4. Choose a location (us-central1 recommended)
5. Click **Enable**

### Firestore Collections Structure

Create these collections (they'll be created automatically when first document is added):

```
/users/{userId}
  - email: string
  - displayName: string
  - role: 'admin' | 'client'
  - createdAt: timestamp

/clients/{clientId}
  - userId: string (optional)
  - name: string
  - email: string
  - ...

/workouts/{workoutId}
  - name: string
  - category: string
  - exercises: array
  - ...

/exercises/{exerciseId}
  - name: string
  - type: string
  ...

/assignments/{assignmentId}
  - clientId: string
  - workoutId: string
  - ...

/sessions/{sessionId}
  - clientId: string
  - workoutId: string
  - ...
```

## Step 5: Set up Firebase Storage

1. Firebase Console > **Storage**
2. Click **Get started**
3. Start in **test mode** (for development)
4. Click **Done**

### Storage Structure
```
/videos/{userId}/{workoutId}/{timestamp}.mp4
/thumbnails/{userId}/{workoutId}/{timestamp}.jpg
```

## Step 6: Configure Google Sign-In for iOS

1. Firebase Console > Project Settings > iOS app (add if needed)
2. Download `GoogleService-Info.plist`
3. Add to your Xcode project

In `app.json`, add:
```json
{
  "expo": {
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist",
      "bundleIdentifier": "com.premierfa.pfa"
    }
  }
}
```

## Step 7: Security Rules (Production)

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own document
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Admins can read/write all clients
    match /clients/{clientId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Similar rules for workouts, exercises, assignments, sessions
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /videos/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 8: (Optional) Set up Cloud Functions for Email

Create a Cloud Function to send invitation emails:

```bash
firebase init functions
cd functions
npm install nodemailer
```

`functions/index.js`:
```javascript
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.sendInvitationEmail = functions.https.onCall(async (data, context) => {
  const { email, clientName, trainerName, invitationCode } = data;

  // Configure your email service (SendGrid, Mailgun, etc.)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password'
    }
  });

  const mailOptions = {
    from: 'Premier Fitness Alliance <noreply@premierfa.com>',
    to: email,
    subject: `You're invited to ${trainerName}'s Training Program!`,
    html: `
      <h2>Welcome to Premier Fitness Alliance!</h2>
      <p>Hi ${clientName},</p>
      <p>${trainerName} has invited you to their training program.</p>
      <p><a href="pfa://invite?code=${invitationCode}">Get Started</a></p>
    `
  };

  await transporter.sendMail(mailOptions);
  return { success: true };
});
```

Deploy:
```bash
firebase deploy --only functions
```

## Testing

### Test Authentication
```typescript
import { signInWithGoogle } from './src/services/firebase';

// After getting Google ID token
const user = await signInWithGoogle(idToken);
console.log('Signed in:', user.email);
```

### Test Firestore
```typescript
import { setUserDoc, getUserDoc } from './src/services/firebase';

await setUserDoc('user123', {
  email: 'test@example.com',
  role: 'admin',
  createdAt: new Date()
});

const userData = await getUserDoc('user123');
console.log(userData);
```

## Troubleshooting

### "Firebase app not initialized"
- Make sure `firebaseConfig` has real values (not placeholders)
- Check that Firebase is initialized before any auth/db calls

### "Permission denied" errors
- Check Firestore security rules
- Ensure user is authenticated
- Verify user role is correct

### Google Sign-In not working
- Verify GoogleService-Info.plist is added to Xcode
- Check iOS bundle ID matches Firebase console
- Enable Google sign-in in Firebase Authentication

### Apple Sign-In not working
- Requires paid Apple Developer account
- Configure Apple Developer Console properly
- Enable Apple sign-in in Firebase Authentication

## Resources

- [Firebase iOS Setup](https://firebase.google.com/docs/ios/setup)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Get Started](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Storage](https://firebase.google.com/docs/storage)
- [Cloud Functions](https://firebase.google.com/docs/functions)
