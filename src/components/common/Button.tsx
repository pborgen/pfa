// PFA - Premier Fitness Alliance Training App
// Custom Button Component

import React from 'react';
import { Button as PaperButton, ActivityIndicator } from 'react-native-paper';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getButtonMode = () => {
    if (variant === 'outlined') return 'outlined';
    if (variant === 'text') return 'text';
    return 'contained';
  };

  const getButtonColor = () => {
    if (variant === 'secondary') return COLORS.actionGreen;
    return COLORS.athleticBlue;
  };

  return (
    <PaperButton
      mode={getButtonMode()}
      onPress={onPress}
      disabled={disabled || loading}
      icon={loading ? undefined : icon}
      buttonColor={variant === 'outlined' || variant === 'text' ? undefined : getButtonColor()}
      textColor={
        variant === 'outlined' || variant === 'text'
          ? getButtonColor()
          : COLORS.textLight
      }
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        variant === 'outlined' && styles.outlined,
        style,
      ]}
      contentStyle={styles.content}
      labelStyle={[styles.label, textStyle]}
    >
      {loading ? <ActivityIndicator size="small" color={COLORS.textLight} /> : title}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.md,
    marginVertical: SPACING.xs,
  },
  content: {
    paddingVertical: SPACING.xs,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  fullWidth: {
    width: '100%',
  },
  outlined: {
    borderWidth: 2,
    borderColor: COLORS.athleticBlue,
  },
});

export default Button;
