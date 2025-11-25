// PFA - Premier Fitness Alliance Training App
// Client List Screen

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Card from '../../components/common/Card';
import { COLORS, SPACING } from '../../constants';
import { commonStyles, textStyles } from '../../theme';
import { getClients } from '../../services/storage';
import { Client } from '../../types';

const ClientListScreen = ({ navigation }: any) => {
  const [clients, setClients] = useState<Client[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadClients = async () => {
        try {
          const storedClients = await getClients();
          setClients(storedClients);
        } catch (error) {
          console.error('Error loading clients:', error);
        }
      };
      loadClients();
    }, [])
  );

  const renderClient = ({ item }: { item: Client }) => (
    <Card onPress={() => navigation.navigate('AthleteDetail', { clientId: item.id })}>
      <Text style={textStyles.h3}>{item.name}</Text>
      <Text style={textStyles.bodySecondary}>{item.email}</Text>
    </Card>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.container}>
        {clients.length === 0 ? (
          <View style={commonStyles.centeredContainer}>
            <Text style={textStyles.bodySecondary}>No athletes yet</Text>
            <Text style={textStyles.caption}>Tap + to add your first athlete</Text>
          </View>
        ) : (
          <FlatList
            data={clients}
            renderItem={renderClient}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}

        <FAB
          icon="plus"
          style={styles.fab}
          color={COLORS.textLight}
          onPress={() => navigation.navigate('AddClient')}
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
  fab: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.md,
    backgroundColor: COLORS.athleticBlue,
  },
});

export default ClientListScreen;
