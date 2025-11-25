// PFA - Premier Fitness Alliance Training App
// Main Navigation Structure

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList, AdminTabParamList, ClientTabParamList } from '../types';
import { COLORS } from '../constants';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';

// Admin Screens
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import ClientListScreen from '../screens/admin/ClientListScreen';
import AddClientScreen from '../screens/admin/AddClientScreen';
import WorkoutBuilderScreen from '../screens/admin/WorkoutBuilderScreen';
import WorkoutListScreen from '../screens/admin/WorkoutListScreen';
import AssignWorkoutScreen from '../screens/admin/AssignWorkoutScreen';
import AthleteDetailScreen from '../screens/admin/AthleteDetailScreen';

// Client Screens
import ClientHomeScreen from '../screens/client/ClientHomeScreen';
import WorkoutLogScreen from '../screens/client/WorkoutLogScreen';
import ProgressScreen from '../screens/client/ProgressScreen';

// Common Screens
import MoreScreen from '../screens/common/MoreScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AdminTab = createBottomTabNavigator<AdminTabParamList>();
const ClientTab = createBottomTabNavigator<ClientTabParamList>();

// ============================================================================
// ADMIN TABS
// ============================================================================

const AdminTabs = () => {
  return (
    <AdminTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'AdminHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ClientList') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'WorkoutList') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'AdminMore') {
            iconName = focused ? 'menu' : 'menu-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.athleticBlue,
        tabBarInactiveTintColor: COLORS.mediumGray,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.lightGray,
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.textLight,
      })}
    >
      <AdminTab.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{ title: 'Dashboard' }}
      />
      <AdminTab.Screen
        name="ClientList"
        component={ClientListScreen}
        options={{ title: 'Athletes' }}
      />
      <AdminTab.Screen
        name="WorkoutList"
        component={WorkoutListScreen}
        options={{ title: 'Workouts' }}
      />
      <AdminTab.Screen
        name="AdminMore"
        component={MoreScreen}
        options={{ title: 'More' }}
      />
    </AdminTab.Navigator>
  );
};

// ============================================================================
// CLIENT TABS
// ============================================================================

const ClientTabs = () => {
  return (
    <ClientTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'ClientHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Progress') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'ClientMore') {
            iconName = focused ? 'menu' : 'menu-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.athleticBlue,
        tabBarInactiveTintColor: COLORS.mediumGray,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.lightGray,
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.textLight,
      })}
    >
      <ClientTab.Screen
        name="ClientHome"
        component={ClientHomeScreen}
        options={{ title: 'My Workouts' }}
      />
      <ClientTab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ title: 'Progress' }}
      />
      <ClientTab.Screen
        name="ClientMore"
        component={MoreScreen}
        options={{ title: 'More' }}
      />
    </ClientTab.Navigator>
  );
};

// ============================================================================
// ROOT NAVIGATION
// ============================================================================

const RootNavigator = () => {
  const { isAuthenticated, user } = useAuth();
  const userRole = user?.role || 'admin';

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.textLight,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : userRole === 'admin' ? (
        <>
          <Stack.Screen
            name="AdminMain"
            component={AdminTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddClient"
            component={AddClientScreen}
            options={{ title: 'Add Athlete' }}
          />
          <Stack.Screen
            name="WorkoutBuilder"
            component={WorkoutBuilderScreen}
            options={{ title: 'Build Workout' }}
          />
          <Stack.Screen
            name="WorkoutLog"
            component={WorkoutLogScreen}
            options={{ title: 'Log Workout' }}
          />
          <Stack.Screen
            name="AssignWorkout"
            component={AssignWorkoutScreen}
            options={{ title: 'Assign Workout' }}
          />
          <Stack.Screen
            name="AthleteDetail"
            component={AthleteDetailScreen}
            options={{ title: 'Athlete Details' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="ClientMain"
            component={ClientTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WorkoutLog"
            component={WorkoutLogScreen}
            options={{ title: 'Log Workout' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

// ============================================================================
// MAIN APP NAVIGATION
// ============================================================================

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
