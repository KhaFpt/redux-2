import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useState } from "react";
import auth from '@react-native-firebase/auth';

export default function App(){
    const [email,setmail]=useState('')
    const [pass,setpass]=useState('')

    const signup=()=>{
        auth()
  .createUserWithEmailAndPassword(email, pass)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
    }
    return(
        <View>
            <Text style={st.tx}>Sign in</Text>
            <View style={{width:'80%',alignSelf:"center"}}>
            <Text style={st.tx1}>email:</Text>
            <TextInput style={st.tip} placeholder="Nhập email" onChangeText={(text)=>{setmail(text)}}/>
            <Text style={st.tx2}>password:</Text>
            <TextInput style={st.tip} placeholder="Nhập password" onChangeText={(text)=>{setpass(text)}}/>
            <TouchableOpacity style={st.bt} onPress={signup}>
                <Text style={{color:'white',fontSize:17}}>Đăng nhập</Text>
            </TouchableOpacity>
            <View style={{flexDirection:"row",alignSelf:"center",marginTop:'5%'}}>
                <Text>Didn’t have an account? </Text>
                <Text style={{color:'red'}} >Sign up</Text>
            </View>
            </View>
        </View>
    )
}
const st=StyleSheet.create(
    {
        tx:{
            fontSize:35,textAlign:"center",marginTop:'25%',fontWeight: 'bold'
        },tip:{
            borderWidth:1
        },tx1:{
            marginTop:'10%',marginBottom:'3%'
        },tx2:{
            marginTop:'5%',marginBottom:'3%'
        },bt:{
            backgroundColor: '#F3B412',width:'60%',alignSelf:"center"
            ,marginTop:'7%',alignItems:"center",height:'15%',justifyContent:"center",
            borderRadius:20
        }
    }
)