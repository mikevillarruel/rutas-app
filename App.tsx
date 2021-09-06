import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { Navigator } from './src/navigator/Navigator';
import { PermissionsProvider } from './src/context/PermissionsContext';

const AppState = ({ children }: any) => {
  return (
    <PermissionsProvider>
      {children}
    </PermissionsProvider>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        translucent={true}
        backgroundColor='rgba(0,0,0,0.3)'
        barStyle='light-content'
      />
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App;
