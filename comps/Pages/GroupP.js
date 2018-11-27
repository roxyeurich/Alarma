
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, } from 'react-native';
import {Camera, Constants, Permissions, Location, ImagePicker, MapView, LinearGradient, Font} from 'expo';
// npm install react-native-dialogbox --save;
//https://www.npmjs.com/package/react-native-dialogbox

import {connect} from 'react-redux';
import {ChangePage, ChangePasscode, ChangeUserId} from '../../redux/actions';

// npm install react-native-table-component
// https://www.npmjs.com/package/react-native-table-component
import NavBar from './NavBar'

class GroupP extends React.Component {
  
  
    handleProfile=()=>{
    this.props.dispatch(ChangePage(4));
    
  };
  
// FETCH DATA FOR THE TASKS*************
  
  state={
    userid:[],
    gname:[],
    pin:[],
    score:[],
    group_id:"",
    group_name:"",
    passcode:"",
    image:null,
    initialPosition:{
     latitude: 49.2485,
     longitude: -123.0014,
     latitudeDelta: 0.9122,
     longitudeDelta: 0.421},
  }


    componentWillMount=()=>{
    this.handleUsers();
    //this.handlePoints();
    this.handleGroupName();
    this.handleGroupPin();
    this.handlePoints();
  }
    
