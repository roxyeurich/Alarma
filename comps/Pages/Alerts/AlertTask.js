import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {LinearGradient} from 'expo';
import { Rating } from 'react-native-ratings';
import {ChangePage, ChangeUserId} from '../../../redux/actions';


// npm install react-native-linear-gradient --save

class AlertTask extends Component {
    
      constructor(props) {
      super(props);
  }
     state={
        bgOpacity: 1,
        opacityOne:0,
        tasks:[],
        isChecked:[],
        userid:"",
        score:0,
        end_time:"",
    }

HandleOpacity=()=>{
    this.setState({
        bgOpacity:this.state.opacityOne

        
    })
    
    
}     
      
       componentWillMount=()=>{
    this.handleTasks();
  }
          
   handleTasks=async ()=>{
    var fd= new FormData();
     //change id to group_id
      fd.append("group_id", this.props.group_id);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getTask.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        //json.id 
        //alert ("Task Created");
        this.setState({
          tasks:json
      
        });
      } else {
        
      }
  }
   
   
      
renderTasks=(tasks)=> {

   var tasks = tasks || [];
  
   return tasks.map((task,index) => 
     <View style={styles.taskCont} key={task.task_id}>

                        
    {/*Adding the AlertTask for the description*/}
                        
      <TouchableOpacity onPress={() => {
            this.setModalVisible(true);
          }}>

          <View style={styles.contTitle}>
            <Text style={styles.taskName}>{task.task_title}</Text>
              <Text style={styles.taskName}>{task.task_description}</Text>
          </View>
      </TouchableOpacity>
{/* <View style={styles.contDesc}>
        <Text style={styles.taskDesc}>{task.task_description}</Text>*/}
    
    
        <Text>{task.end_time.split(" ")[0]}</Text>

        
      <Text style={styles.starStyle}>
          <Rating
           type="star"
           ratingColor='#3498db'
           ratingBackgroundColor='#c8c7c8'
            ratingCount={5}
            startingValue={task.score}
            readonly= {true}
            imageSize={20}
            style={{ paddingVertical: 10, }}
          /> 
        </Text>
   
     </View>
                        
                    
   );
 }   
      
     

  
  render() {
    return (
       

            
            
          <View style={{  justifyContent: 'center',
            width:400,
            height:500,
            opacity:this.state.bgOpacity,
            position:'relative',
            top:100,
            backgroundColor:'rgba(0, 0, 0, 0.5)',
                
                       }}
              
              >
                <LinearGradient 
                        start={{ x: 0, y: 0.35 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#49CBC6','#2d9f9b', '#4B7CB0']} 
                        style={styles.linearGradient}>
  
                 <View style={styles.taskText}>
                     
                     {/*
                        <Text style={styles.taskTitle}>fuck</Text>
                        <Text style={styles.taskDue}>{this.state.end_time}</Text>
                        <Text style={styles.stars}>**insert Stars Here**</Text>
                        <Text style={styles.taskDisc}>Task Description</Text>
                     */}
                       <View style={{width:100, height:100, backgroundColor:'red'}}> {this.renderTasks(this.state.tasks)}</View>
                    <TouchableOpacity style={styles.button}>
                        <Text
                             style={styles.butText}>
                            Done Task</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={this.HandleOpacity}
                            style={styles.button}>
                                <Text 
                                    style={styles.butText}
                                    >
                                Cancel</Text>
                        </TouchableOpacity>
                   
            </View>
         
              </LinearGradient>
          </View>

    );
  }
}

const styles = StyleSheet.create({
    
container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:0,
  
  },
    
alertBox: {
  
},
                                 
linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    width:300,
    position: 'absolute',
    top:95,
    left:38,
    borderRadius: 5,
    
    },
                                 
contTitle: {
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    width:290,
    height:300,
    margin:5,
    borderRadius: 5,
    },                             
taskText: {
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    width:290,
    height:300,
    margin:5,
    borderRadius: 5,
    },
    
taskTitle: {
   fontSize:25,
        marginTop:7,


    
    },    
taskDue: {
    fontSize:15,
    color: 'grey',
    marginTop:7,

    
    },
    
taskDesc: {
   fontSize:25,
    marginTop:15,

    
    },                                 
 
    
button: {
    borderWidth: 2,
    borderColor:'rgba(150, 150, 150, 0.5)',
    borderRadius: 5,
    backgroundColor: '#49CBC6',
    width:250,
    marginTop:30,
    
    

    
},                              
    
butText: {
    height:38,
    fontSize:20,
    position:'relative',
    top:6,
    color:'white', 
    textAlign:'center',


    
},                              

    
    
});



function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    admin:parseInt(state.Page.admin)
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(AlertTask);