// PFA - Premier Fitness Alliance Training App
// Workout Builder Screen

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Crypto from 'expo-crypto';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { saveWorkout, getWorkoutById } from '../../services/storage';
import { Workout, WorkoutCategory } from '../../types';
import { SPACING, WORKOUT_CATEGORIES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../constants';
import { commonStyles, textStyles } from '../../theme';

const WorkoutBuilderScreen = ({ navigation, route }: any) => {
  const workoutId = route.params?.workoutId;
  const isEditing = !!workoutId;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<WorkoutCategory>('strength');
  const [existingWorkout, setExistingWorkout] = useState<Workout | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (workoutId) {
      loadWorkout();
    }
  }, [workoutId]);

  const loadWorkout = async () => {
    try {
      const workout = await getWorkoutById(workoutId);
      if (workout) {
        setExistingWorkout(workout);
        setName(workout.name);
        setDescription(workout.description || '');
        setCategory(workout.category);
      }
    } catch (error) {
      console.error('Error loading workout:', error);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (name.length < 2) {
      newErrors.name = 'Workout name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const workoutData: Workout = isEditing && existingWorkout
        ? {
            ...existingWorkout,
            name,
            description: description || undefined,
            category,
            updatedAt: new Date().toISOString(),
          }
        : {
            id: Crypto.randomUUID(),
            name,
            description: description || undefined,
            category,
            exercises: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

      await saveWorkout(workoutData);

      Alert.alert(
        'Success',
        isEditing ? SUCCESS_MESSAGES.workout.updated : SUCCESS_MESSAGES.workout.created,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error saving workout:', error);
      Alert.alert('Error', isEditing ? ERROR_MESSAGES.workout.updateFailed : ERROR_MESSAGES.workout.createFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={textStyles.h2}>{isEditing ? 'Edit Workout' : 'Create Workout'}</Text>
        <Text style={textStyles.bodySecondary}>
          {isEditing ? 'Update this workout' : 'Build a customized workout for your athletes'}
        </Text>

        <View style={styles.form}>
          <Input
            label="Workout Name *"
            value={name}
            onChangeText={setName}
            placeholder="Speed & Agility Circuit"
            error={errors.name}
            leftIcon="dumbbell"
          />

          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Focus on explosive movements and quick direction changes"
            multiline
            numberOfLines={3}
            leftIcon="text"
          />

          {/* TODO: Add category picker */}
          <Text style={textStyles.caption}>
            Category: {WORKOUT_CATEGORIES.find((c) => c.value === category)?.label}
          </Text>

          {/* TODO: Add exercise builder */}
          <View style={styles.exercisesPlaceholder}>
            <Text style={textStyles.bodySecondary}>
              Exercise builder coming soon...
            </Text>
          </View>

          <Button
            title={isEditing ? 'Update Workout' : 'Save Workout'}
            onPress={handleSave}
            variant="primary"
            fullWidth
            loading={loading}
          />

          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="outlined"
            fullWidth
            disabled={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.md,
  },
  form: {
    marginTop: SPACING.lg,
  },
  exercisesPlaceholder: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginVertical: SPACING.md,
  },
});

export default WorkoutBuilderScreen;
