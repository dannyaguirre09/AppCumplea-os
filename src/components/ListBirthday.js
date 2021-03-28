import React, {useEffect, useState} from 'react'
import { View, StyleSheet,  ScrollView, Alert } from 'react-native'
import ActionBar from './ActionBar'
import AddBirthday from './AddBirthday'
import firebase from '../utils/firebase'
import 'firebase/firestore'
import moment from 'moment'
import Birthday from './Birthday'

firebase.firestore().settings({experimentalForceLongPolling:true})
const db = firebase.firestore(firebase);

export default function ListBirthday(props) {

    const {user} = props    
    const [showList, setShowList] = useState(true);
    const [birthday, setBirthday] = useState([]);
    const [passBirthday, setPassBirthday] = useState([]);
    const [reloadData, setReloadData] = useState(false);

    const deleteBirthday = (birthday) => {
        Alert.alert(
            'Eliminar', 
            '¿Está seguro que desea eliminar el registro?',
            [
                {
                    text:'Cancelar',
                    style:'cancel'
                },
                {
                    text:'Eliminar',
                    onPress: () => {
                        db.collection(user.uid)
                        .doc(birthday.id)
                        .delete()
                        .then(() => setReloadData(true))                        
                    }
                }
            ],
            {cancelable:false}
        )
    }

    useEffect(() => {
        setBirthday([]);
        setPassBirthday([]);
        db.collection(user.uid)
        .orderBy('dateBirth', 'asc')
        .get()
        .then((response) => {
            const itermArray = [];
            response.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                itermArray.push(data);
            });   
            formatData(itermArray)         
        })
        .catch(() => {})
        setReloadData(false); 
    }, [reloadData]);  

    const formatData = (items) => {
        const currenDate = moment().set({
            hour:0,
            minute:0,
            second:0,
            millisecond:0
        });
        const birthDayTempArray = [];
        const passBirthDayTempArray = [];
        items.forEach((item) => {
            const dateBirth = new Date(item.dateBirth.seconds * 1000 )
            const dateBirthDay = moment(dateBirth);
            const currentYear = moment().get('year');
            dateBirthDay.set({year: currentYear}) 

            const diffDate = currenDate.diff(dateBirthDay, 'days'); 
            const itemsTemp = item;
            itemsTemp.dateBirth = dateBirthDay;
            itemsTemp.days = diffDate;            
            if(diffDate <= 0){
                birthDayTempArray.push(itemsTemp);
            } else {
                passBirthDayTempArray.push(itemsTemp);
            }            
        })
        setBirthday(birthDayTempArray);
        setPassBirthday(passBirthDayTempArray);
    }
    
    return(
        <View style={styles.container}>
            {showList ? 
            (
                <ScrollView style={styles.ScrollView}>
                    {birthday.map((item, index) => {
                        return (
                            <Birthday key={index} birthday={item} deleteBirthday={deleteBirthday} ></Birthday>
                        )
                    })}
                   
                   {passBirthday.map((item, index) => {
                        return (
                            <Birthday key={index} birthday={item} deleteBirthday={deleteBirthday} ></Birthday>
                        )
                    })}

                </ScrollView>                
            ):
            (
                <>
                    <AddBirthday user={user} setReloadData={setReloadData} setShowList={setShowList} />
                </>
            )
        
        }          
            <ActionBar showList={showList} setShowList={setShowList}></ActionBar>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        height:'100%'
    },
    ScrollView:{
        marginBottom:50,
        width:'100%'
    }
}) 