// PFA - Premier Fitness Alliance Training App
// Admin Dashboard Screen

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';
import { commonStyles, textStyles } from '../../theme';

const AdminHomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={textStyles.h1}>Dashboard</Text>

        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Total Athletes</Text>
          <Text style={styles.statValue}>0</Text>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Active Workouts</Text>
          <Text style={styles.statValue}>0</Text>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Workouts This Week</Text>
          <Text style={styles.statValue}>0</Text>
        </Card>

        <View style={styles.actionSection}>
          <Text style={textStyles.h2}>Quick Actions</Text>

          <Button
            title="Add New Athlete"
            onPress={() => navigation.navigate('AddClient')}
            variant="primary"
            fullWidth
            icon="person-add"
          />

          <Button
            title="Create Workout"
            onPress={() => navigation.navigate('WorkoutBuilder')}
            variant="secondary"
            fullWidth
            icon="fitness"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
  },
  statCard: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  statLabel: {
    fontSize: FONT_SIZES.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.athleticBlue,
  },
  actionSection: {
    marginTop: SPACING.xl,
  },
});

export default AdminHomeScreen;
