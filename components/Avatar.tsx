import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  showBorder?: boolean;
  borderColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'medium',
  onPress,
  style,
  textStyle,
  showBorder = false,
  borderColor = '#007AFF',
}) => {
  const avatarStyle = [
    styles.avatar,
    styles[size],
    showBorder && { borderColor, borderWidth: 2 },
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    textStyle,
  ];

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderContent = () => {
    if (source) {
      return (
        <Image
          source={{ uri: source }}
          style={[styles.image, styles[size]]}
          resizeMode="cover"
        />
      );
    }

    if (name) {
      return (
        <Text style={textStyles}>
          {getInitials(name)}
        </Text>
      );
    }

    return (
      <View style={[styles.placeholder, styles[size]]}>
        <Text style={[textStyles, styles.placeholderText]}>?</Text>
      </View>
    );
  };

  const AvatarComponent = (
    <View style={avatarStyle}>
      {renderContent()}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {AvatarComponent}
      </TouchableOpacity>
    );
  }

  return AvatarComponent;
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1E5E9',
    overflow: 'hidden',
  },
  // Sizes
  small: {
    width: 32,
    height: 32,
  },
  medium: {
    width: 48,
    height: 48,
  },
  large: {
    width: 64,
    height: 64,
  },
  xlarge: {
    width: 96,
    height: 96,
  },
  // Image
  image: {
    width: '100%',
    height: '100%',
  },
  // Placeholder
  placeholder: {
    backgroundColor: '#C7C7CC',
  },
  placeholderText: {
    color: '#8E8E93',
  },
  // Text
  text: {
    fontWeight: '600',
    color: '#1C1C1E',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 20,
  },
  xlargeText: {
    fontSize: 28,
  },
});

export default Avatar;
