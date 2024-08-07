import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppBottomTab from "./AppBottomTab"
import AppSignin from "./AppSignin";
import AppSignup from "./AppSignup"
const stack = createNativeStackNavigator();
export default function Appmaster() {
    return (
            <NavigationContainer>
                <stack.Navigator initialRouteName="AppBottomTab">
                    <stack.Screen name="AppSignin" component={AppSignin} options={{headerShown:false}}/>
                    <stack.Screen name="AppSignup" component={AppSignup} options={{headerShown:false}}/>
                    <stack.Screen options={{headerShown:false}} name="AppBottomTab" component={AppBottomTab} />
                </stack.Navigator>
            </NavigationContainer>
    )
}