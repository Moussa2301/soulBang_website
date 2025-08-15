import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Linking, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { colors, fonts } from "../theme";
const videos = require("../data/videos.json");


type VideoItem = { title:string; url:string };

function extractYouTubeId(url:string){
  const patterns = [
    /(?:v=)([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/
  ];
  for (const r of patterns){
    const m = url.match(r);
    if (m && m[1]) return m[1];
  }
  // Si l'utilisateur met déjà l'ID (11 chars)
  if (/^[A-Za-z0-9_-]{11}$/.test(url)) return url;
  return "";
}

const W = Dimensions.get("window").width;
const H = Math.round((W - 24) * 9 / 16); // 16:9

export default function Media(){
  const data = useMemo(()=> (videos as VideoItem[]).map(v=>{
    const id = extractYouTubeId(v.url);
    return {
      title: v.title,
      id,
      embed: id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1` : null,
      original: v.url
    };
  }),[]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={data}
        keyExtractor={(i)=>i.id || i.original}
        contentContainerStyle={{ padding:12, gap:12 }}
        renderItem={({item})=>{
          const blocked = !item.embed;
          return (
            <View style={styles.card}>
              {blocked ? (
                <View style={[styles.fallback,{height:H, alignItems:"center", justifyContent:"center"}]}>
                  <Text style={{color:"#9CA3AF", textAlign:"center", paddingHorizontal:16, fontFamily:fonts.family}}>
                    Vidéo non intégrable. Ouvrir dans YouTube :
                  </Text>
                  <TouchableOpacity onPress={()=>Linking.openURL(item.original)} style={styles.openBtn}>
                    <Text style={{color:"#fff", fontWeight:"800"}}>Ouvrir la vidéo</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <WebView
                  style={{ width:"100%", height:H, backgroundColor:"#000" }}
                  javaScriptEnabled
                  allowsFullscreenVideo
                  allowsInlineMediaPlayback={true}          // iOS: lecture inline
                  mediaPlaybackRequiresUserAction={false}   // laisser l’utilisateur lancer
                  originWhitelist={["*"]}
                  setSupportMultipleWindows={false}
                  onShouldStartLoadWithRequest={(req)=> {
                    // Rester dans l'embed; liens externes -> ouvrir YouTube
                    if (!req.url.startsWith("https://www.youtube.com/embed/")) {
                      Linking.openURL(req.url).catch(()=>{});
                      return false;
                    }
                    return true;
                  }}
                  source={{ uri: item.embed! }}
                />
              )}
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity onPress={()=>Linking.openURL(item.original)}>
                <Text style={styles.link}>Ouvrir sur YouTube</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{ flex:1, backgroundColor: colors.dark },
  card:{ backgroundColor:"#0F1422", borderWidth:1, borderColor:"#1F2937", borderRadius:12, overflow:"hidden" },
  title:{ color:"#fff", fontSize:16, fontWeight:"800", paddingHorizontal:12, paddingTop:12, fontFamily:fonts.family },
  link:{ color:"#60A5FA", paddingHorizontal:12, paddingBottom:12, paddingTop:6, fontWeight:"700" },
  fallback:{ backgroundColor:"#000" },
  openBtn:{ marginTop:10, backgroundColor:"#8B5CF6", paddingVertical:10, paddingHorizontal:14, borderRadius:10 }
});