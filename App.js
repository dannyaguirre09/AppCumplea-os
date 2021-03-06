import React, { useEffect, useState } from 'react';
import {SafeAreaView, Text, StyleSheet, StatusBar, View, Button } from 'react-native'
import firebase from './src/utils/firebase'
import "firebase/auth"
import Auth from './src/components/Auth'
import ListBirthday from './src/components/ListBirthday'

export default function App() {

  const [user, setUser] = useState(undefined)

  useEffect(() => {    
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    })
  }, []);

  if(useState === undefined) return null; 

  return(
    <>
    <StatusBar barStyle="light-content" />
    <SafeAreaView style={styles.background} > 
      {user ? <ListBirthday user={user} />: <Auth />}      
    </SafeAreaView>
    </>
  )
}


const styles = StyleSheet.create({
  background: {
    backgroundColor: "#15212b",
    height: '100%'
  }
})
