import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import Loginform from './LoginForm'
import RegisterForm from './RegisterForm'


export default function Auth() {

    const[isLogin, setIsLogin] = useState(true);

    const changeForm = () => {
        setIsLogin(!isLogin);
    }
 
    return(
        //<ScrollView>
            <View style={styles.view}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                {isLogin ? (
                    <Loginform changeForm={changeForm}></Loginform>
                ): 
                    <RegisterForm changeForm={changeForm}></RegisterForm>
                }
            </View>
        //</ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex:1,
        alignItems:'center'
    },
    logo: {
        width:'80%',
        height:100,
        marginTop:50,
        marginBottom:50
    }
}) 