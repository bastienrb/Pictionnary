import React from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar} from 'react-native';
import RNDraw from 'rn-draw';
import {ColorWheel} from 'react-native-color-wheel';
import Modal from 'react-native-simple-modal';
import words from './words.js'

const strokes = [2, 4, 6, 8, 10];
export default class App extends React.Component {

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
            gameStarted: false
        };
    }

    wordIsFound = () => {
        this.setState({gameStarted: !this.state.gameStarted, wordFound: !this.state.wordFound})
        if (this.state.gameStarted) {
            var nextindex = this.state.currentWordIndex + 1;
            if (this.state.listwords[nextindex]) {
                this.setState({currentWordIndex: nextindex})
            }
        }
        startGame = () => {
            console.log('hello')
            this.setState({gameStarted: true})
        }


    }

    render() {
        return (
            <View style={styles.container}>


                <StatusBar hidden={true}/>
                <Text style={styles.currentWord}>Mot à
                    dessiner: {this.state.listwords[this.state.currentWordIndex]}</Text>
                <View style={styles.drawContainer}>
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

                    {strokes.map((elem) => (
                        this.state.strokeWidth === elem
                            ? <TouchableOpacity
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
                        {!this.state.gameStarted && !this.state.wordFound &&
                        <View>
                            <Text style={{color: '#FFF'}}>Mot à dessiner
                                : {this.state.listwords[this.state.currentWordIndex]}</Text>
                            <TouchableOpacity style={styles.button}
                                              onPress={() => this.setState({gameStarted: true})}><Text
                                style={{color: '#FFF'}}>Commencer</Text></TouchableOpacity>
                        </View>
                        }
                        {this.state.wordFound &&
                        <View>
                            <Text style={{color: '#FFF'}}>Félicitations !</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.wordIsFound}>
                                <Text style={{color: '#FFF'}}>Recommencer</Text>
                            </TouchableOpacity>
                        </View>
                        }
                        {this.state.wordFail &&
                        <View>
                            <Text style={{color: '#FFF'}}>Dommage !</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.setState({gameStarted: false})}>
                                <Text style={{color: '#FFF'}}>Recommencer</Text>
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
