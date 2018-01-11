import React from 'react'
import {Button, StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar, AppRegistry, TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation'
import Game from './Game'



class App extends React.Component{

static navigationOptions = {
    title: 'Home',
  }

   constructor(props) {
        super(props);
        this.state = {
           players: ['', '']
        };
    }

    addPlayer = () => {
        var tab = this.state.players
        tab.push('')
        this.setState({players: tab})
    }

    removePlayer = () => {
        var tab = this.state.players
        tab = tab.slice(1)
        this.setState({players: tab})
    }

  render() {
    return (
    <View>
      <TouchableOpacity onPress={this.addPlayer}><Text>+</Text></TouchableOpacity>
      <Text>{this.state.players.length} Joueurs</Text>
      {this.state.players.length == 2 && 
        <TouchableOpacity disabled={true} onPress={this.removePlayer}><Text>-</Text></TouchableOpacity>
      }
      {this.state.players.length > 2 && 
        <TouchableOpacity onPress={this.removePlayer}><Text>-</Text></TouchableOpacity>
      }

      {this.state.players.map((elem) => (
          <TextInput>{elem}</TextInput>
      ))}
      
      <Button onPress={() => this.props.navigation.navigate("Game")} title="Go to game"/>
    </View>
    );
  }
}

export default StackNavigator({
  Home: {
    screen: App,
  },
  Game: {
      screen: Game,
  }
});