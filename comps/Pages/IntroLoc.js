import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, } from 'react-native';
import {Camera, Permissions, LinearGradient, Facebook, Asset, Font} from 'expo';
import LottieView from 'lottie-react-native';

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';


class IntroLoc extends React.Component {
 handleIntro=()=>{
   this.props.dispatch(ChangePage(20));
 }
  
  render() {
    return (
      
   
  <LinearGradient
      colors={['#49CBC6', '#4B7CB0']}
      style={{width: '100%', height:'100%', alignItems: 'center'}}>
    <TouchableOpacity onPress={this.handleIntro}>
      <View style={styles.container}> 
        
         <Text style={styles.titleAlarma} ><Text style={{fontSize:65}}>A</Text>LARMA</Text>
        
         <LottieView
          source={require('../Content/Imgs/location.json')}
          style={{width:180, height:180, top:50, left:0, justifyContent: 'center',}}
          autoPlay
          loop
        />
        
        <View style={styles.buttonContainer}>   

             <Text style={styles.textBut}>Locate your group members in the map and get automatically notified of your tasks when close to your home location!</Text>
          
        </View>
      </View>
  </TouchableOpacity>
</LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  
  titleAlarma: {
    color: 'white',
    top: 150,
    fontSize: 50,
    fontFamily: 'Raleway-Regular',
    textAlign:'center',
  },

  buttonContainer: {
    top:-100,
    width: 300,
    height: 200,
    justifyContent: 'center',
    
  },
  
  textBut: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Raleway-Regular',
    lineHeight:30,
    top:220,
    textAlign:'center',
  },
  
});



function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(IntroLoc);