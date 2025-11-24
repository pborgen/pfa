// PFA - Premier Fitness Alliance Training App
// Main App Entry Point

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import AppNavigation from './src/navigation';
import { theme } from './src/theme';
import { initializeStorage } from './src/services/storage';

export default function App() {
  useEffect(() => {
    // Initialize AsyncStorage on app start
    initializeStorage();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <AppNavigation />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
