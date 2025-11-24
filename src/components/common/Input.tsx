// PFA - Premier Fitness Alliance Training App
// Custom Input Component

import React from 'react';
import { View, StyleSheet, TextInput as RNTextInput } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: RNTextInput['props']['keyboardType'];
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  disabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  disabled = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        mode="outlined"
        error={!!error}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        disabled={disabled}
        left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : undefined}
        right={
          rightIcon ? (
            <TextInput.Icon icon={rightIcon} onPress={onRightIconPress} />
          ) : undefined
        }
        style={styles.input}
        outlineStyle={styles.outline}
        theme={{
          colors: {
            primary: COLORS.athleticBlue,
            error: COLORS.alertRed,
          },
        }}
      />
      {error && (
        <HelperText type="error" visible={!!error} style={styles.error}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  input: {
    backgroundColor: COLORS.background,
    fontSize: 16,
  },
  outline: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
  },
  error: {
    color: COLORS.alertRed,
    fontSize: 12,
  },
});

export default Input;
