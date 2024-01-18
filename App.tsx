import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomIcon from './src/components/CustomIcon'
import { PaperProvider } from 'react-native-paper'
import StackNavigator from './src/navigators/StackNavigator'
import SplashScreen from './src/screens/SplashScreen'
const App = () => {
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false)
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  console.log(loading)
  return (
    <PaperProvider>

      {loading ? <SplashScreen /> : <StackNavigator />}
    </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({})