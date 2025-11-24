// PFA - Premier Fitness Alliance Training App
// Login Screen with Google and Apple Sign-In

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { signInWithGoogle, signInWithApple } from '../../services/firebase';
import Button from '../../components/common/Button';
import { COLORS, SPACING, FONT_SIZES, APP_FULL_NAME, MISSION_STATEMENT } from '../../constants';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // TODO: Add from Firebase Console
  offlineAccess: true,
});

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Get the ID token from the user info
      const tokens = await GoogleSignin.getTokens();
      if (tokens.idToken) {
        const user = await signInWithGoogle(tokens.idToken);
        console.log('Signed in with Google:', user.email);
        // Navigation will be handled by auth state change
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential.identityToken) {
        const user = await signInWithApple(
          credential.identityToken,
          credential.authorizationCode
        );
        console.log('Signed in with Apple:', user.email);
        // Navigation will be handled by auth state change
      }
    } catch (err: any) {
      if (err.code !== 'ERR_CANCELED') {
        console.error('Apple Sign-In Error:', err);
        setError('Failed to sign in with Apple. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
            icon="google"
          />

          {Platform.OS === 'ios' && (
            <Button
              title="Sign in with Apple"
              onPress={handleAppleSignIn}
              variant="outlined"
              fullWidth
              loading={loading}
              icon="apple"
            />
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
