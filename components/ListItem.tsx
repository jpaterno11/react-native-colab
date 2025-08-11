import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  showChevron?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  leftIconStyle?: ViewStyle;
  rightIconStyle?: ViewStyle;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onPress,
  onLongPress,
  disabled = false,
  showChevron = false,
  style,
  titleStyle,
  subtitleStyle,
  leftIconStyle,
  rightIconStyle,
}) => {
  const containerStyle = [
    styles.container,
    disabled && styles.disabled,
    style,
  ];

  const titleStyles = [
    styles.title,
    disabled && styles.disabledText,
    titleStyle,
  ];

  const subtitleStyles = [
    styles.subtitle,
    disabled && styles.disabledText,
    subtitleStyle,
  ];

  const content = (
    <View style={styles.content}>
      {leftIcon && (
        <View style={[styles.leftIcon, leftIconStyle]}>
          {leftIcon}
        </View>
      )}
      
      <View style={styles.textContainer}>
        <Text style={titleStyles} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={subtitleStyles} numberOfLines={2}>
            {subtitle}
          </Text>
        )}
      </View>
      
      <View style={styles.rightContainer}>
        {rightIcon && (
          <View style={[styles.rightIcon, rightIconStyle]}>
            {rightIcon}
          </View>
        )}
        {showChevron && (
          <Text style={[styles.chevron, disabled && styles.disabledText]}>
            ›
          </Text>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5E9',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: 12,
    width: 24,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 18,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    marginRight: 8,
    width: 24,
    alignItems: 'center',
  },
  chevron: {
    fontSize: 18,
    color: '#8E8E93',
    fontWeight: '300',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});

export default ListItem;
