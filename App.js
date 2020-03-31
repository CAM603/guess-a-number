import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameSceen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

// We are writing this function outside because this doesn't need to be created for every render cycle
const fetchFonts = () => {
  // returns a promise
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const newGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameSceen onStartGame={startGameHandler}/>;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen 
        rounds={guessRounds} 
        userNumber={userNumber}
        newGame={newGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
