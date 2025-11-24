// PFA - Premier Fitness Alliance Training App
// Custom Card Component

import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevation?: number;
}

const Card: React.FC<CardProps> = ({ children, onPress, style, elevation = 2 }) => {
  const cardStyle = [
    styles.card,
    {
      elevation,
      shadowOpacity: elevation * 0.05,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
});

export default Card;
