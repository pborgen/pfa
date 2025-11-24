// PFA - Premier Fitness Alliance Training App
// Local Storage Service using AsyncStorage

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User,
  Client,
  Exercise,
  Workout,
  WorkoutAssignment,
  WorkoutSession,
  ExerciseLog,
} from '../types';
import { STORAGE_KEYS } from '../constants';

// ============================================================================
// GENERIC STORAGE METHODS
// ============================================================================

export const saveData = async <T>(key: string, data: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error);
    throw new Error(`Failed to save data`);
  }
};

export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error getting data for key ${key}:`, error);
    return null;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data for key ${key}:`, error);
    throw new Error(`Failed to remove data`);
  }
};

export const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw new Error('Failed to clear storage');
  }
};

// ============================================================================
// USER & AUTH
// ============================================================================

export const saveUser = async (user: User): Promise<void> => {
  await saveData(STORAGE_KEYS.user, user);
};

export const getUser = async (): Promise<User | null> => {
  return await getData<User>(STORAGE_KEYS.user);
};

export const removeUser = async (): Promise<void> => {
  await removeData(STORAGE_KEYS.user);
};

export const saveAuthToken = async (token: string): Promise<void> => {
  await saveData(STORAGE_KEYS.authToken, token);
};

export const getAuthToken = async (): Promise<string | null> => {
  return await getData<string>(STORAGE_KEYS.authToken);
};

export const removeAuthToken = async (): Promise<void> => {
  await removeData(STORAGE_KEYS.authToken);
};

// ============================================================================
// CLIENTS (ATHLETES)
// ============================================================================

export const saveClients = async (clients: Client[]): Promise<void> => {
  await saveData(STORAGE_KEYS.clients, clients);
};

export const getClients = async (): Promise<Client[]> => {
  const clients = await getData<Client[]>(STORAGE_KEYS.clients);
  return clients || [];
};

export const saveClient = async (client: Client): Promise<void> => {
  const clients = await getClients();
  const existingIndex = clients.findIndex((c) => c.id === client.id);

  if (existingIndex >= 0) {
    clients[existingIndex] = client;
  } else {
    clients.push(client);
  }

  await saveClients(clients);
};

export const deleteClient = async (clientId: string): Promise<void> => {
  const clients = await getClients();
  const filtered = clients.filter((c) => c.id !== clientId);
  await saveClients(filtered);
};

export const getClientById = async (clientId: string): Promise<Client | null> => {
  const clients = await getClients();
  return clients.find((c) => c.id === clientId) || null;
};

// ============================================================================
// EXERCISES
// ============================================================================

export const saveExercises = async (exercises: Exercise[]): Promise<void> => {
  await saveData(STORAGE_KEYS.exercises, exercises);
};

export const getExercises = async (): Promise<Exercise[]> => {
  const exercises = await getData<Exercise[]>(STORAGE_KEYS.exercises);
  return exercises || [];
};

export const saveExercise = async (exercise: Exercise): Promise<void> => {
  const exercises = await getExercises();
  const existingIndex = exercises.findIndex((e) => e.id === exercise.id);

  if (existingIndex >= 0) {
    exercises[existingIndex] = exercise;
  } else {
    exercises.push(exercise);
  }

  await saveExercises(exercises);
};

export const deleteExercise = async (exerciseId: string): Promise<void> => {
  const exercises = await getExercises();
  const filtered = exercises.filter((e) => e.id !== exerciseId);
  await saveExercises(filtered);
};

export const getExerciseById = async (exerciseId: string): Promise<Exercise | null> => {
  const exercises = await getExercises();
  return exercises.find((e) => e.id === exerciseId) || null;
};

// ============================================================================
// WORKOUTS
// ============================================================================

export const saveWorkouts = async (workouts: Workout[]): Promise<void> => {
  await saveData(STORAGE_KEYS.workouts, workouts);
};

export const getWorkouts = async (): Promise<Workout[]> => {
  const workouts = await getData<Workout[]>(STORAGE_KEYS.workouts);
  return workouts || [];
};

export const saveWorkout = async (workout: Workout): Promise<void> => {
  const workouts = await getWorkouts();
  const existingIndex = workouts.findIndex((w) => w.id === workout.id);

  if (existingIndex >= 0) {
    workouts[existingIndex] = workout;
  } else {
    workouts.push(workout);
  }

  await saveWorkouts(workouts);
};

export const deleteWorkout = async (workoutId: string): Promise<void> => {
  const workouts = await getWorkouts();
  const filtered = workouts.filter((w) => w.id !== workoutId);
  await saveWorkouts(filtered);
};

export const getWorkoutById = async (workoutId: string): Promise<Workout | null> => {
  const workouts = await getWorkouts();
  return workouts.find((w) => w.id === workoutId) || null;
};

// ============================================================================
// WORKOUT ASSIGNMENTS
// ============================================================================

export const saveAssignments = async (assignments: WorkoutAssignment[]): Promise<void> => {
  await saveData(STORAGE_KEYS.assignments, assignments);
};

