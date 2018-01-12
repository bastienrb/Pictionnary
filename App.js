import React from 'react'
import {
    Button,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    AppRegistry,
    TextInput
} from 'react-native';
import {StackNavigator} from 'react-navigation'
import Game from './Game'


class App extends React.Component {

    static navigationOptions = {
        title: 'Home',
    }

    constructor(props) {
        super(props);
        this.state = {
            players: [
                {
                    "name": "",
                    "score": 0,
                },
                {
                    "name": "",
                    "score": 0,
                },
            ],
        }
    }

    addPlayer = () => {

        let data = this.state.players
        data.push({
            "name": "",
            "score": 0,
        })
        this.setState({players: data})
    }

    removePlayer = () => {
        let tab = this.state.players
        tab = tab.slice(1)
        this.setState({players: tab})
    }

    onChangeName = (text, index) => {
        let playerlist = this.state.players
        playerlist[index].name = text
        this.setState({players: playerlist})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.state.players.length} Joueurs</Text>
                <View style={styles.playersOption}>
                    {this.state.players.length === 2 &&
                    <TouchableOpacity style={styles.button} disabled={true}
                                      onPress={this.removePlayer}><Text style={styles.text}>-</Text></TouchableOpacity>
                    }
                    {this.state.players.length > 2 &&
                    <TouchableOpacity style={styles.button}
                                      onPress={this.removePlayer}><Text style={styles.text}>-</Text></TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.button} onPress={this.addPlayer}><Text style={styles.text}>+</Text></TouchableOpacity>
                </View>
                <ScrollView style={styles.playersName}>
                    {this.state.players.map((elem, index) => (
                        <TextInput
                            key = {index}
                            style={styles.button}
                            placeholder={"Joueur " + (index + 1)}
                            onChangeText={(text) => this.onChangeName(text, index)}
                            value={elem.name}
                        />
                    ))}
                </ScrollView>
                {!this.state.players.includes('') &&
                <Button onPress={() => this.props.navigation.navigate("Game", {playerlist: this.state.players})}
                        title="Play"/>
                }
                {this.state.players.includes('') &&
                <Button title="Need some name"/>
                }
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
    },
});

const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#696969',
        },
        playersOption: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        playersName: {
            flex: 3,
        },
        button: {
            flex: 1,
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderWidth: 1,
            height: 50,
            marginLeft: 15,
            marginTop: 20,
            borderColor: '#FFF',
        },
        text: {
            color: '#FFF',
            fontSize: 18,
            textAlign: "center"
        },
        modal: {
            flex: 1,
        }
    }
)