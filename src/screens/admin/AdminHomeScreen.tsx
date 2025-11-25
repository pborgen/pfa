// PFA - Premier Fitness Alliance Training App
// Admin Dashboard Screen

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';
import { commonStyles, textStyles } from '../../theme';
import { getClients, getWorkouts, getSessions } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';

const AdminHomeScreen = ({ navigation }: any) => {
  const { signOut, user } = useAuth();
  const [totalAthletes, setTotalAthletes] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [workoutsThisWeek, setWorkoutsThisWeek] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadStats = async () => {
        try {
          const clients = await getClients();
          const workouts = await getWorkouts();
          const sessions = await getSessions();

          setTotalAthletes(clients.length);
          setTotalWorkouts(workouts.length);

          // Calculate workouts completed this week
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          const recentSessions = sessions.filter(
            (s) => new Date(s.startedAt) >= oneWeekAgo && s.status === 'completed'
          );
          setWorkoutsThisWeek(recentSessions.length);
        } catch (error) {
          console.error('Error loading stats:', error);
        }
      };
      loadStats();
    }, [])
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={textStyles.h1}>Dashboard</Text>

        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Total Athletes</Text>
          <Text style={styles.statValue}>{totalAthletes}</Text>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Active Workouts</Text>
          <Text style={styles.statValue}>{totalWorkouts}</Text>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Workouts This Week</Text>
          <Text style={styles.statValue}>{workoutsThisWeek}</Text>
        </Card>

        <View style={styles.actionSection}>
          <Text style={textStyles.h2}>Quick Actions</Text>

          <Button
            title="Add New Athlete"
            onPress={() => navigation.navigate('AddClient')}
            variant="primary"
            fullWidth
            icon="account-plus"
          />

          <Button
            title="Create Workout"
            onPress={() => navigation.navigate('WorkoutBuilder')}
            variant="secondary"
            fullWidth
            icon="dumbbell"
          />

          <View style={styles.logoutSection}>
            <Text style={textStyles.caption}>
              Logged in as {user?.displayName || 'Admin'}
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
              fullWidth
            />
          </View>
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
  logoutSection: {
    marginTop: SPACING.xxl,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    alignItems: 'center',
  },
});

export default AdminHomeScreen;
