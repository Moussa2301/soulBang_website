import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { colors, fonts } from "../theme";
const gigs = [
  { id:"t1", city:"Conakry", venue:"Palais du Peuple", date:"2025-10-12" },
  { id:"t2", city:"Paris", venue:"Zénith", date:"2025-11-05" },
  { id:"t3", city:"Bruxelles", venue:"Forest National", date:"2025-11-20" }
];
function fmt(d:string){ try{ return new Date(d).toLocaleDateString("fr-FR",{ day:"2-digit", month:"short", year:"numeric" }); }catch{ return d; } }
export default function Tournee(){
  return (
    <View style={{ flex:1, backgroundColor: colors.dark }}>
      <FlatList
        data={gigs}
        keyExtractor={(i)=>i.id}
        contentContainerStyle={{ padding:12, gap:12 }}
        renderItem={({item})=>(
          <View style={styles.card}>
            <View>
              <Text style={[styles.city,{fontFamily:fonts.family}]}>{item.city} — {item.venue}</Text>
              <Text style={{ color:"#9CA3AF", fontFamily:fonts.family }}>{fmt(item.date)}</Text>
            </View>
            <TouchableOpacity style={styles.btn}><Text style={{ color:"#fff", fontWeight:"800" }}>Billetterie</Text></TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  card:{ backgroundColor:"#0F1422", borderWidth:1, borderColor:"#1F2937", borderRadius:12, padding:12, flexDirection:"row", alignItems:"center", justifyContent:"space-between" },
  city:{ color:"#fff", fontSize:16, fontWeight:"800" },
  btn:{ backgroundColor:colors.primary, paddingVertical:10, paddingHorizontal:14, borderRadius:12 }
});