import React, { useMemo, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { colors, fonts } from "../theme";
import products from "../data/products.json";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useCart } from "../state/cart";
import { useToast } from "../state/toast";

type Product = { id:string; name:string; tag:string; category:string; price:number; images:string[] };
function fmt(n:number){ try{return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"}).format(n);}catch{return n.toFixed(2)+" €";} }
const W = Dimensions.get("window").width;

export default function ProductDetail(){
  const route=useRoute<any>(); const nav=useNavigation<any>(); const toast=useToast();
  const { add }=useCart();
  const id = route.params?.productId as string;
  const product = useMemo(()=> (products as Product[]).find(p=>p.id===id),[id]);
  const [size,setSize]=useState<string|null>(null); const [color,setColor]=useState<string|null>(null);
  const sizes=["S","M","L","XL"]; const colorsOpt=["Noir","Or","Blanc"];
  const [idx,setIdx]=useState(0);

  if(!product) return <View style={{flex:1,backgroundColor:colors.dark,alignItems:"center",justifyContent:"center"}}><Text style={{color:"#fff"}}>Produit introuvable.</Text></View>;
  return (
    <ScrollView style={{flex:1,backgroundColor:colors.dark}}>
      {/* Carrousel */}
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
        onScroll={(e)=>{ const v=e.nativeEvent.contentOffset.x; setIdx(Math.round(v/W)); }}
        scrollEventThrottle={16}>
        {product.images.map((u,i)=>(
          <Image key={i} source={{uri:u}} style={{width:W,height:360}}/>
        ))}
      </ScrollView>
      {/* Indicateurs */}
      <View style={{flexDirection:"row",justifyContent:"center",gap:6,marginTop:8}}>
        {product.images.map((_,i)=>(
          <View key={i} style={{width:8,height:8,borderRadius:999,backgroundColor:i===idx?colors.primary:"#374151"}}/>
        ))}
      </View>

      <View style={{padding:16}}>
        <Text style={{color:"#9CA3AF",marginBottom:4,fontFamily:fonts.family}}>{product.tag} • {product.category}</Text>
        <Text style={{color:"#fff",fontSize:22,fontWeight:"800",fontFamily:fonts.family}}>{product.name}</Text>
        <Text style={{color:colors.primary,fontSize:18,marginTop:6,fontFamily:fonts.family}}>{fmt(product.price)}</Text>
        <Text style={{color:"#9CA3AF",marginTop:16,fontFamily:fonts.family}}>Taille</Text>
        <View style={{flexDirection:"row",gap:8,marginTop:8,flexWrap:"wrap"}}>
          {sizes.map(s=>(
            <TouchableOpacity key={s} onPress={()=>setSize(s)} style={{borderWidth:1,borderColor:size===s?colors.primary:"#374151",paddingVertical:8,paddingHorizontal:14,borderRadius:999,backgroundColor:size===s?"#1f1235":"#0B0F19"}}>
              <Text style={{color:"#fff",fontFamily:fonts.family}}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={{color:"#9CA3AF",marginTop:16,fontFamily:fonts.family}}>Couleur</Text>
        <View style={{flexDirection:"row",gap:8,marginTop:8,flexWrap:"wrap"}}>
          {colorsOpt.map(c=>(
            <TouchableOpacity key={c} onPress={()=>setColor(c)} style={{borderWidth:1,borderColor:color===c?colors.primary:"#374151",paddingVertical:8,paddingHorizontal:14,borderRadius:999,backgroundColor:color===c?"#1f1235":"#0B0F19"}}>
              <Text style={{color:"#fff",fontFamily:fonts.family}}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={()=>{
          add({id:product.id,name:product.name,price:product.price,image:product.images?.[0],qty:1,size:size??undefined,color:color??undefined});
          toast.show("Ajouté au panier",{actionText:"Voir",onAction:()=>nav.navigate("Checkout")});
        }}
          style={{marginTop:22,backgroundColor:colors.primary,paddingVertical:14,borderRadius:12,alignItems:"center"}}>
          <Text style={{color:"#fff",fontWeight:"800",fontFamily:fonts.family}}>Ajouter au panier</Text>
        </TouchableOpacity>
        <Text style={{color:"#D1D5DB",marginTop:18,lineHeight:20,fontFamily:fonts.family}}>
          Description fictive : matière premium, coupe confortable, look noir & or inspiré de l'univers Soul Bang's.
        </Text>
      </View>
    </ScrollView>
  );
}