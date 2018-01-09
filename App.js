import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar} from 'react-native';
import RNDraw from 'rn-draw';
import { ColorWheel } from 'react-native-color-wheel';
import Modal from 'react-native-simple-modal';
import words from './words.js'
const strokes = [2, 4, 6, 8, 10];
export default class App extends React.Component {

constructor (props){
    super(props);
    this.state = {color: '#000000', strokeWidth: 4, activeColor: '#e0e0e0', listwords: words, currentWordIndex: 0, wordFound : false, wordFail: false, gameStarted: false};
  }

wordIsFound = () => {
   this.setState({gameStarted: !this.state.gameStarted, wordFound: !this.state.wordFound})
   var nextindex = this.state.currentWordIndex + 1;
   if (this.state.listwords[nextindex] != null){
     this.setState({currentWordIndex: nextindex})
   }

startGame = () => {
  console.log('hello')
  this.setState({gameStarted: true})
}




 }
  render() {
    return (
      <View style={styles.container}>
      

        

          
        
        <StatusBar hidden={true} />
        <Text style={styles.currentWord}>Mot à dessiner: {this.state.listwords[this.state.currentWordIndex]}</Text>
        <View style={styles.drawContainer}>
        <RNDraw
          containerStyle={{backgroundColor: 'rgba(0,0,0,0.01)'}}
          rewind={(undo) => {this._undo = undo}}
          clear={(clear) => {this._clear = clear}}
          color={this.state.color}
          strokeWidth={this.state.strokeWidth}
        />
       </View>

       <View style={styles.actionContainer}>
          <ColorWheel
          initialColor = {this.state.color}
          onColorChange = {(color) => this.setState({color: color})}
          style={{marginLeft: 20, padding: 40, height: 100, width: 100 }} />

         <TouchableOpacity style={styles.button} onPress={this._undo}><Text>Undo</Text></TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={this._clear}><Text>Clear</Text></TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={this.wordIsFound}><Text>Mot trouvé !</Text></TouchableOpacity>
        </View>

        <View style={{ flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',}}>
          
          {strokes.map((elem) => (
            this.state.strokeWidth == elem 
            ?<TouchableOpacity
            style = {{
              backgroundColor: this.state.activeColor,
              width: elem * 10,
              height: elem * 10,
              borderRadius: 100,
            }} 
            onPress={() => this.setState({strokeWidth: elem})}>
            </TouchableOpacity>
            :<TouchableOpacity 
            
            style = {{
              backgroundColor: this.state.color,
              width: elem * 10,
              height: elem * 10,
              borderRadius: 100,
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
              backgroundColor: '#F5F5F5',
            }}
            disableOnBackPress={false}>
            <View>
            {!this.state.gameStarted && !this.state.wordFound &&
              <View>
                <Text>Mot à dessiner : {this.state.listwords[this.state.currentWordIndex]}</Text>
                <TouchableOpacity onPress={() => this.setState({gameStarted: true})}><Text>Commencer</Text></TouchableOpacity>
              </View>
            }
            {this.state.wordFound &&
              <View>
                <Text>Félicitations !</Text>
                <TouchableOpacity onPress={this.wordIsFound}><Text>Recommencer</Text></TouchableOpacity>
              </View>
            }
            {this.state.wordFail &&
              <View>
                <Text>Dommage !</Text>
                <TouchableOpacity onPress={() => this.setState({gameStarted: false})}><Text>Recommencer</Text></TouchableOpacity>
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
    },
    drawContainer: {
        flex: 2,
        paddingBottom: 20,
    },
    actionContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    button : {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    height: 60,
    marginLeft: 25
    },
    currentWord: {
      fontSize: 18,
    },
    modal: {
      flex: 1,
    }

  
})
