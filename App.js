import React from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameSceen from './screens/StartGameScreen';

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      <StartGameSceen/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
