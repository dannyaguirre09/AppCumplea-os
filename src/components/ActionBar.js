import React, {useState} from 'react'
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native'
import firebase from '../utils/firebase'


export default function ActionBar(props) {

    const { showList, setShowList} = props;

    return(
        <View style={styles.viewFooter}>
            <View style={styles.viewClose}>
                <Text style={styles.text} onPress={() => firebase.auth().signOut()} >Cerrar Sesión</Text>
            </View>
            <View style={styles.viewAdd}>
                <Text style={styles.text} onPress={() => setShowList(!showList)} >                    
                    {showList ? "Nueva Fecha": "Cancelar"}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewFooter: {
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        width:'100%',
        height:50,
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:10,
        paddingLeft:10,
        marginBottom:20
    },
    viewClose:{
        backgroundColor:'#820000',
        borderRadius:50,
        paddingVertical:10,
        paddingHorizontal:30
    },
    text:{
        fontSize:12,
        color:'#fff',
        textAlign:'center'
    },
    viewAdd:{
        backgroundColor:'#1ea1f2',
        borderRadius:50,
        paddingVertical:10,
        paddingHorizontal:30
    }
}) 