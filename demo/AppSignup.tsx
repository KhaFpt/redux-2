import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from '@react-native-firebase/auth';
import { useState } from "react";


export default function AppSignup(props){
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [pass,setpass]=useState('')

    const validateEmail = (email) => {
    const regex = /^[^\s@]+@gmail\.com$/;
    return regex.test(email);
};
    const signin=()=>{
        if (!email || !pass ||password.length<7 ) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Email must be in the format @gmail.com.');
            return;
        }else{
        auth().
createUserWithEmailAndPassword(email, pass)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }}
    return(
        <View>
            <TouchableOpacity onPress={()=>props.navigation.navigate('AppSignin')}>
            <Image source={require('./img/back.png')} style={st.img} />
            </TouchableOpacity>
            <Text style={st.tx}>
                Sign up
            </Text>
            <View style={{width:'80%',alignSelf:"center"}}>
            <Text style={st.tx1}>email:</Text>
            <TextInput style={st.tip} placeholder="Nhập email" onChangeText={(text)=>{setemail(text)}}/>
            <Text style={st.tx2}>password:</Text>
            <TextInput style={st.tip} placeholder="Nhập password" onChangeText={(text)=>{setpassword(text)}}/>
            <Text style={st.tx2}>password:</Text>
            <TextInput style={st.tip} placeholder="Nhập password" onChangeText={(text)=>{setpass(text)}}/>
            <TouchableOpacity style={st.bt} onPress={signin}>
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
     fontSize:35,textAlign:"center",marginTop:'20%',fontWeight: 'bold'
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
},img:{
    marginStart:'3%',marginTop:'5%'
}
    }
)