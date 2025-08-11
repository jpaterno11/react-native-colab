import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseLocalStorageOptions {
  defaultValue?: any;
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
}

const useLocalStorage = <T>(
  key: string,
  options: UseLocalStorageOptions = {}
) => {
  const {
    defaultValue,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Intentar obtener el valor del almacenamiento local
      const item = AsyncStorage.getItem(key);
      if (item) {
        return deserialize(item);
      }
      return defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  // Cargar el valor inicial desde AsyncStorage
  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        setIsLoading(true);
        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          setStoredValue(deserialize(item));
        }
      } catch (error) {
        console.error(`Error loading localStorage key "${key}":`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredValue();
  }, [key, deserialize]);

  // Función para establecer el valor
  const setValue = useCallback(
    async (value: T | ((val: T) => T)) => {
      try {
      // Permitir que value sea una función para que tengamos la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Guardar en el estado
      setStoredValue(valueToStore);
      
      // Guardar en AsyncStorage
      await AsyncStorage.setItem(key, serialize(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },
    [key, serialize, storedValue]
  );

  // Función para remover el valor
  const removeValue = useCallback(async () => {
    try {
      setStoredValue(defaultValue);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, defaultValue]);

  // Función para limpiar todo el almacenamiento
  const clearStorage = useCallback(async () => {
    try {
      await AsyncStorage.clear();
      setStoredValue(defaultValue);
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  }, [defaultValue]);

  // Función para obtener todas las claves
  const getAllKeys = useCallback(async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }, []);

  // Función para obtener múltiples valores
  const getMultiple = useCallback(async (keys: string[]) => {
    try {
      const values = await AsyncStorage.multiGet(keys);
      return values.map(([key, value]) => [
        key,
        value ? deserialize(value) : null,
      ]);
    } catch (error) {
      console.error('Error getting multiple values:', error);
      return [];
    }
  }, [deserialize]);

  // Función para establecer múltiples valores
  const setMultiple = useCallback(async (keyValuePairs: [string, any][]) => {
    try {
      const serializedPairs = keyValuePairs.map(([key, value]) => [
        key,
        serialize(value),
      ]);
      await AsyncStorage.multiSet(serializedPairs);
      
      // Actualizar el estado si la clave actual está incluida
      const currentKeyPair = keyValuePairs.find(([k]) => k === key);
      if (currentKeyPair) {
        setStoredValue(currentKeyPair[1]);
      }
    } catch (error) {
      console.error('Error setting multiple values:', error);
    }
  }, [key, serialize]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    clearStorage,
    getAllKeys,
    getMultiple,
    setMultiple,
    isLoading,
  };
};

export default useLocalStorage;
