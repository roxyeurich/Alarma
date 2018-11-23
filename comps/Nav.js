import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {connect} from 'react-redux';
import {ChangePage} from '../redux/actions';

import NavBar from './Pages/NavBar';
import NavBar3C from './Pages/NavBar3C';

import Landing from './Pages/Landing';
import Login from './Pages/Login';
import FBlogin from './Pages/FBlogin';
import Createacc from './Pages/Createacc';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Tasks from './Pages/Tasks';
import ChooseG from './Pages/ChooseGroup';
import CreateG from './Pages/CreateG';
import JoinG from './Pages/JoinG';
import CreateTask from './Pages/CreateTask';
import Notifications from './Pages/Notifications';
import GroupP from './Pages/GroupP';
import Camera from './Pages/Camera';
import CreateReward from './Pages/CreateReward';
import Rewards from './Pages/Rewards';
import ChooseAdd from './Pages/ChooseAdd';


import { Svg } from 'expo';

class Nav extends React.Component {
  render(){
    var comp = null;
    var NB = <NavBar />;
    if(this.props.compPage === 0){
      comp = <Landing />;
      NB = null;
    } 
    
    
    if (this.props.compPage === 1){
      comp = <Login />
      NB = null;
    }
    
    if (this.props.compPage === 2){
      comp = <FBlogin />
      NB = null;
    }
    
    if (this.props.compPage === 3){
      comp = <Createacc />
      NB = null;
    }
    
    if (this.props.compPage === 4){
      comp = <Profile />
    }
      
    if (this.props.compPage === 5){
      comp = <Home />
    }
 
    if (this.props.compPage === 6){
       comp = <Tasks group_id={this.props.group_id} />
    }
    
    if (this.props.compPage === 7){
      comp = <ChooseG />
      NB = null;
    }
    
    if (this.props.compPage === 8){
      comp = <CreateG />
      NB = null;
    }
      
    if (this.props.compPage === 9){
      comp = <JoinG />
      NB = null;
    }
      
    if (this.props.compPage === 10){
      comp = <CreateTask group_id={this.props.group_id} /> 
    }
      if (this.props.compPage === 11){
      comp = <Notifications />
    }
      if (this.props.compPage === 12){
      comp = <GroupP />
    }
      if (this.props.compPage === 13){
      comp = <Camera />
    }
      if (this.props.compPage === 14){
      comp = <CreateReward />
    } 
      if (this.props.compPage === 15){
      comp = <Rewards />
    }
      if (this.props.compPage === 16){
      comp = <ChooseAdd />
    }
    
    return(
      <View style={{
        flex:1, 
        justifyContent:"center",
        alignItems:"center",
      }}>
        {comp}
        {NB}
      </View>
    )
  }
}

function mapStateToProps(state){
  
  return{
    group_id:state.Page.group_id,
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Nav);
