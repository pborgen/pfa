// PFA - Premier Fitness Alliance Training App
// Client Home Screen - Athlete's Workout List

import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip } from 'react-native-paper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { COLORS, SPACING } from '../../constants';
import { commonStyles, textStyles, categoryColors } from '../../theme';
import { useAuth } from '../../context/AuthContext';

const ClientHomeScreen = ({ navigation }: any) => {
  const { signOut, user } = useAuth();
  // TODO: Load assigned workouts from storage
  const assignments: any[] = [];

  const renderWorkout = ({ item }: any) => (
    <Card onPress={() => navigation.navigate('WorkoutLog', { workoutId: item.workoutId })}>
      <View style={styles.workoutHeader}>
        <Text style={textStyles.h3}>{item.workoutName}</Text>
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
        {item.lastCompleted && (
          <Text style={textStyles.caption}>
            Last: {new Date(item.lastCompleted).toLocaleDateString()}
          </Text>
        )}
      </View>
      <Button
        title="Start Workout"
        onPress={() => navigation.navigate('WorkoutLog', { workoutId: item.workoutId })}
        variant="primary"
        fullWidth
      />
    </Card>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.container}>
        {assignments.length === 0 ? (
          <View style={commonStyles.centeredContainer}>
            <Text style={textStyles.bodySecondary}>No workouts assigned yet</Text>
            <Text style={textStyles.caption}>
              Your coach will assign workouts for you to complete
            </Text>
            <View style={styles.logoutSection}>
              <Text style={textStyles.caption}>
                Logged in as {user?.displayName || 'Client'}
              </Text>
              <Button
                title="Log Out"
                onPress={() => {
                  Alert.alert(
                    'Log Out',
                    'Are you sure you want to log out?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Log Out', style: 'destructive', onPress: signOut }
                    ]
                  );
                }}
                variant="text"
              />
            </View>
          </View>
        ) : (
          <FlatList
            data={assignments}
            renderItem={renderWorkout}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
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
  workoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  categoryChip: {
    height: 24,
  },
  chipText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  logoutSection: {
    marginTop: SPACING.xxl,
    alignItems: 'center',
  },
});

export default ClientHomeScreen;
