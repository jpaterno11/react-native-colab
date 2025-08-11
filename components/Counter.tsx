import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CounterProps {
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  style?: any;
}

export default function Counter({ 
  initialValue = 0, 
  minValue = 0, 
  maxValue = 100, 
  step = 1,
  onValueChange,
  style 
}: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    const newValue = Math.min(count + step, maxValue);
    setCount(newValue);
    onValueChange?.(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(count - step, minValue);
    setCount(newValue);
    onValueChange?.(newValue);
  };

  const reset = () => {
    setCount(initialValue);
    onValueChange?.(initialValue);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Contador</Text>
      
      <View style={styles.counterContainer}>
        <TouchableOpacity 
          style={[styles.button, count <= minValue && styles.buttonDisabled]} 
          onPress={decrement}
          disabled={count <= minValue}
        >
          <Text style={[styles.buttonText, count <= minValue && styles.buttonTextDisabled]}>-</Text>
        </TouchableOpacity>
        
        <Text style={styles.count}>{count}</Text>
        
        <TouchableOpacity 
          style={[styles.button, count >= maxValue && styles.buttonDisabled]} 
          onPress={increment}
          disabled={count >= maxValue}
        >
          <Text style={[styles.buttonText, count >= maxValue && styles.buttonTextDisabled]}>+</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Mín: {minValue}</Text>
        <Text style={styles.infoText}>Máx: {maxValue}</Text>
        <Text style={styles.infoText}>Paso: {step}</Text>
      </View>
      
      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={styles.resetButtonText}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#999',
  },
  count: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 60,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  resetButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
