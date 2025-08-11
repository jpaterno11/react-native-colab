import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  onPress?: () => void;
  style?: any;
}

export default function NotificationBadge({ 
  count, 
  maxCount = 99, 
  size = 'medium',
  color = '#FF3B30',
  onPress,
  style 
}: NotificationBadgeProps) {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [bounceAnim] = useState(new Animated.Value(0));

  // Animación cuando cambia el contador
  useEffect(() => {
    if (count > 0) {
      // Animación de escala
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      // Animación de rebote
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [count]);

  // Obtener dimensiones según el tamaño
  const getBadgeSize = () => {
    switch (size) {
      case 'small':
        return { width: 16, height: 16, fontSize: 10 };
      case 'large':
        return { width: 28, height: 28, fontSize: 16 };
      default: // medium
        return { width: 20, height: 20, fontSize: 12 };
    }
  };

  const badgeSize = getBadgeSize();
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  // Si no hay notificaciones, no mostrar el badge
  if (count === 0) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Animated.View 
        style={[
          styles.badge,
          {
            width: badgeSize.width,
            height: badgeSize.height,
            backgroundColor: color,
            transform: [
              { scale: scaleAnim },
              { translateY: bounceAnim }
            ]
          },
          style
        ]}
      >
        <Text style={[
          styles.badgeText,
          { fontSize: badgeSize.fontSize }
        ]}>
          {displayCount}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
