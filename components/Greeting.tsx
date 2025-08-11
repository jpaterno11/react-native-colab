import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GreetingProps {
  name: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  style?: any;
}

export default function Greeting({ name, timeOfDay, style }: GreetingProps) {
  const getGreeting = () => {
    if (timeOfDay) {
      switch (timeOfDay) {
        case 'morning':
          return '¡Buenos días';
        case 'afternoon':
          return '¡Buenas tardes';
        case 'evening':
          return '¡Buenas tardes';
        case 'night':
          return '¡Buenas noches';
        default:
          return '¡Hola';
      }
    }
    
    // Determinar automáticamente basado en la hora actual
    const hour = new Date().getHours();
    if (hour < 12) return '¡Buenos días';
    if (hour < 18) return '¡Buenas tardes';
    return '¡Buenas noches';
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.greeting}>{getGreeting()}, {name}!</Text>
      <Text style={styles.subtitle}>¿Cómo estás hoy?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
