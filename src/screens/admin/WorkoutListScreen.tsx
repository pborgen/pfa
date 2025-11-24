// PFA - Premier Fitness Alliance Training App
// Workout List Screen

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, Chip } from 'react-native-paper';
import Card from '../../components/common/Card';
import { COLORS, SPACING } from '../../constants';
import { commonStyles, textStyles, categoryColors } from '../../theme';

const WorkoutListScreen = ({ navigation }: any) => {
  // TODO: Load workouts from storage
  const workouts: any[] = [];

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
      <Text style={textStyles.caption}>
        {item.exercises?.length || 0} exercises
      </Text>
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
    height: 24,
  },
  chipText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  fab: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.md,
    backgroundColor: COLORS.athleticBlue,
  },
});

export default WorkoutListScreen;
