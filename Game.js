import React from 'react';
import {StyleSheet, Text, View, Picker, TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import RNDraw from 'rn-draw';
import {ColorWheel} from 'react-native-color-wheel';
import Modal from 'react-native-simple-modal';
import CountdownCircle from 'react-native-countdown-circle'
import words from './words.js'
import {StackNavigator} from 'react-navigation'
import App from './App.js'

const strokes = [2, 4, 6, 8, 10];
export default class Game extends React.Component {

    static navigationOptions = {
        title: 'Game'
    }

    constructor(props) {
        super(props);
        this.state = {
            color: '#FFF',
            strokeWidth: 4,
            activeColor: '#e0e0e0',
            listwords: words,
            currentWordIndex: 0,
            wordFound: false,
            wordFail: false,
            gameStarted: false,
            displayWord: false,
            printScore: false,
            players: this.props.navigation.state.params.playerlist,
            currentPlayerIndex: 0,
            givePointTo: false
        };
    }

    wordIsFound = () => {
        console.log("cc")
        this.setState({
            wordFound: !this.state.wordFound,
            gameStarted: false
        })
    }


    onWordFail = () => {
        this.setState({
            wordFail: !this.state.wordFail,
            gameStarted: false
        })
    }

    seeScore = () => {
        let data = this.state.players
        for (let index = 0; index < data.length; index++) {
            if (data[index].name === this.state.givePointTo) {
                data[index].score += 1
            }
        }
        this.setState({
            players: data,
            givePointTo: false,
            printScore: !this.state.printScore,
            wordFound: false,
        })
    }

    nextPlayer = () => {
        if (this.state.listwords[this.state.currentWordIndex + 1]) {
            this.setState({
                currentWordIndex: this.state.currentWordIndex + 1,
                currentPlayerIndex: this.state.currentPlayerIndex + 1,
                wordFound: false,
                wordFail: false,
                displayWord: false,
                printScore: false,
            })
        }
        if (!this.state.players[this.state.currentPlayerIndex + 1])
            this.setState({
                currentPlayerIndex: 0,
            })
    }


    startGame = () => {
        this.setState({gameStarted: !this.state.gameStarted,})
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <View style={styles.drawContainer}>
                    {this.state.gameStarted &&
                    <CountdownCircle
                        seconds={60}
                        radius={25}
                        borderWidth={4}
                        color="#F05E9F"
                        bgColor="#fff"
                        onTimeElapsed={this.onWordFail}
                    />
                    }
                    <RNDraw
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0.01)'}}
                        rewind={(undo) => {
                            this._undo = undo
                        }}
                        clear={(clear) => {
                            this._clear = clear
                        }}
                        color={this.state.color}
                        strokeWidth={this.state.strokeWidth}
                    />
                </View>

                <View style={styles.actionContainer}>
                    <ColorWheel
                        initialColor={this.state.color}
                        onColorChange={(color) => this.setState({color: color})}
                        style={{padding: 40, height: 100, width: 100}}/>

                    <TouchableOpacity style={styles.button} onPress={this._undo}><Text
                        style={{color: '#FFF'}}>Undo</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this._clear}><Text
                        style={{color: '#FFF'}}>Clear</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.wordIsFound}><Text style={{color: '#FFF'}}>Mot
                        trouvé</Text></TouchableOpacity>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#696969',
                    justifyContent: 'space-between',
                }}>

                    {strokes.map((elem, index) => (
                        this.state.strokeWidth === elem
                            ? <TouchableOpacity
                                key = {index}
                                style={{
                                    backgroundColor: this.state.color,
                                    width: elem * 10,
                                    height: elem * 10,
                                    borderRadius: 100,
                                    borderWidth: 3,
                                    borderColor: '#000000',
                                }}
                                onPress={() => this.setState({strokeWidth: elem})}>
                            </TouchableOpacity>
                            : <TouchableOpacity
                                key = {index}
                                style={{
                                    backgroundColor: this.state.color,
                                    width: elem * 5,
                                    height: elem * 5,
                                    borderRadius: 50,
                                }}
                                onPress={() => this.setState({strokeWidth: elem})}>
                            </TouchableOpacity>
                    ))}

                </View>

                <Modal
                    open={!this.state.gameStarted || this.state.wordFound || this.state.wordFail}
                    offset={0}
                    overlayBackground={'rgba(0, 0, 0, 0.75)'}
                    animationDuration={200}
                    animationTension={40}
                    modalDidOpen={() => undefined}
                    modalDidClose={() => this.setState({modalOpen: false})}
                    closeOnTouchOutside={true}
                    containerStyle={{
                        justifyContent: 'center'
                    }}
                    modalStyle={{
                        borderRadius: 2,
                        margin: 20,
                        padding: 50,
                        backgroundColor: '#696969',
                    }}
                    disableOnBackPress={false}>
                    <View>
                        {!this.state.gameStarted && !this.state.wordFound && !this.state.wordFail && !this.state.displayWord &&
                        <View>
                            <Text style={{color: '#FFF'}}> Let's play
                                : {this.state.players[this.state.currentPlayerIndex].name}</Text>
                            <TouchableOpacity style={styles.button}
                                              onPress={() => this.setState({displayWord: !this.state.displayWord})}><Text
                                style={{color: '#FFF'}}>See the word !</Text></TouchableOpacity>
                        </View>
                        }
                        {!this.state.gameStarted && !this.state.wordFound && !this.state.wordFail && this.state.displayWord && !this.state.printScore &&
                        <View>
                            <Text style={{color: '#FFF'}}>Mot à dessiner
                                : {this.state.listwords[this.state.currentWordIndex]}</Text>
                            <TouchableOpacity style={styles.button}
                                              onPress={this.startGame}><Text
                                style={{color: '#FFF'}}>Commencer</Text></TouchableOpacity>
                        </View>
                        }
                        {this.state.wordFound &&
                        <View>
                            <Text style={{color: '#FFF'}}>Félicitations !</Text>
                            <Picker
                                selectedValue={this.state.givePointTo}
                                onValueChange={(itemValue) => this.setState({givePointTo: itemValue})}>
                                <Picker.Item label="Attribuez le point à ..." value={null}/>
                                {this.state.players.map((player, index) => (
                                    <Picker.Item key={index}
                                                 label={player.name}
                                                 value={player.name}/>
                                ))}
                            </Picker>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.seeScore}>
                                <Text style={{color: '#FFF'}}>Score</Text>
                            </TouchableOpacity>
                        </View>
                        }
                        {this.state.printScore &&
                        <View>
                            <Text style={{color: '#FFF'}}>Score :</Text>
                            <ScrollView>
                                {this.state.players.map((player, index) => (
                                    <Text key = {index}>{player.name} {player.score}</Text>
                                ))}
                            </ScrollView>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.nextPlayer}>
                                <Text style={{color: '#FFF'}}>Joueur suivant</Text>
                            </TouchableOpacity>
                        </View>
                        }
                        {this.state.wordFail &&
                        <View>
                            <Text style={{color: '#FFF'}}>Dommage !</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.nextPlayer}>
                                <Text style={{color: '#FFF'}}>Joueur suivant</Text>
                            </TouchableOpacity>
                        </View>
                        }
                    </View>


                </Modal>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#696969',
    },
    drawContainer: {
        flex: 2,
        paddingBottom: 20,
        borderWidth: 2,
        borderColor: '#FFF',
        backgroundColor: '#000000'
    },
    actionContainer: {
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#696969',

    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        height: 50,
        marginLeft: 15,
        marginTop: 20,
        borderColor: '#FFF'
    },
    currentWord: {
        fontSize: 18,
        color: '#FFF',
        padding: 10,
    },
    modal: {
        flex: 1,
    }
})
