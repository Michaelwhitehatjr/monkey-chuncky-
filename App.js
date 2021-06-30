import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
import {Audio} from 'expo-av';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      displayText: '',
      chunks: [],
      phones: [],
    };
  }

  playSound = async(soundChunk) => {
    // alert('Playing sound');
    await Audio.Sound.createAsync(
      { uri: 'https://s3-whitehatjrcontent.whjr.online/phones/'+ soundChunk +'.mp3' },
      { shouldPlay: true }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'blue'}
          centerComponent={{
            text: 'Monkey Chunky',
            style: { color: 'violet', fontSize: 20 },
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            this.setState({ chunks: db[this.state.text].chunks });
            this.setState({ phones: db[this.state.text].phones });
            this.setState({ displayText: this.state.text });
            console.log(this.state.chunks);
          }}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>

        <View>
          {this.state.chunks.map((chunk,index) => (
            <TouchableOpacity
              onPress={() => {this.playSound(this.state.phones[index])}}
              style={styles.displayText}>
              {chunk}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
  },
  inputBox: {
    marginTop: 200,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: 'purple',
    width: 200,
    margin: 7,
  },
});
