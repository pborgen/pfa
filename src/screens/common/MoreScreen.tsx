// PFA - Premier Fitness Alliance Training App
// More/Settings Screen with Logout

import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/common/Button';
import { COLORS, SPACING } from '../../constants';
import { commonStyles, textStyles } from '../../theme';
import { useAuth } from '../../context/AuthContext';

const MoreScreen = () => {
  const { signOut, user } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: signOut }
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['bottom']}>
      <View style={styles.container}>
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.displayName?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={textStyles.h2}>{user?.displayName || 'User'}</Text>
          <Text style={textStyles.bodySecondary}>{user?.email}</Text>
          <Text style={styles.roleTag}>
            {user?.role === 'admin' ? 'Coach' : 'Athlete'}
          </Text>
        </View>

        <View style={styles.menuSection}>
          <Button
            title="Log Out"
            onPress={handleLogout}
            variant="outlined"
            fullWidth
            icon="log-out-outline"
          />
        </View>

        <View style={styles.footer}>
          <Text style={textStyles.caption}>PFA - Premier Fitness Alliance</Text>
          <Text style={textStyles.caption}>Version 1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  userSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.athleticBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  roleTag: {
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    fontSize: 12,
    color: COLORS.textSecondary,
    overflow: 'hidden',
  },
  menuSection: {
    paddingVertical: SPACING.xl,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: SPACING.md,
  },
});

export default MoreScreen;
