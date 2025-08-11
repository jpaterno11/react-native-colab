import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './app/navigation/AppNavigator';

// Aplicación principal de React Native Colab
// Desarrollada por el equipo: jpaterno11, varcharJoaquin, varcharTomas
export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
