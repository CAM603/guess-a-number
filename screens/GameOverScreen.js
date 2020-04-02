import React from 'react';
import { StyleSheet, View, Text, Button, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>GAME OVER</TitleText>
        <View style={styles.imageConatainer}>
          <Image 
            source={require('../assets/success.png')} 
            style={styles.image} 
            resizeMode="cover"
            // For web images... fadeDuration={1000}
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.rounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
          <MainButton onPress={props.newGame}>
            NEW GAME
          </MainButton>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  image: {
    width: '100%%',
    height: '100%'
  },
  imageConatainer: {
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    height: Dimensions.get('window').width * 0.7,
    width: Dimensions.get('window').width * 0.7,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
    
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
    marginVertical: 15
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60,
    alignItems: 'center'
  }
})

export default GameOverScreen;