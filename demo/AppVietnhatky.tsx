import { useEffect, useState } from "react";
import { Alert, Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';

export default function AppVietnhatky(){
    const [visible,setvisible]=useState(false)
    const [visibl,setvisibl]=useState(false)
    const [content,setcontent]=useState('')
    const [list,setlist]=useState([])
    const [select,setselect]=useState('')

    useEffect(() => {
        const subscriber = firestore()
          .collection('viết nhật ký')
          .onSnapshot(querySnapshot => {
            const users = [];
      
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setlist(users);
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, [list]);

    const add=()=>{
        firestore()
        .collection('viết nhật ký')
        .add({
          content: content
        }).then((docRef)=>{
            return docRef.set({
                content:content,
                id:docRef.id
            })
        })
        .then(() => {
          console.log('User added!');
          setcontent('')
          setvisible(false)
        });
    }

    const sua=()=>{
        firestore()
        .collection('viết nhật ký')
        .doc(select.id)
        .update({
          content:content
        })
        .then(() => {
          console.log('User updated!');
          setcontent('')
          setvisibl(false)
        });
    }

    const xoa=(item)=>{
        Alert.alert('Thông báo','bạn có muốn xóa',[
            {
                text:'Ok',
                onPress:()=>{
                    firestore()
                    .collection('viết nhật ký')
                    .doc(item.id)
                    .delete()
                    .then(() => {
                      console.log('User deleted!');
                    }); 
                }
            },{
                text:'Hủy',
                style:'cancel'
            }
        ])
    }

    const render = ({ item }) => {
        return (
            <View style={st.g}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginStart: '5%', marginEnd: '5%' }}>
                    <Text style={st.g1}>Nội dung: {item.content}</Text>
                    <Text style={{ padding: '1%', color: '#FF0000' }} onPress={() => open(item)}>Sửa</Text>
                </View>
                <Button title="Xóa" onPress={() => xoa(item)} />
            </View>
        )
    }

    const open=(item)=>{
        setvisibl(true)
        setcontent(item.content)
        setselect(item)
    }
    return(
        <View style={{flex:1}}>
             <Text style={st.g2}>10 Điều biết ơn</Text>
            <View style={st.a}>
                <TouchableOpacity >
                    <Image source={require('./img/search.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./img/more.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList 
                data={list}
                renderItem={render}/>
            </View>
            <TouchableOpacity style={st.b} onPress={()=>setvisible(true)}>
                <Image source={require('./img/no.png')} />
            </TouchableOpacity>

            <Modal visible={visible}>
                <View style={st.c}>
                <Text style={st.e}>Viết lời biết ơn</Text>
                <Text>Nội Dung:</Text>
                <TextInput style={st.d}  onChangeText={(txt)=>setcontent(txt)}/>
                <View style={st.f}>
                <Button title="Thêm"onPress={add}/>
                <Button title="Hủy" onPress={()=>setvisible(false)}/>
                </View>
                </View>
            </Modal>

            <Modal visible={visibl}>
                <View style={st.c}>
                <Text style={st.e}>Viết lời biết ơn</Text>
                <Text>Nội Dung:</Text>
                <TextInput style={st.d} value={content} onChangeText={(txt)=>setcontent(txt)}/>
                <View style={st.f}>
                <Button title="Sửa"onPress={sua}/>
                <Button title="Hủy" onPress={()=>{setvisibl(false), setcontent('')}}/>
                </View>
                </View>
            </Modal>
        </View>
    )
}

const st = StyleSheet.create(
    {
        a: {
            flexDirection: "row", justifyContent: "flex-end", marginTop: '3%', marginEnd: '2%'
        }, b: {
            position: 'absolute',
            bottom: 0,
            right: 0, justifyContent: "center", marginBottom: '2%', marginRight: '4%',
            backgroundColor: 'red', borderRadius: 40, width: '13%', height: '7%', alignItems: "center"
        }, c: {
            width: '85%', alignSelf: "center", marginTop: '10%'
        }, d: {
            borderWidth: 1, borderRadius: 10, marginTop: '3%'
        }, e: {
            fontSize: 30, fontWeight: "bold", textAlign: "center"
        }, f: {
            marginTop: '5%', width: '70%', alignSelf: "center"
        }, g: {
            borderWidth: 1, borderRadius: 10, width: '90%', alignSelf: "center", marginTop: '3%'
        }, g1: {
            padding: '1%'
        }, g2: {
            fontWeight: "bold", fontSize: 30, textAlign: "center", marginTop: '5%'
        }
    }
)