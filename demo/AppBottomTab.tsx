import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import AppVietghichu from "./AppVietghichu";
import AppSignin from "./AppSignin";
import AppSignup from "./AppSignup"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppVietnhatky from "./AppVietnhatky";

const Tab = createMaterialTopTabNavigator();
export default function App1(){

    return(
        <View style={{flex:1}}>
            <NavigationContainer independent={true}>
            <Tab.Navigator initialRouteName="Home" >
<Tab.Screen name="Home" component={Home}/>
<Tab.Screen name="AppVietghichu" component={AppVietghichu}/>
<Tab.Screen name="AppVietnhatky" component={AppVietnhatky}/>
            </Tab.Navigator>
            </NavigationContainer>   
        </View>
    )
}