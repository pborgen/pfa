// PFA - Premier Fitness Alliance Training App
// Assign Workout Screen

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'react-native-paper';
import * as Crypto from 'expo-crypto';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { COLORS, SPACING, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../constants';
import { commonStyles, textStyles } from '../../theme';
import { getClients, getWorkoutById, saveAssignment } from '../../services/storage';
import { Client, WorkoutAssignment } from '../../types';
import { useAuth } from '../../context/AuthContext';

const AssignWorkoutScreen = ({ route, navigation }: any) => {
  const { workoutId } = route.params;
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const [workoutName, setWorkoutName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [storedClients, workout] = await Promise.all([
          getClients(),
          getWorkoutById(workoutId),
        ]);
        setClients(storedClients);
        if (workout) {
          setWorkoutName(workout.name);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, [workoutId]);

  const toggleClient = (clientId: string) => {
    setSelectedClients((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(clientId)) {
        newSet.delete(clientId);
      } else {
        newSet.add(clientId);
      }
      return newSet;
    });
  };

  const handleAssign = async () => {
    if (selectedClients.size === 0) {
      Alert.alert('No Athletes Selected', 'Please select at least one athlete to assign this workout to.');
      return;
    }

    setLoading(true);
    try {
      const assignmentPromises = Array.from(selectedClients).map(async (clientId) => {
        const assignment: WorkoutAssignment = {
          id: Crypto.randomUUID(),
          clientId,
          workoutId,
          assignedDate: new Date().toISOString(),
          status: 'assigned',
          assignedBy: user?.id || 'admin',
        };
        await saveAssignment(assignment);
      });

      await Promise.all(assignmentPromises);

      const message = SUCCESS_MESSAGES.workout.assigned.replace(
        '{count}',
        selectedClients.size.toString()
      );

      Alert.alert('Success', message, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Error assigning workout:', error);
      Alert.alert('Error', 'Failed to assign workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderClient = ({ item }: { item: Client }) => {
    const isSelected = selectedClients.has(item.id);

    return (
      <Card
        onPress={() => toggleClient(item.id)}
        style={[styles.clientCard, isSelected && styles.selectedCard]}
      >
        <View style={styles.clientRow}>
          <View style={styles.clientInfo}>
            <Text style={textStyles.h3}>{item.name}</Text>
            <Text style={textStyles.bodySecondary}>{item.email}</Text>
          </View>
          <Checkbox
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={() => toggleClient(item.id)}
            color={COLORS.athleticBlue}
          />
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['bottom']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={textStyles.h2}>Assign Workout</Text>
          <Text style={textStyles.bodySecondary}>
            Select athletes to assign "{workoutName}"
          </Text>
        </View>

        {clients.length === 0 ? (
          <View style={commonStyles.centeredContainer}>
            <Text style={textStyles.bodySecondary}>No athletes yet</Text>
            <Text style={textStyles.caption}>Add athletes first before assigning workouts</Text>
            <Button
              title="Add Athlete"
              onPress={() => navigation.navigate('AddClient')}
              variant="primary"
              style={styles.addButton}
            />
          </View>
        ) : (
          <>
            <FlatList
              data={clients}
              renderItem={renderClient}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
            />

            <View style={styles.footer}>
              <Text style={textStyles.caption}>
                {selectedClients.size} athlete{selectedClients.size !== 1 ? 's' : ''} selected
              </Text>
              <Button
                title="Assign Workout"
                onPress={handleAssign}
                variant="primary"
                fullWidth
                loading={loading}
                disabled={selectedClients.size === 0}
              />
              <Button
                title="Cancel"
                onPress={() => navigation.goBack()}
                variant="outlined"
                fullWidth
                disabled={loading}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  listContent: {
    padding: SPACING.md,
  },
  clientCard: {
    marginBottom: SPACING.sm,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: COLORS.athleticBlue,
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clientInfo: {
    flex: 1,
  },
  footer: {
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: COLORS.background,
  },
  addButton: {
    marginTop: SPACING.md,
  },
});

export default AssignWorkoutScreen;
