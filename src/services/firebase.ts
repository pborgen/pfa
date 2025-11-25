// PFA - Premier Fitness Alliance Training App
// Firebase Configuration and Services

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import {
  getStorage,
  FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from '@env';

// ============================================================================
// FIREBASE CONFIGURATION
// ============================================================================

// Firebase configuration loaded from environment variables
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

// ============================================================================
// EXPORTS
// ============================================================================

export { app, auth, db, storage };

// ============================================================================
// FIRESTORE HELPERS
// ============================================================================

// Collections
const COLLECTIONS = {
  users: 'users',
  clients: 'clients',
  workouts: 'workouts',
  exercises: 'exercises',
  assignments: 'assignments',
  sessions: 'sessions',
  invitations: 'invitations',
};

// ============================================================================
// USER OPERATIONS
// ============================================================================

export const createUserDocument = async (
  userId: string,
  userData: {
    email: string;
    displayName?: string;
    role: 'admin' | 'client';
    authProvider: 'google' | 'apple';
  }
) => {
  const userRef = doc(db, COLLECTIONS.users, userId);
  await setDoc(userRef, {
    ...userData,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  });
};

export const getUserDocument = async (userId: string) => {
  const userRef = doc(db, COLLECTIONS.users, userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

export const updateUserLastLogin = async (userId: string) => {
  const userRef = doc(db, COLLECTIONS.users, userId);
  await updateDoc(userRef, {
    lastLoginAt: new Date().toISOString(),
  });
};

// ============================================================================
// CLIENT OPERATIONS
// ============================================================================

export const createClient = async (clientId: string, clientData: any) => {
  const clientRef = doc(db, COLLECTIONS.clients, clientId);
  await setDoc(clientRef, {
    ...clientData,
    createdAt: new Date().toISOString(),
  });
};

export const getClientsByAdmin = async (adminUserId: string) => {
  const q = query(
    collection(db, COLLECTIONS.clients),
    where('createdBy', '==', adminUserId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ============================================================================
// WORKOUT OPERATIONS
// ============================================================================

export const createWorkout = async (workoutId: string, workoutData: any) => {
  const workoutRef = doc(db, COLLECTIONS.workouts, workoutId);
  await setDoc(workoutRef, {
    ...workoutData,
    createdAt: new Date().toISOString(),
  });
};

export const getWorkoutsByAdmin = async (adminUserId: string) => {
  const q = query(
    collection(db, COLLECTIONS.workouts),
    where('createdBy', '==', adminUserId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getWorkout = async (workoutId: string) => {
  const workoutRef = doc(db, COLLECTIONS.workouts, workoutId);
  const workoutSnap = await getDoc(workoutRef);
  return workoutSnap.exists() ? { id: workoutSnap.id, ...workoutSnap.data() } : null;
};

// ============================================================================
// STORAGE OPERATIONS
// ============================================================================

export const uploadVideo = async (
  path: string,
  file: Blob
): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const deleteVideo = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};

export const getVideoUrl = async (path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  return await getDownloadURL(storageRef);
};
