// PFA - Premier Fitness Alliance Training App
// Add Client Screen

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Crypto from 'expo-crypto';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { saveClient } from '../../services/storage';
import { Client } from '../../types';
import { SPACING, VALIDATION, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../constants';
import { commonStyles, textStyles } from '../../theme';

const AddClientScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (name.length < VALIDATION.client.nameMinLength) {
      newErrors.name = `Name must be at least ${VALIDATION.client.nameMinLength} characters`;
    }

    if (!VALIDATION.client.emailRegex.test(email)) {
      newErrors.email = ERROR_MESSAGES.client.invalidEmail;
    }

    if (phone && !VALIDATION.client.phoneRegex.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const newClient: Client = {
        id: Crypto.randomUUID(),
        name,
        email,
        phone: phone || undefined,
        notes: notes || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveClient(newClient);

      // TODO: Send invitation email via Firebase Cloud Function
      // await sendInvitationEmail({
      //   email,
      //   clientName: name,
      //   trainerName: 'Coach',
      //   invitationCode: newClient.id,
      // });

      Alert.alert(
        'Success',
        SUCCESS_MESSAGES.client.created,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error saving client:', error);
      Alert.alert('Error', ERROR_MESSAGES.client.createFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={textStyles.h2}>Add New Athlete</Text>
        <Text style={textStyles.bodySecondary}>
          Enter athlete information. They will receive an email invitation to join.
        </Text>

        <View style={styles.form}>
          <Input
            label="Full Name *"
            value={name}
            onChangeText={setName}
            placeholder="Jane Smith"
            error={errors.name}
            leftIcon="account"
          />

          <Input
            label="Email *"
            value={email}
            onChangeText={setEmail}
            placeholder="jane@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            leftIcon="email"
          />

          <Input
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="(555) 123-4567"
            keyboardType="phone-pad"
            error={errors.phone}
            leftIcon="phone"
          />

          <Input
            label="Notes"
            value={notes}
            onChangeText={setNotes}
            placeholder="Training goals, preferences, etc."
            multiline
            numberOfLines={4}
            leftIcon="note-text"
          />

          <Button
            title="Add Athlete"
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
});

export default AddClientScreen;
