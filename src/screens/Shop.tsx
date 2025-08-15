import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import { colors, fonts } from "../theme";
import productsJson from "../data/products.json";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../state/cart";
import { useToast } from "../state/toast";

type Product = { id:string; name:string; tag:string; category:string; price:number; images:string[] };
function fmt(n:number){ try{return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"}).format(n);}catch{return n.toFixed(2)+" €";} }
const categories = ["Tous","T-Shirts","Sweats","Pantalons","Accessoires","Limited","Street","Signature","Urban Roots","Lifestyle"];

export default function Shop(){
  const nav=useNavigation<any>(); const {items:cart,add,total}=useCart(); const toast=useToast();
  const [query,setQuery] = useState(""); const [cat,setCat] = useState("Tous");
  const [min,setMin]=useState<string>(""); const [max,setMax]=useState<string>("");
  const [openFilters,setOpenFilters]=useState(false);

  const items = useMemo(()=>{
    const data = productsJson as Product[];
    return data.filter(p=>{
      const okQ = query.trim().length===0 || (p.name+p.tag+p.category).toLowerCase().includes(query.toLowerCase());
      const okC = cat==="Tous" || p.category===cat || p.tag===cat;
      const minV = parseFloat(min); const maxV = parseFloat(max);
      const okMin = isNaN(minV) || p.price>=minV;
      const okMax = isNaN(maxV) || p.price<=maxV;
      return okQ && okC && okMin && okMax;
    });
  },[query,cat,min,max]);

  return (
    <View style={styles.screen}>
      {/* Barre actions */}
      <View style={styles.actions}>
        <TextInput placeholder="Rechercher…" placeholderTextColor="#9CA3AF" value={query} onChangeText={setQuery}
          style={styles.search}/>
        <TouchableOpacity onPress={()=>setOpenFilters(true)} style={styles.filterBtn}>
          <Text style={{color:"#fff",fontWeight:"800"}}>Filtres</Text>
        </TouchableOpacity>
      </View>

      <FlatList data={items} keyExtractor={i=>i.id} numColumns={2}
        contentContainerStyle={{padding:12,paddingBottom:100,gap:12}} columnWrapperStyle={{gap:12}}
        renderItem={({item})=>{
          const inCart=!!cart.find(c=>c.id===item.id);
          const image = item.images?.[0];
          return (
            <View style={styles.card}>
              <TouchableOpacity onPress={()=>nav.navigate("Produit",{productId:item.id})}>
                <Image source={{uri:image}} style={styles.img}/>
              </TouchableOpacity>
              <View style={{padding:10}}>
                <Text style={[styles.name,{fontFamily:fonts.family}]} numberOfLines={1}>{item.name}</Text>
                <Text style={[styles.tag,{fontFamily:fonts.family}]}>{item.tag} • {item.category}</Text>
                <View style={styles.row}>
                  <Text style={[styles.price,{fontFamily:fonts.family}]}>{fmt(item.price)}</Text>
                  <TouchableOpacity style={[styles.btn,inCart&&{backgroundColor:"#10B981",borderColor:"#10B981"}]}
                    onPress={()=>{
                      add({id:item.id,name:item.name,price:item.price,image,image: image,qty:1});
                      toast.show("Ajouté au panier",{actionText:"Voir",onAction:()=>nav.navigate("Checkout")});
                    }}>
                    <Text style={{color:"#fff",fontWeight:"700"}}>{inCart?"Ajouté":"Ajouter"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />

      {/* Bandeau panier */}
      <View style={styles.cartBar}>
        <Text style={{color:colors.light,fontFamily:fonts.family,fontSize:14}}>Panier • {cart.reduce((s,i)=>s+i.qty,0)} article(s)</Text>
        <TouchableOpacity onPress={()=>nav.navigate("Checkout")} style={{paddingHorizontal:14,paddingVertical:8,backgroundColor:colors.primary,borderRadius:8}}>
          <Text style={{color:"#fff",fontWeight:"800"}}>Payer {fmt(total)}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal filtres */}
      <Modal visible={openFilters} transparent animationType="fade" onRequestClose={()=>setOpenFilters(false)}>
        <View style={styles.modalWrap}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Filtres</Text>
            <Text style={styles.modalLabel}>Catégorie / Tag</Text>
            <View style={{flexDirection:"row",flexWrap:"wrap",gap:8}}>
              {categories.map(c=>(
                <TouchableOpacity key={c} onPress={()=>setCat(c)}
                  style={{borderWidth:1,borderColor:cat===c?colors.primary:"#374151",paddingVertical:8,paddingHorizontal:12,borderRadius:999,backgroundColor:cat===c?"#1f1235":"#0B0F19"}}>
                  <Text style={{color:"#fff"}}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.modalLabel,{marginTop:12}]}>Prix</Text>
            <View style={{flexDirection:"row",gap:8}}>
              <TextInput value={min} onChangeText={setMin} placeholder="Min" placeholderTextColor="#6B7280" keyboardType="numeric" style={styles.priceInput}/>
              <TextInput value={max} onChangeText={setMax} placeholder="Max" placeholderTextColor="#6B7280" keyboardType="numeric" style={styles.priceInput}/>
            </View>
            <View style={{flexDirection:"row",justifyContent:"flex-end",gap:8,marginTop:16}}>
              <TouchableOpacity onPress={()=>{setQuery("");setCat("Tous");setMin("");setMax("");}}><Text style={{color:"#9CA3AF"}}>Réinitialiser</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>setOpenFilters(false)} style={{backgroundColor:colors.primary,paddingVertical:10,paddingHorizontal:14,borderRadius:10}}>
                <Text style={{color:"#fff",fontWeight:"800"}}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles=StyleSheet.create({
  screen:{flex:1,backgroundColor:colors.dark},
  actions:{flexDirection:"row",gap:8,padding:12},
  search:{flex:1,backgroundColor:"#0F1422",borderWidth:1,borderColor:"#1F2937",borderRadius:10,paddingHorizontal:12,color:"#fff",height:44},
  filterBtn:{backgroundColor:"#1F2937",paddingHorizontal:12,justifyContent:"center",borderRadius:10},
  card:{flex:1,backgroundColor:"#0F1422",borderWidth:1,borderColor:"#1F2937",borderRadius:12,overflow:"hidden"},
  img:{width:"100%",height:180},
  name:{color:colors.light,fontSize:14},
  tag:{color:"#9CA3AF",fontSize:12,marginTop:2},
  row:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:8},
  price:{color:colors.primary,fontSize:14},
  btn:{backgroundColor:colors.primary,borderColor:colors.primary,borderWidth:1,paddingVertical:8,paddingHorizontal:12,borderRadius:999},
  cartBar:{position:"absolute",left:12,right:12,bottom:12,backgroundColor:"#111827",borderWidth:1,borderColor:"#1F2937",borderRadius:12,paddingHorizontal:14,paddingVertical:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  modalWrap:{flex:1,backgroundColor:"rgba(0,0,0,0.5)",justifyContent:"center",padding:16},
  modalCard:{backgroundColor:"#0B0F19",borderWidth:1,borderColor:"#1F2937",borderRadius:12,padding:16},
  modalTitle:{color:"#fff",fontSize:18,fontWeight:"900",marginBottom:8},
  modalLabel:{color:"#9CA3AF",marginBottom:8},
  priceInput:{flex:1,backgroundColor:"#0F1422",borderWidth:1,borderColor:"#1F2937",borderRadius:10,paddingHorizontal:10,color:"#fff",height:44}
});