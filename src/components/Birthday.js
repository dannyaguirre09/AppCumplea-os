import React, {useEffect, useState} from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import ActionBar from './ActionBar'
import AddBirthday from './AddBirthday'
import firebase from '../utils/firebase'
import 'firebase/firestore'
import moment from 'moment'


export default function Birthday(props) {
   
    const { birthday, deleteBirthday } = props    
    const pasat = birthday.days > 0 ? true: false;

    

    const infoDay = () => {
        if(birthday.days === 0){
            return(
                <Text style={styles.userName}>Es su cumpleaños</Text>
            )
        } else {
            const days = birthday.days * (-1)             
            return(
                <View>
                    <Text style={styles.userName}>{days} { days === 1 ? 'Día': 'Días' }</Text>  
                </View>
                
            )
        }
    }

    return(
        <TouchableOpacity onPress={() => deleteBirthday(birthday)} style={[styles.card, pasat ? styles.pasat : birthday.days===0 ? styles.actual : styles.current]} >
            <Text style={styles.userName}>{birthday.name} {birthday.lastname}</Text>
            {pasat ? <Text style={styles.userName}>Pasado</Text>:  infoDay() }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:60,
        alignItems:'center',
        paddingHorizontal:10,
        margin:10,
        borderRadius:15
    },
    pasat:{
        backgroundColor:'#820000'
    },
    current:{
        backgroundColor:'#1ae1f2'
    },
    actual:{
        backgroundColor:'#559204'
    },
    userName:{
        color:'#fff',
        fontSize:12,
    }
}) 