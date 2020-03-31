import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItem = (value, numOfRound) => {
  return (
    <View key={value} style={styles.listItem}>
      <BodyText>#{numOfRound}</BodyText>
      <BodyText>{value}</BodyText>
    </View>
  )
}

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width)
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height)
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  
  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get('window').width)
      setDeviceHeight(Dimensions.get('window').height)
    }
    Dimensions.addEventListener('change', updateLayout)
    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  }, [])

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'higher' && currentGuess > props.userChoice)
    ) {
      Alert.alert('WORNG', 'NOPE', [{ text: 'Sorry!', style: 'cancel' }])
      return
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber)
    setPastGuesses(curGuesses => [nextNumber, ...curGuesses])
  }

  let listContainerStyle = styles.listContainer;

  if (deviceWidth < 350) {
    listContainerStyle = styles.listContainerBig
  }

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Computer guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color='white'/>
          </MainButton>
          <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
            <Ionicons name="md-add" size={24} color='white'/>
          </MainButton>
        </View>
        
        <View style={listContainerStyle}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
          </ScrollView>
        </View>
    </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Computer guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color='white'/>
          </MainButton>
          <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
            <Ionicons name="md-add" size={24} color='white'/>
          </MainButton>
        </Card>
        <View style={listContainerStyle}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
          </ScrollView>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  listContainer: {
    flex: 1,
    width: '60%'
  },
  listContainerBig: {
    flex: 1,
    width: '80%'
  },
  listItem: {
    flexDirection: 'row',
    borderColor: '#BADA22',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    width: '60%'
  },
  list: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center'
  }
})

export default GameScreen;