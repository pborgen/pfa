// PFA - Premier Fitness Alliance Training App
// Workout List Screen

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Card from '../../components/common/Card';
import { COLORS, SPACING } from '../../constants';
import { commonStyles, textStyles, categoryColors } from '../../theme';
import { getWorkouts } from '../../services/storage';
import { Workout } from '../../types';

const WorkoutListScreen = ({ navigation }: any) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadWorkouts = async () => {
        setLoading(true);
        try {
          const storedWorkouts = await getWorkouts();
          setWorkouts(storedWorkouts);
        } catch (error) {
          console.error('Error loading workouts:', error);
        } finally {
          setLoading(false);
        }
      };
      loadWorkouts();
    }, [])
  );

  const renderWorkout = ({ item }: any) => (
    <Card onPress={() => console.log('View workout:', item.id)}>
      <View style={styles.workoutHeader}>
        <Text style={textStyles.h3}>{item.name}</Text>
        <Chip
          style={[
            styles.categoryChip,
            { backgroundColor: categoryColors[item.category] || COLORS.mediumGray },
          ]}
          textStyle={styles.chipText}
        >
          {item.category}
        </Chip>
      </View>
      {item.description && (
        <Text style={textStyles.bodySecondary} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      <View style={styles.workoutFooter}>
        <Text style={textStyles.caption}>
          {item.exercises?.length || 0} exercises
        </Text>
        <TouchableOpacity
          style={styles.assignButton}
          onPress={() => navigation.navigate('AssignWorkout', { workoutId: item.id })}
        >
          <Ionicons name="person-add-outline" size={16} color={COLORS.athleticBlue} />
          <Text style={styles.assignButtonText}>Assign</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.container}>
        {workouts.length === 0 ? (
          <View style={commonStyles.centeredContainer}>
            <Text style={textStyles.bodySecondary}>No workouts yet</Text>
            <Text style={textStyles.caption}>Tap + to create your first workout</Text>
          </View>
        ) : (
          <FlatList
            data={workouts}
            renderItem={renderWorkout}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}

        <FAB
          icon="plus"
          style={styles.fab}
          color={COLORS.textLight}
          onPress={() => navigation.navigate('WorkoutBuilder')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.md,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  categoryChip: {
    height: 28,
  },
  chipText: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 14,
  },
  workoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  assignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 4,
    backgroundColor: COLORS.lightGray,
  },
  assignButtonText: {
    fontSize: 14,
    color: COLORS.athleticBlue,
    marginLeft: 4,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.md,
    backgroundColor: COLORS.athleticBlue,
  },
});

export default WorkoutListScreen;
