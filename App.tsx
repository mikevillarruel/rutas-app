import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { Navigator } from './src/navigator/Navigator';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        translucent={true}
        backgroundColor='rgba(0,0,0,0.3)'
        barStyle='light-content'
      />
      <Navigator />
    </NavigationContainer>
  )
}

export default App;
