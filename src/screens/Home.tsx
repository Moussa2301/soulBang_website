import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { colors, fonts } from "../theme";
export default function Home(){
  return (
    <ScrollView style={{ flex:1, backgroundColor: colors.dark }} contentContainerStyle={{ padding:16 }}>
      <View style={styles.hero}>
        <Image source={{ uri:"https://picsum.photos/seed/soul-hero/900/600" }} style={styles.heroImg}/>
        <View style={styles.overlay}/>
        <Text style={[styles.title,{fontFamily:fonts.family}]}>SOUL BANG'S</Text>
        <Text style={[styles.subtitle,{fontFamily:fonts.family}]}>Artiste · Créateur · Visionnaire</Text>
      </View>
      <View style={{ height:16 }}/>
      <View style={styles.row}>
        <TouchableOpacity style={styles.tile}><Text style={styles.tileTxt}>Médias</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tile}><Text style={styles.tileTxt}>Boutique</Text></TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.tile}><Text style={styles.tileTxt}>Tournée</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tile}><Text style={styles.tileTxt}>Actualités</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  hero:{ position:"relative", borderRadius:16, overflow:"hidden" },
  heroImg:{ width:"100%", height:220 },
  overlay:{ ...StyleSheet.absoluteFillObject, backgroundColor:"rgba(0,0,0,0.35)" },
  title:{ position:"absolute", left:16, bottom:56, color:"#fff", fontSize:28, fontWeight:"900" },
  subtitle:{ position:"absolute", left:16, bottom:24, color:"#E5E7EB", fontSize:14 },
  row:{ flexDirection:"row", gap:12, marginTop:12 },
  tile:{ flex:1, backgroundColor:"#0F1422", borderWidth:1, borderColor:"#1F2937", borderRadius:12, alignItems:"center", justifyContent:"center", paddingVertical:24 },
  tileTxt:{ color:"#fff", fontWeight:"800" }
});