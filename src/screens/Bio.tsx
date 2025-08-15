import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { colors, fonts } from "../theme";
export default function Bio(){
  return (
    <ScrollView style={{ flex:1, backgroundColor: colors.dark }} contentContainerStyle={{ padding:16 }}>
      <Image source={{ uri:"https://picsum.photos/seed/soul-bio/800/800" }} style={{ width:"100%", height:260, borderRadius:12 }}/>
      <Text style={{ color:"#fff", fontSize:22, fontWeight:"800", marginTop:12, fontFamily:fonts.family }}>Biographie</Text>
      <Text style={{ color:"#D1D5DB", marginTop:8, lineHeight:20, fontFamily:fonts.family }}>
        Soul Bang's, artiste pluridisciplinaire, mêle hip-hop, soul et influences africaines.
        Son univers s'étend à la mode avec la marque “Bang's Attitude”. (Texte fictif)
      </Text>
      <Text style={{ color:"#9CA3AF", marginTop:8, fontFamily:fonts.family }}>
        Prix & scènes : Victoires locales, tournées internationales, collaborations panafricaines. (Fictif)
      </Text>
    </ScrollView>
  );
}