// PFA - Premier Fitness Alliance Training App
// Athlete Detail Screen

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Alert, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import * as ImagePicker from 'expo-image-picker';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';
import { commonStyles, textStyles, categoryColors } from '../../theme';
import {
  getClientById,
  getWorkouts,
  getAssignments,
  saveAssignment,
  deleteAssignment,
  deleteClient,
  saveClient,
} from '../../services/storage';
import { Client, Workout, WorkoutAssignment } from '../../types';
import { useAuth } from '../../context/AuthContext';

const AthleteDetailScreen = ({ route, navigation }: any) => {
  const { clientId } = route.params;
  const { user } = useAuth();
  const [client, setClient] = useState<Client | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [assignments, setAssignments] = useState<WorkoutAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setLoading(true);
        try {
          const [clientData, allWorkouts, allAssignments] = await Promise.all([
            getClientById(clientId),
            getWorkouts(),
            getAssignments(),
          ]);
          setClient(clientData);
          setWorkouts(allWorkouts);
          setAssignments(allAssignments.filter((a) => a.clientId === clientId));
        } catch (error) {
          console.error('Error loading athlete data:', error);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }, [clientId])
  );

  const getWorkoutById = (workoutId: string) => {
    return workouts.find((w) => w.id === workoutId);
  };

  const getUnassignedWorkouts = () => {
    const assignedWorkoutIds = assignments.map((a) => a.workoutId);
    return workouts.filter((w) => !assignedWorkoutIds.includes(w.id));
  };

  const handleAssignWorkout = async (workoutId: string) => {
    try {
      const workout = getWorkoutById(workoutId);
      const assignment: WorkoutAssignment = {
        id: Crypto.randomUUID(),
        clientId,
        workoutId,
        assignedDate: new Date().toISOString(),
        status: 'assigned',
        assignedBy: user?.id || 'admin',
      };
      await saveAssignment(assignment);
      setAssignments([...assignments, assignment]);
      Alert.alert('Success', `"${workout?.name}" assigned to ${client?.name}`);
    } catch (error) {
      console.error('Error assigning workout:', error);
      Alert.alert('Error', 'Failed to assign workout');
    }
  };

  const handleUnassignWorkout = (assignment: WorkoutAssignment) => {
    const workout = getWorkoutById(assignment.workoutId);
    Alert.alert(
      'Unassign Workout',
      `Remove "${workout?.name}" from ${client?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unassign',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAssignment(assignment.id);
              setAssignments(assignments.filter((a) => a.id !== assignment.id));
            } catch (error) {
              console.error('Error unassigning workout:', error);
              Alert.alert('Error', 'Failed to unassign workout');
            }
          },
        },
      ]
    );
  };

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Please allow access to your photo library to add a photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0] && client) {
      const updatedClient = {
        ...client,
        photoUri: result.assets[0].uri,
        updatedAt: new Date().toISOString(),
      };
      try {
        await saveClient(updatedClient);
        setClient(updatedClient);
      } catch (error) {
        console.error('Error saving photo:', error);
        Alert.alert('Error', 'Failed to save photo');
      }
    }
  };

  const handleDeleteAthlete = () => {
    Alert.alert(
      'Delete Athlete',
      `Are you sure you want to delete ${client?.name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteClient(clientId);
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting athlete:', error);
              Alert.alert('Error', 'Failed to delete athlete');
            }
          },
        },
      ]
    );
  };

  const renderAssignedWorkout = ({ item }: { item: WorkoutAssignment }) => {
    const workout = getWorkoutById(item.workoutId);
    if (!workout) return null;

    return (
      <Card style={styles.workoutCard}>
        <View style={styles.workoutHeader}>
          <Text style={styles.workoutName}>{workout.name}</Text>
          <Chip
            style={[
              styles.statusChip,
              {
                backgroundColor:
                  item.status === 'completed'
                    ? COLORS.success
                    : item.status === 'in-progress'
                    ? COLORS.warning
                    : COLORS.athleticBlue,
              },
            ]}
            textStyle={styles.chipText}
            onPress={() => handleUnassignWorkout(item)}
          >
            {item.status}
          </Chip>
        </View>
        <Text style={textStyles.caption}>
          Assigned: {new Date(item.assignedDate).toLocaleDateString()}
        </Text>
      </Card>
    );
  };

  const renderUnassignedWorkout = ({ item }: { item: Workout }) => (
    <Card style={styles.workoutCard}>
      <View style={styles.workoutHeader}>
        <TouchableOpacity
          style={styles.workoutInfo}
          onPress={() => navigation.navigate('WorkoutBuilder', { workoutId: item.id })}
        >
          <Text style={styles.workoutName}>{item.name}</Text>
          <Chip
            style={[
              styles.categoryChip,
              { backgroundColor: categoryColors[item.category] || COLORS.mediumGray },
            ]}
            textStyle={styles.chipText}
          >
            {item.category}
          </Chip>
        </TouchableOpacity>
        <Button
          title="Assign"
          onPress={() => handleAssignWorkout(item.id)}
          variant="primary"
          style={styles.assignButton}
        />
      </View>
    </Card>
  );

  if (loading || !client) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.centeredContainer}>
          <Text style={textStyles.bodySecondary}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const unassignedWorkouts = getUnassignedWorkouts();

  return (
    <SafeAreaView style={commonStyles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Athlete Info Card */}
        <Card style={styles.infoCard}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={handlePickImage} style={styles.avatarTouchable}>
              {client.photoUri ? (
                <Image source={{ uri: client.photoUri }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {client.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={16} color={COLORS.textLight} />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={[textStyles.h2, styles.centerText]}>{client.name}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={textStyles.body}>{client.email}</Text>
          </View>

          {client.phone && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={textStyles.body}>{client.phone}</Text>
            </View>
          )}

          {client.notes && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Notes</Text>
              <Text style={textStyles.body}>{client.notes}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Added</Text>
            <Text style={textStyles.body}>
              {new Date(client.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </Card>

        {/* Assigned Workouts Section */}
        <View style={styles.section}>
          <Text style={textStyles.h3}>Assigned Workouts ({assignments.length})</Text>
          {assignments.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={textStyles.bodySecondary}>No workouts assigned yet</Text>
            </Card>
          ) : (
            <FlatList
              data={assignments}
              renderItem={renderAssignedWorkout}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>

        {/* Available Workouts to Assign */}
        <View style={styles.section}>
          <Text style={textStyles.h3}>Assign Workout</Text>
          {unassignedWorkouts.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={textStyles.bodySecondary}>
                {workouts.length === 0
                  ? 'No workouts created yet'
                  : 'All workouts have been assigned'}
              </Text>
              {workouts.length === 0 && (
                <Button
                  title="Create Workout"
                  onPress={() => navigation.navigate('WorkoutBuilder')}
                  variant="primary"
                  style={styles.createButton}
                />
              )}
            </Card>
          ) : (
            <FlatList
              data={unassignedWorkouts}
              renderItem={renderUnassignedWorkout}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>

        {/* Delete Button */}
        <View style={styles.dangerSection}>
          <Button
            title="Delete Athlete"
            onPress={handleDeleteAthlete}
            variant="text"
            fullWidth
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
    paddingBottom: SPACING.xxl,
  },
  infoCard: {
    marginBottom: SPACING.lg,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarTouchable: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.athleticBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.athleticBlue,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  centerText: {
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  infoRow: {
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  infoLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  workoutCard: {
    marginTop: SPACING.sm,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  statusChip: {
    height: 28,
  },
  categoryChip: {
    height: 28,
  },
  chipText: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 14,
  },
  emptyCard: {
    marginTop: SPACING.sm,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  createButton: {
    marginTop: SPACING.md,
  },
  assignButton: {
    marginVertical: 0,
    minWidth: 80,
  },
  dangerSection: {
    marginTop: SPACING.xl,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
});

export default AthleteDetailScreen;
