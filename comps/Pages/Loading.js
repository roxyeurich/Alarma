import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, } from 'react-native';
import {Camera, Permissions, LinearGradient, Facebook, Asset, Font} from 'expo';
import LottieView from 'lottie-react-native';

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';


class Loading extends React.Component {
 handleIntro=()=>{
   this.props.dispatch(ChangePage(19));
 }
  
  render() {
    return (
      
     
  <LinearGradient
      colors={['#49CBC6', '#4B7CB0']}
      style={{width: '100%', height:'100%', alignItems: 'center'}}>
    <TouchableOpacity onPress={this.handleIntro}>
      <View style={styles.container}> 
         
         <LottieView
          source={require('../Content/Imgs/loading.json')}
          style={{width:400, height:400, top:20, left:0, justifyContent: 'center',}}
          autoPlay
          loop
        />
        
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
    textAlign: 'center',
  },
  
});



function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Loading);