import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { Appearance } from 'react-native'
import { Provider } from 'react-redux';

import { Provider as PaperProvider } from 'react-native-paper';
import { darkTheme, lightTheme } from './src/theme/theme';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import { store } from './src/store/store';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
const App = () => {
  const [scheme, setScheme] = useState<string | null | undefined>(Appearance.getColorScheme())
  const theme: ThemeProp = scheme === 'dark' ? darkTheme : lightTheme;
  useEffect(() => {
    console.log(Appearance.getColorScheme())
    const appearanceListener = Appearance.addChangeListener((theme) => {
      setScheme(theme.colorScheme);
    });
    return () => {
      appearanceListener.remove();
    }
  }, [])

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <MainStackNavigator theme={theme} />
        </NavigationContainer>
      </Provider>
    </PaperProvider>)
}


export default App;