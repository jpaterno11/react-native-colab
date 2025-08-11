import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './app/navigation/AppNavigator';

// Aplicación principal de React Native Colab
// Desarrollada por el equipo (edición Usuario C): varcharTomas, jpaterno11, varcharJoaquin
export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