export const getAssignments = async (): Promise<WorkoutAssignment[]> => {
  const assignments = await getData<WorkoutAssignment[]>(STORAGE_KEYS.assignments);
  return assignments || [];
};

export const saveAssignment = async (assignment: WorkoutAssignment): Promise<void> => {
  const assignments = await getAssignments();
  const existingIndex = assignments.findIndex((a) => a.id === assignment.id);

  if (existingIndex >= 0) {
    assignments[existingIndex] = assignment;
  } else {
    assignments.push(assignment);
  }

  await saveAssignments(assignments);
};

export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  const assignments = await getAssignments();
  const filtered = assignments.filter((a) => a.id !== assignmentId);
  await saveAssignments(filtered);
};

export const getAssignmentsByClient = async (clientId: string): Promise<WorkoutAssignment[]> => {
  const assignments = await getAssignments();
  return assignments.filter((a) => a.clientId === clientId);
};

export const getAssignmentsByWorkout = async (workoutId: string): Promise<WorkoutAssignment[]> => {
  const assignments = await getAssignments();
  return assignments.filter((a) => a.workoutId === workoutId);
};

// ============================================================================
// WORKOUT SESSIONS (CLIENT LOGGING)
// ============================================================================

export const saveSessions = async (sessions: WorkoutSession[]): Promise<void> => {
  await saveData(STORAGE_KEYS.sessions, sessions);
};

export const getSessions = async (): Promise<WorkoutSession[]> => {
  const sessions = await getData<WorkoutSession[]>(STORAGE_KEYS.sessions);
  return sessions || [];
};

export const saveSession = async (session: WorkoutSession): Promise<void> => {
  const sessions = await getSessions();
  const existingIndex = sessions.findIndex((s) => s.id === session.id);

  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.push(session);
  }

  await saveSessions(sessions);
};

export const deleteSession = async (sessionId: string): Promise<void> => {
  const sessions = await getSessions();
  const filtered = sessions.filter((s) => s.id !== sessionId);
  await saveSessions(filtered);
};

export const getSessionById = async (sessionId: string): Promise<WorkoutSession | null> => {
  const sessions = await getSessions();
  return sessions.find((s) => s.id === sessionId) || null;
};

export const getSessionsByClient = async (clientId: string): Promise<WorkoutSession[]> => {
  const sessions = await getSessions();
  return sessions.filter((s) => s.clientId === clientId);
};

export const getInProgressSession = async (clientId: string): Promise<WorkoutSession | null> => {
  const sessions = await getSessions();
  return sessions.find((s) => s.clientId === clientId && s.status === 'in-progress') || null;
};

// ============================================================================
// EXERCISE LOGS
// ============================================================================

export const saveExerciseLogs = async (logs: ExerciseLog[]): Promise<void> => {
  await saveData(STORAGE_KEYS.exerciseLogs, logs);
};

export const getExerciseLogs = async (): Promise<ExerciseLog[]> => {
  const logs = await getData<ExerciseLog[]>(STORAGE_KEYS.exerciseLogs);
  return logs || [];
};

export const saveExerciseLog = async (log: ExerciseLog): Promise<void> => {
  const logs = await getExerciseLogs();
  const existingIndex = logs.findIndex((l) => l.id === log.id);

  if (existingIndex >= 0) {
    logs[existingIndex] = log;
  } else {
    logs.push(log);
  }

  await saveExerciseLogs(logs);
};

export const getExerciseLogsBySession = async (sessionId: string): Promise<ExerciseLog[]> => {
  const logs = await getExerciseLogs();
  return logs.filter((l) => l.workoutSessionId === sessionId);
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const initializeStorage = async (): Promise<void> => {
  // Check if data exists, if not initialize with empty arrays
  const clients = await getClients();
  const exercises = await getExercises();
  const workouts = await getWorkouts();
  const assignments = await getAssignments();
  const sessions = await getSessions();
  const logs = await getExerciseLogs();

  // Log initialization status
  console.log('Storage initialized:', {
    clients: clients.length,
    exercises: exercises.length,
    workouts: workouts.length,
    assignments: assignments.length,
    sessions: sessions.length,
    logs: logs.length,
  });
};

export const exportAllData = async (): Promise<string> => {
  const data = {
    user: await getUser(),
    clients: await getClients(),
    exercises: await getExercises(),
    workouts: await getWorkouts(),
    assignments: await getAssignments(),
    sessions: await getSessions(),
    exerciseLogs: await getExerciseLogs(),
  };
  return JSON.stringify(data, null, 2);
};

export const importAllData = async (jsonString: string): Promise<void> => {
  try {
    const data = JSON.parse(jsonString);

    if (data.user) await saveUser(data.user);
    if (data.clients) await saveClients(data.clients);
    if (data.exercises) await saveExercises(data.exercises);
    if (data.workouts) await saveWorkouts(data.workouts);
    if (data.assignments) await saveAssignments(data.assignments);
    if (data.sessions) await saveSessions(data.sessions);
    if (data.exerciseLogs) await saveExerciseLogs(data.exerciseLogs);

    console.log('Data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
    throw new Error('Failed to import data');
  }
};