    handleCamera=()=>{
this.props.dispatch(ChangePage(13));
}


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
//      var data = await fs.readFile(results.uri,'base64');
//      var blob = await Blob.build(data, {type: 'image/jpg;BASE64'}); 
//      var ref = storageRef.child('avatar/ava'+this.props.id+'.jpg');
//      var snapshot = await ref.put(blob, 'image/jpg');
//      console.log("fin");

      
    }
  };
    
  handleUsers=async ()=>{
    var fd= new FormData();
      fd.append("group_id", this.props.group_id);
      console.log(this.props.group_id);
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getUsers.php", {
      method:"POST",
      body:fd
    });
      //console.log(resp);
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          userid:json
        });
      } else {
        
      }
    console.log(userid);
  };

 handlePoints=async ()=>{
    /*var fd= new FormData();
      fd.append("user_id", this.props.userid);
      fd.append("group_id", this.props.group_id);
    var resp=await fetch("http://localhost:8888/alarma_DB/getPoints.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          score:json
        });
      } else {
        
      }
    console.log(score);*/
  };


  handleGroupName=async ()=>{
    var fd= new FormData();
      fd.append("group_id", this.props.group_id);
    
    var resp=await
    fetch("https://alarmaproj2.herokuapp.com/getGroupName.php", {
      method:"POST",
      body:fd
    });
    
    var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          gname:json[0].group_name
        });
      } else {
        
      }
    
    console.log(gname);
  };

  handleGroupPin=async ()=>{
    var fd= new FormData();
      fd.append("group_id", this.props.group_id);
    
    var resp=await
    fetch("https://alarmaproj2.herokuapp.com/getGroupName.php", {
      method:"POST",
      body:fd
    });
    
    var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          pin:json[0].passcode
        });
      } else {
        
      }
    
    console.log(pin);
  };
    

  alertIndex(index) {
    Alert.alert(
        

  'Task Title',
  'Task Description',
  [
    {
      text: 'Done task',
      onPress: () => console.log('Done Pressed'),
      style: 'cancel',
    },
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
    },
  ],               
               
               );
  }

      render(){
        const state = this.state;
        var markers = [];
        var allusers=this.state.userid.map((obj, index)=> {
          console.log(obj);
          if(obj.latitude){
            var comp = (
              <MapView.Marker
               coordinate={{
                latitude: parseFloat(obj.latitude),
                longitude: parseFloat(obj.longitude),
                latitudeDelta: 0.9122,
                longitudeDelta: 0.421
              }}
               title={obj.username}
               description="test"
                ></MapView.Marker>
            );
            markers.push(comp)
          }
          
          
          return (
            <TouchableOpacity onPress={() => this.handleOnPress(index)}>
              <View style={{flexDirection:'row'}}>
                <Text>{obj.score}</Text>
                <Text>{" "}{obj.username}</Text>
              </View>
            </TouchableOpacity>
          )
        })
        
        //console.log(markers);
        return ( 
                    
      <View style={styles.container}>
             
            <View style={styles.containerTop}>
               
                {/*-- Back button +  Name of the page + Icon */}
                <TouchableOpacity style={styles.touch} onPress={this.handleProfile}>
                    <Image style={styles.backImg} source={require('../Content/icons/PNG/leftarrow.png')} />
                </TouchableOpacity>
                
                <Text style={styles.title}>{this.state.gname}</Text>
            </View>

            <View style={styles.groupBox}>
            <TouchableOpacity onPress={this._pickImage}>
              <Image 
                   source={(this.state.image) ? {uri:this.state.image} : require('../Content/Imgs/family.jpeg')}
                    style={styles.groupPhoto}
                    resizeMode="cover"
                    
                />
               </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.textBtn}>Group ID: {this.state.pin}</Text>
                </TouchableOpacity>
            </View>
    <View style={{
                flexDirection:'row',
               // backgroundColor:'red', 
                width:300,
                position:'absolute', 
                left:35,
                top:220}}>
            <View style={styles.groupMembers}>
              <View style={{ 
                  borderBottomWidth:1,
                  textAlign:'center', 
                //  backgroundColor:'yellow'
                }}>
              <Text style={{color: 'red', textAlign:'center' }}> Scoreboard </Text>
                </View>
                {allusers}
            </View> 
                     
            <View>
              <MapView
                style={styles.map}
                initialRegion={this.state.initialPosition}
                region={this.state.initialPosition}>
              >
                {markers}
              </MapView>
            </View>          
                      
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#fff',
  },
  
  groupMembers: {
    left:0,
    position:'relative',
    backgroundColor:'rgba(100,100,225,0.05)',
    //borderRightWidth:1,
    //borderColor:'rgba(100,100,225,0.4)',
    width:130,
    height:100,
    top:30,
    zIndex:0,
    marginLeft:40,
  },
  
  membersText: {
    fontSize:20,
    //backgroundColor:'green',
    // flexDirection:'column',
    // paddingTop:90,
    zIndex:2,
    position:'absolute',
    color:'#4B7CB0',
    left:20,
    top:20,
    fontFamily: 'Raleway-Regular',
  },
    
  text: { 
    margin: 6,
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
  },
    
  row: { 
    flexDirection: 'row', 
    backgroundColor: '#E0E8F5',
    height: 50,
    borderColor: '#CEDBEB',
    borderWidth:3
  },
    
  btn: { 
    width: 60, 
    height: 30, 
    backgroundColor: '#F2F6F9',  
    borderRadius: 5,
    borderColor: '#4B7CB0',
    borderWidth:1,
  },   
    
  textBtn: { 
    height: 25,
    width:230,
    color:'#49CBC6',
    fontSize:20,
    position:'relative',
    left:125,
    top:-30,
   // fontFamily: 'Raleway-Regular',
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
    
  dialogBox: {
    position: 'absolute',
    top:0,
    left:34.5,
    marginLeft:0,
    marginTop: 0,
    width: 30,
    height: 30,
  }, 
  
  title: {
    color: 'white',
    marginTop: -65,
    fontSize: 30,
    textAlign: 'center',
   // fontFamily: 'Raleway-Regular',
  },
  
  hamMenu: {
    marginRight:20,
    marginTop: 40,
    width: 30,
    height: 30,
  },
  
  groupBox: {
      bottom: 20,
    },
    
  groupPhoto: {
    marginTop: 10, 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    borderColor: '#49CBC6',
    borderWidth:2,
    top: 20,
    alignSelf: 'stretch',
    marginLeft: 35,
  },
  
  map: {
    width:280, 
    height:120,
    margin: 25,
    top:130,
    left:-150,
  },
  
    
});


function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    group_id:state.Page.group_id,
    userid:state.Page.userid,
    gname:state.Page.gname,
    group_name:state.Page.group_name,
    passcode:state.Page.passcode,
    score:state.Page.score,
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(GroupP);