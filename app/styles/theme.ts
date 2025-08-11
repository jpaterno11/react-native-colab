export const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  info: '#5AC8FA',

  text: '#1C1C1E',
  textMuted: '#8E8E93',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  border: '#E1E5E9',
  inputBorder: '#E1E5E9',
  inputBorderFocused: '#007AFF',
  inputBorderError: '#FF3B30',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
};

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: colors.textMuted,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.text,
  },
  label: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: colors.text,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: colors.textMuted,
  },
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export const layout = {
  screenPadding: spacing.lg,
};

export const theme = {
  colors,
  spacing,
  radius,
  typography,
  shadows,
  layout,
};

export type Theme = typeof theme;
