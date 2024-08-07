import { Alert, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useState } from "react";
import auth, { firebase } from '@react-native-firebase/auth';

import { signInWithEmailAndPassword, sendPasswordResetEmail, } from "firebase/auth";
export default function AppSignin(props) {

    const [email, setmail] = useState('')
    const [pass, setpass] = useState('')
    const [visible, setvisible] = useState(false)

    const signup = () => {
        props.navigation.navigate('AppSignup')
    }
    const signin = () => {
        auth().
            signInWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                Alert.alert('succesfull')
                props.navigation.navigate('AppBottomTab')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const forgotPassword = (email) => {

        console.log("reset email sent to " + email);
        auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("reset email sent to " + email);
            })
            .catch(function (e) {
                console.log(e);
            });
    };

    // const send=()=>{
    //     forgotPassword = (email) => {
    //         firebase.auth().sendPasswordResetEmail(email)
    //           .then(function (user) {
    //             Alert.alert('Please check your email...')
    //           }).catch(function (e) {
    //             console.log(e)
    //           })
    //       }
    // }
    return (
        <View>
            <Text style={st.tx}>Sign in</Text>
            <View style={{ width: '80%', alignSelf: "center" }}>
                <Text style={st.tx1}>email:</Text>
                <TextInput style={st.tip} placeholder="Nhập email" onChangeText={(text) => { setmail(text) }} />
                <Text style={st.tx2}>password:</Text>
                <TextInput style={st.tip} placeholder="Nhập password" onChangeText={(text) => { setpass(text) }} />
                <TouchableOpacity style={st.bt} onPress={signin}>
                    <Text style={{ color: 'white', fontSize: 17 }}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignSelf: "center", marginTop: '5%' }}>
                    <Text>Didn’t have an account? </Text>
                    <Text style={{ color: 'red' }} onPress={signup}>Sign up</Text>
                </View>
                <Text onPress={() => setvisible(true)}>Bạn quên mật khẩu</Text>
            </View>
            <Modal visible={visible}>
                <Text>Nhap email:</Text>
                <TextInput onChangeText={(txt) => setmail(txt)} />
                <Button title="OK" onPress={() => forgotPassword(email)} />
                <Button title="Huy" onPress={() => setvisible(false)} />
            </Modal>
        </View>
    )
}
const st = StyleSheet.create(
    {
        tx: {
            fontSize: 35, textAlign: "center", marginTop: '25%', fontWeight: 'bold'
        }, tip: {
            borderWidth: 1
        }, tx1: {
            marginTop: '10%', marginBottom: '3%'
        }, tx2: {
            marginTop: '5%', marginBottom: '3%'
        }, bt: {
            backgroundColor: '#F3B412', width: '60%', alignSelf: "center"
            , marginTop: '7%', alignItems: "center", height: '15%', justifyContent: "center",
            borderRadius: 20
        }
    }
)