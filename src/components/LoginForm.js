import React, {useState} from 'react'
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native'
import { validateEmail } from "../utils/validations";
import  firebase from "../utils/firebase";


export default function Loginform(props) {

    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValues())
    const [formError, setFormError] = useState({})

    const login = () => {
        let errors = {}
        if(!formData.email || !formData.password){
            if(!formData.email) errors.email = true
            if(!formData.password) errors.password = true
        } else if (!validateEmail(formData.email)){
            errors.email = true;
        } else {
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)            
            .catch(() => {
                setFormError ({email:true, password:true});        
            })
        }

        setFormError(errors);
    }

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    return(
        <>
            <TextInput
                placeholder='Correo Electrónico'
                placeholderTextColor='#969696'
                style={[styles.input, formError.email && styles.error]}
                onChange={(e) => onChange(e, 'email')}
            />

            <TextInput
                placeholder='Contraseña'
                placeholderTextColor='#969696'
                style={[styles.input, formError.password && styles.error]}
                secureTextEntry={true}
                onChange={(e) => onChange(e, 'password')}
            />
            
            <TouchableOpacity onPress={login} >
                <Text style={styles.btnText} >Iniciar Sesión</Text> 
            </TouchableOpacity>

            <View style={styles.register}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText} >Registrate</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

function defaultValues () {
    return{
        email: '',
        password:''
    }
}

const styles = StyleSheet.create({
    btnText: {
        color:'#fff',
        fontSize:15
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
    register:{
        flex:1,
        justifyContent:'flex-end',
        marginBottom:10
    },
    error:{
        borderColor:'#940c0c'
    }
}) 