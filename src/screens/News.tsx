import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Linking } from "react-native";
import { colors, fonts } from "../theme";
const data=[{id:"n1",title:"Lancement capsule Urban Roots",date:"2025-09-15",image:"https://picsum.photos/seed/ur/800/500",url:"https://example.com/urban-roots"},
{id:"n2",title:"Concert Conakry annoncé",date:"2025-10-12",image:"https://picsum.photos/seed/ck/800/500",url:"https://example.com/conakry-live"},
{id:"n3",title:"Collab fashion ‘Bang’s Attitude’",date:"2025-11-02",image:"https://picsum.photos/seed/fa/800/500",url:"https://example.com/collab"}];
function fmt(d:string){ try{return new Date(d).toLocaleDateString("fr-FR",{day:"2-digit",month:"short",year:"numeric"});}catch{return d;} }
export default function News(){
  return (<View style={{flex:1,backgroundColor:colors.dark}}>
    <FlatList data={data} keyExtractor={i=>i.id} contentContainerStyle={{padding:12,gap:12}}
      renderItem={({item})=> (<View style={styles.card}>
        <Image source={{uri:item.image}} style={{width:"100%",height:160}}/>
        <View style={{padding:12}}>
          <Text style={{color:colors.primary,fontSize:12,fontFamily:fonts.family}}>{fmt(item.date)}</Text>
          <Text style={{color:"#fff",fontSize:16,fontWeight:"800",marginTop:4,fontFamily:fonts.family}}>{item.title}</Text>
          <TouchableOpacity onPress={()=>Linking.openURL(item.url)} style={{marginTop:10}}><Text style={{color:"#93C5FD",fontFamily:fonts.family}}>Lire la suite →</Text></TouchableOpacity>
        </View></View>)}
    /></View>);
}
const styles=StyleSheet.create({ card:{backgroundColor:"#0F1422",borderWidth:1,borderColor:"#1F2937",borderRadius:12,overflow:"hidden"} });