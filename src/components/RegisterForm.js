import React, {useState} from 'react'
import { Text, StyleSheet, TouchableOpacity, TextInput, View } from 'react-native'
import {validateEmail} from '../utils/validations'
import firebase from '../utils/firebase'


export default function Registerform(props) {

    const { changeForm } = props;
    const [formData, setFormData] = useState(defualtValues())
    const [formError, setFormError] = useState({})

    const register = () => {        
        let errors = {};
        if(!formData.email || !formData.password || !formData.repeatPassword){
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
            if(!formData.repeatPassword) errors.repeatPassword = true;
        }else if (!validateEmail(formData.email)) {
            errors.email = true;
        }else if (formData.password !== formData.repeatPassword){
            errors.password = true;
            errors.repeatPassword = true;
        }else if(formData.password.length < 6) {
            errors.password = true;
            errors.repeatPassword = true;
        }else {
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(() => {
                console.log('Cuenta Creada')
            }).catch(() => {
                setFormError({email:true, password:true, repeatPassword:true})
            })
        }
        setFormError(errors)
    }
 
    return(
        <>
            <TextInput
                style={[styles.input, formError.email && styles.error]}
                placeholder='Correo Electrónico'
                placeholderTextColor='#969696'
                onChange={e => setFormData({ ...formData, email: e.nativeEvent.text })}
            />

            <TextInput
                secureTextEntry={true}
                style={[styles.input, formError.password && styles.error]}
                placeholder='Contraseña'
                placeholderTextColor='#969696'
                onChange={e => setFormData({ ...formData, password: e.nativeEvent.text })}
            />

            <TextInput
                secureTextEntry={true}
                style={[styles.input, formError.repeatPassword && styles.error]}
                placeholder='Repetir Contraseña'
                placeholderTextColor='#969696'
                onChange={e => setFormData({ ...formData, repeatPassword: e.nativeEvent.text })}
            />

            <TouchableOpacity onPress={register} >
                <Text style={styles.btnText} >Registrate</Text>
            </TouchableOpacity>


            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm} >
                    <Text style={styles.btnText} >Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

function defualtValues(){
    return{
        email: '',
        password:'',
        repeatPassword:''
    }
}

const styles = StyleSheet.create({
    btnText: {
        color:'#fff',
        fontSize:18
    },
    input:{
        height:45,
        color:'#fff',
        width:'80%',
        marginBottom:25,
        backgroundColor:'#1e3040',
        paddingHorizontal:20,
        borderRadius:50,
        fontSize:14,
        borderWidth:1,
        borderColor:'#1e3040'
    },
    login:{
        flex:1,
        justifyContent:'flex-end',
        marginBottom:10
    },
    error:{
        borderColor:'#940c0c'
    }
}) 