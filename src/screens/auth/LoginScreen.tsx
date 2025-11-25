// PFA - Premier Fitness Alliance Training App
// Login Screen with Google and Apple Sign-In

import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/common/Button';
import { COLORS, SPACING, FONT_SIZES, APP_FULL_NAME, MISSION_STATEMENT } from '../../constants';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();

  const handleGoogleSignIn = async () => {
    // Note: Google Sign-In requires a development build, not Expo Go
    // For now, show a message explaining this
    Alert.alert(
      'Development Build Required',
      'Google Sign-In requires a development build. In Expo Go, this feature is not available.\n\nTo test authentication:\n1. Run: eas build --profile development --platform ios\n2. Install the development build\n3. Then sign-in will work',
      [{ text: 'OK' }]
    );
  };

  const handleAppleSignIn = async () => {
    // Note: Apple Sign-In requires a development build, not Expo Go
    Alert.alert(
      'Development Build Required',
      'Apple Sign-In requires a development build. In Expo Go, this feature is not available.\n\nTo test authentication:\n1. Run: eas build --profile development --platform ios\n2. Install the development build\n3. Then sign-in will work',
      [{ text: 'OK' }]
    );
  };

  // Temporary: Skip login for development/testing
  const handleDevLogin = (role: 'admin' | 'client') => {
    const roleLabel = role === 'admin' ? 'Admin' : 'Client';
    Alert.alert(
      'Development Mode',
      `This will simulate logging in as a ${roleLabel.toLowerCase()} user for testing purposes.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: `Continue as ${roleLabel}`,
          onPress: () => {
            signIn(role);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Header Section */}
        <View style={styles.header}>
          <Text style={styles.logo}>PFA</Text>
          <Text style={styles.appName}>{APP_FULL_NAME}</Text>
          <Text style={styles.tagline}>{MISSION_STATEMENT}</Text>
        </View>

        {/* Sign-In Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Sign in with Google"
            onPress={handleGoogleSignIn}
            variant="primary"
            fullWidth
            loading={loading}
          />

          {Platform.OS === 'ios' && (
            <Button
              title="Sign in with Apple"
              onPress={handleAppleSignIn}
              variant="outlined"
              fullWidth
              loading={loading}
            />
          )}

          {/* Dev mode - skip login */}
          {__DEV__ && (
            <View style={styles.devSection}>
              <Text style={styles.devText}>Development Mode</Text>
              <Button
                title="Continue as Admin"
                onPress={() => handleDevLogin('admin')}
                variant="text"
                fullWidth
              />
              <Button
                title="Continue as Client"
                onPress={() => handleDevLogin('client')}
                variant="text"
                fullWidth
              />
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: SPACING.xl,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logo: {
    fontSize: 72,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  appName: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  tagline: {
    fontSize: FONT_SIZES.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  devSection: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    alignItems: 'center',
  },
  devText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: SPACING.md,
    borderRadius: 8,
    marginTop: SPACING.md,
  },
  errorText: {
    color: COLORS.alertRed,
    textAlign: 'center',
    fontSize: FONT_SIZES.small,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: SPACING.md,
  },
  footerText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LoginScreen;
