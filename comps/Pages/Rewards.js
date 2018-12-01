import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, Timer, Font } from 'react-native';

import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';


import NavBar from './NavBar'

class Rewards extends React.Component {
  
  
timer = null;

state={
  rewards:[],
  reward_title:"",
  reward_points:0,
  score:0,
}
  
  handleProfile=()=>{
    this.props.dispatch(ChangePage(4));
  }
    
  handleAlert=()=>{
    this.props.dispatch(ChangePage(5));
  }
  
  componentWillMount=()=>{
    this.handleRewards();
    /*this.timer = setInterval(()=>{
      this.handleRewards();
    },1000);*/
  }
  
  componentWillUnmount=()=>{
    clearInterval(this.timer);
  }
      
  handleRewards=async ()=>{
    
    var fd= new FormData();
    fd.append("id", this.props.userid);
      
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getScore.php", {
      method:"POST",
      body:fd
    });
    //console.log(resp);
    var json=await resp.json();
    var score = 0;
    if (json.length > 0) {
      score = parseInt(json[0].score);
    }
    
    var fd= new FormData();
     //change id to group_id
      fd.append("group_id", this.props.group_id);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getReward.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        //json.id 
        //alert ("Task Created");
        this.setState({
          rewards:json
        });
        
        //get reward_title when reaching reward_points
        var str = json.map((obj)=>{
          return obj.reward_title;
        });
        
        //rewardPts = this.state.reward_points;
        //newreward = false;
        console.log("score", score);
        var titles = [];
        
        var filter = json.filter((obj,index)=>{
          if(score >= parseInt(obj.reward_points)){
             titles.push(obj.reward_title)
             }
          return (score >= parseInt(obj.reward_points))
        });
        
        if (filter.length > 0){
          alert("You have received reward(s): "+titles.join(", "));
          //newreward = true;
          
          //make it disappear
        }
        
      } else {
        
      }
  }
renderRewards=(rewards)=> {

   var rewards = rewards || [];
  
   return rewards.map((reward,index) => 
     <View style={styles.taskCont} key={reward.id}>
     
<View style={styles.contTitle}>
    <Text style={styles.taskName}>{reward.reward_title}</Text>
  </View>
  
  <View style={styles.contDesc}>       
    <ScrollView>

      <Text style={styles.taskDesc}>    
          {reward.reward_points} points
      </Text>
    </ScrollView>
  </View>
     
    </View>
   );
 }      

  render() {
    return (
      <View style={styles.container}>
       
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.touch} onPress={this.handleProfile}>
            <Image style={styles.backImg} source={require('../Content/icons/PNG/leftarrow.png')} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Rewards</Text>
        </View>

        <View style={styles.middleContainer}>
          <ScrollView>
           {this.renderRewards(this.state.rewards)}
          </ScrollView>
      </View>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  
  containerTop: {
    marginTop:0,
    backgroundColor: '#49CBC6',
    top: 0,
    width:412,
    height:100,
  },
  
  touch: {
    width: 80,
    height: 100,
    zIndex: 10,
  },
  
  backImg: {
   marginLeft:40,
    marginTop: 40,
    width: 30,
    height: 30,
  },
  
  title: {
    color: 'white',
    marginTop: -65,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
  },
  
  hamMenu: {
    marginRight:20,
    marginTop: 40,
    width: 30,
    height: 30,
  },
  
  taskName: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
    textAlign: 'left',
    marginTop: 10,
    fontFamily: 'Raleway-Regular',
  },
  
  taskDesc: {
    fontSize: 16,
    marginTop: 0,
    textAlign: 'right',
    marginRight: 10,
    fontFamily: 'Raleway-Regular',
    zIndex:20,
  },
  
  middleContainer: {
    marginTop:20,
    height:'70%',
  },
  
  textLabel: {
    color: 'black',
    fontSize: 20,
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginTop: 5,
    marginBottom: -5,
    fontFamily: 'Raleway-Regular',
  },
  
  taskCont: {
    height: 67,
    width: 350,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#49CBC6',
    padding: 10,
    borderRadius: 8,
  },
  
  textBut: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Raleway-Regular',
  },  
});


function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    group_id:state.Page.group_id,
    userid:state.Page.userid
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Rewards);