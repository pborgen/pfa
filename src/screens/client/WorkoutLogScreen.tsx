// PFA - Premier Fitness Alliance Training App
// Workout Log Screen - Track Actual vs Planned Performance

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { saveSession } from '../../services/storage';
import { WorkoutSession, SetLog } from '../../types';
import { COLORS, SPACING, SUCCESS_MESSAGES } from '../../constants';
import { commonStyles, textStyles, performanceStyles } from '../../theme';

const WorkoutLogScreen = ({ route, navigation }: any) => {
  const { workoutId } = route.params;

  // TODO: Load workout details from storage
  const workout = {
    id: workoutId,
    name: 'Sample Workout',
    exercises: [
      {
        exerciseId: '1',
        exerciseName: 'Back Squat',
        order: 1,
        targetSets: 3,
        targetReps: 10,
        targetWeight: 135,
      },
    ],
  };

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [setLogs, setSetLogs] = useState<Record<string, SetLog[]>>({});
  const [loading, setLoading] = useState(false);

  const currentExercise = workout.exercises[currentExerciseIndex];

  const addSetLog = (exerciseId: string) => {
    const existingLogs = setLogs[exerciseId] || [];
    const newLog: SetLog = {
      setNumber: existingLogs.length + 1,
      repsCompleted: currentExercise.targetReps || 0,
      weightUsed: currentExercise.targetWeight,
      completed: true,
    };

    setSetLogs({
      ...setLogs,
      [exerciseId]: [...existingLogs, newLog],
    });
  };

  const getPerformanceColor = (actual: number, target: number): string => {
    const ratio = actual / target;
    if (ratio >= 1.0) return performanceStyles.exceeded.backgroundColor;
    if (ratio >= 0.8) return performanceStyles.close.backgroundColor;
    return performanceStyles.under.backgroundColor;
  };

  const handleCompleteWorkout = async () => {
    setLoading(true);
    try {
      const session: WorkoutSession = {
        id: uuidv4(),
        clientId: 'current-user-id', // TODO: Get from auth context
        workoutId: workout.id,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        status: 'completed',
        exerciseLogs: Object.entries(setLogs).map(([exerciseId, logs]) => ({
          id: uuidv4(),
          workoutSessionId: '',
          exerciseId,
          sets: logs,
          createdAt: new Date().toISOString(),
        })),
      };

      await saveSession(session);

      Alert.alert(
        'Success',
        SUCCESS_MESSAGES.session.completed,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error saving session:', error);
      Alert.alert('Error', 'Failed to save workout session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={textStyles.h2}>{workout.name}</Text>

        <Card>
          <Text style={textStyles.h3}>
            Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
          </Text>
          <Text style={textStyles.h2}>{currentExercise.exerciseName}</Text>

          {/* Target Information */}
          <View style={styles.targetSection}>
            <Text style={textStyles.label}>Target:</Text>
            <Text style={textStyles.body}>
              {currentExercise.targetSets} sets × {currentExercise.targetReps} reps
              {currentExercise.targetWeight && ` @ ${currentExercise.targetWeight} lbs`}
            </Text>
          </View>

          {/* Set Logging */}
          <View style={styles.setsSection}>
            <Text style={textStyles.label}>Sets Completed:</Text>
            {(setLogs[currentExercise.exerciseId] || []).map((log, index) => (
              <View key={index} style={styles.setRow}>
                <View
                  style={[
                    styles.setIndicator,
                    {
                      backgroundColor: getPerformanceColor(
                        log.repsCompleted,
                        currentExercise.targetReps || 0
                      ),
                    },
                  ]}
                />
                <Text style={textStyles.body}>
                  Set {log.setNumber}: {log.repsCompleted} reps
                  {log.weightUsed && ` @ ${log.weightUsed} lbs`}
                </Text>
              </View>
            ))}

            {(setLogs[currentExercise.exerciseId]?.length || 0) <
              currentExercise.targetSets && (
              <Button
                title={`Log Set ${
                  (setLogs[currentExercise.exerciseId]?.length || 0) + 1
                }`}
                onPress={() => addSetLog(currentExercise.exerciseId)}
                variant="secondary"
                fullWidth
              />
            )}
          </View>
        </Card>

        {/* Navigation */}
        <View style={styles.navigationButtons}>
          {currentExerciseIndex > 0 && (
            <Button
              title="Previous Exercise"
              onPress={() => setCurrentExerciseIndex(currentExerciseIndex - 1)}
              variant="outlined"
              style={styles.navButton}
            />
          )}

          {currentExerciseIndex < workout.exercises.length - 1 ? (
            <Button
              title="Next Exercise"
              onPress={() => setCurrentExerciseIndex(currentExerciseIndex + 1)}
              variant="primary"
              style={styles.navButton}
            />
          ) : (
            <Button
              title="Complete Workout"
              onPress={handleCompleteWorkout}
              variant="primary"
              loading={loading}
              fullWidth
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.md,
  },
  targetSection: {
    marginVertical: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
  },
  setsSection: {
    marginTop: SPACING.md,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  setIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  navigationButtons: {
    marginTop: SPACING.xl,
    gap: SPACING.sm,
  },
  navButton: {
    flex: 1,
  },
});

export default WorkoutLogScreen;
