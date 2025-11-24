// PFA - Premier Fitness Alliance Training App
// Firebase Configuration and Services

import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  signInWithCredential,
  GoogleAuthProvider,
  OAuthProvider,
  User as FirebaseUser,
  signOut as firebaseSignOut,
} from 'firebase/auth';
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
  Timestamp,
} from 'firebase/firestore';
import {
  getStorage,
  FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

// ============================================================================
// FIREBASE CONFIGURATION
// ============================================================================

// Firebase configuration for CoachDeigo project
const firebaseConfig = {
  apiKey: 'AIzaSyCrzbjVy7wGf63Wa8eybHRQm4mPQ-haIT4',
  authDomain: 'coachdeigo.firebaseapp.com',
  projectId: 'coachdeigo',
  storageBucket: 'coachdeigo.firebasestorage.app',
  messagingSenderId: '844462962512',
  appId: '1:844462962512:web:be4f61b80dafffccac5e55',
  measurementId: 'G-19DJTL7P6F',
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
// AUTHENTICATION SERVICES
// ============================================================================

/**
 * Sign in with Google using credential from @react-native-google-signin
 */
export const signInWithGoogle = async (idToken: string): Promise<FirebaseUser> => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

/**
 * Sign in with Apple using credential from expo-apple-authentication
 */
export const signInWithApple = async (
  identityToken: string,
  nonce?: string
): Promise<FirebaseUser> => {
  try {
    const provider = new OAuthProvider('apple.com');
    const credential = provider.credential({
      idToken: identityToken,
      rawNonce: nonce,
    });
    const userCredential = await signInWithCredential(auth, credential);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in with Apple:', error);
    throw error;
  }
};

/**
 * Sign out current user
 */
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};

// ============================================================================
// FIRESTORE SERVICES
// ============================================================================

/**
 * Get user document from Firestore
 */
export const getUserDoc = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error getting user document:', error);
    throw error;
  }
};

/**
 * Create or update user document in Firestore
 */
export const setUserDoc = async (userId: string, data: any) => {
  try {
    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error('Error setting user document:', error);
    throw error;
  }
};

/**
 * Get all documents from a collection
 */
export const getAllDocs = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error getting ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Get documents by query
 */
export const getDocsByQuery = async (
  collectionName: string,
  field: string,
  operator: any,
  value: any
) => {
  try {
    const q = query(collection(db, collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error querying ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Create or update document
 */
export const setDocument = async (
  collectionName: string,
  documentId: string,
  data: any
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, { ...data, updatedAt: Timestamp.now() }, { merge: true });
  } catch (error) {
    console.error(`Error setting document in ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Delete document
 */
export const deleteDocument = async (
  collectionName: string,
  documentId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

// ============================================================================
// STORAGE SERVICES
// ============================================================================

/**
 * Upload file to Firebase Storage
 */
export const uploadFile = async (
  path: string,
  file: Blob | Uint8Array | ArrayBuffer
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Upload video to Firebase Storage
 */
export const uploadVideo = async (
  userId: string,
  workoutId: string,
  videoBlob: Blob
): Promise<string> => {
  const path = `videos/${userId}/${workoutId}/${Date.now()}.mp4`;
  return await uploadFile(path, videoBlob);
};

/**
 * Delete file from Firebase Storage
 */
export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * Get download URL for a file
 */
export const getFileURL = async (filePath: string): Promise<string> => {
  try {
    const fileRef = ref(storage, filePath);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
};

// ============================================================================
// EMAIL INVITATION SERVICE (Cloud Function)
// ============================================================================

/**
 * Send invitation email to new client
 * Note: This requires a Firebase Cloud Function to be deployed
 *
 * Example Cloud Function:
 *
 * exports.sendInvitationEmail = functions.https.onCall(async (data, context) => {
 *   const { email, clientName, trainerName, invitationCode } = data;
 *   // Send email using SendGrid, Mailgun, or similar
 *   // Include deep link: pfa://invite?code={invitationCode}
 * });
 */
export const sendInvitationEmail = async (data: {
  email: string;
  clientName: string;
  trainerName: string;
  invitationCode: string;
}): Promise<void> => {
  try {
    // TODO: Call Firebase Cloud Function when deployed
    // const functions = getFunctions(app);
    // const sendInvitation = httpsCallable(functions, 'sendInvitationEmail');
    // await sendInvitation(data);

    console.log('Invitation email would be sent to:', data.email);
    console.log('Invitation code:', data.invitationCode);

    // For development: Log invitation details
    // In production: This should call your Cloud Function
  } catch (error) {
    console.error('Error sending invitation email:', error);
    throw error;
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert Firebase Timestamp to ISO string
 */
export const timestampToString = (timestamp: any): string => {
  if (!timestamp) return new Date().toISOString();
  if (timestamp.toDate) return timestamp.toDate().toISOString();
  return timestamp;
};

/**
 * Convert ISO string to Firebase Timestamp
 */
export const stringToTimestamp = (dateString: string): Timestamp => {
  return Timestamp.fromDate(new Date(dateString));
};
