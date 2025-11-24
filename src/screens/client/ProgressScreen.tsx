// PFA - Premier Fitness Alliance Training App
// Progress Screen - Athlete's Workout History

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/common/Card';
import { COLORS, SPACING } from '../../constants';
import { commonStyles, textStyles } from '../../theme';

const ProgressScreen = () => {
  // TODO: Load workout sessions from storage
  const sessions: any[] = [];

  const renderSession = ({ item }: any) => (
    <Card onPress={() => console.log('View session:', item.id)}>
      <View style={styles.sessionHeader}>
        <Text style={textStyles.h3}>{item.workoutName}</Text>
        <Text style={textStyles.caption}>
          {new Date(item.completedAt).toLocaleDateString()}
        </Text>
      </View>
      <Text style={textStyles.bodySecondary}>
        Duration: {item.duration || 'N/A'}
      </Text>
      <Text style={textStyles.caption}>
        {item.exerciseLogs?.length || 0} exercises completed
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.container}>
        {sessions.length === 0 ? (
          <View style={commonStyles.centeredContainer}>
            <Text style={textStyles.bodySecondary}>No workouts completed yet</Text>
            <Text style={textStyles.caption}>
              Complete your first workout to see your progress
            </Text>
          </View>
        ) : (
          <FlatList
            data={sessions}
            renderItem={renderSession}
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
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
});

export default ProgressScreen;
