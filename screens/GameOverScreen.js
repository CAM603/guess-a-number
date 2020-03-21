import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>GAME OVER</Text>
      <Text>Number of rounds: {props.rounds}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="New Game" onPress={props.newGame}/>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default GameOverScreen;