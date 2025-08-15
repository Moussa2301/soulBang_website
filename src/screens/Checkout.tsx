import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, TextInput, Linking } from "react-native";
import { colors, fonts } from "../theme";
import { useCart } from "../state/cart";

function fmt(n:number){ try{return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"}).format(n);}catch{return n.toFixed(2)+" €";} }
const METHODS = ["Carte bancaire","Mobile Money","PayPal"] as const;
type Method = typeof METHODS[number];

export default function Checkout(){
  const { items,total,setQty,remove,clear } = useCart();
  const [method,setMethod]=useState<Method>("Carte bancaire");
  const shipping = useMemo(()=> (total>100?0:6.9),[total]);
  const grand = useMemo(()=> total+shipping,[total,shipping]);

  // champs paiement
  const [name,setName]=useState(""); const [card,setCard]=useState(""); const [exp,setExp]=useState(""); const [cvc,setCvc]=useState("");
  const [mmOperator,setMmOperator]=useState("Orange Money"); const [mmPhone,setMmPhone]=useState("");
  const [ppEmail,setPpEmail]=useState("");

  function validateAndPay(){
    if(items.length===0){ Alert.alert("Panier vide","Ajoutez un produit avant de payer."); return; }
    if(method==="Carte bancaire"){
      if(name.trim().length<3 || card.replace(/\s/g,"").length<12 || !/^\d{2}\/\d{2}$/.test(exp) || cvc.length<3){
        Alert.alert("Informations carte incomplètes","Merci de remplir Nom, Numéro, Expiration (MM/AA) et CVC.");
        return;
      }
      Alert.alert("Paiement simulé","Votre paiement carte a été accepté ✅",[ {text:"OK", onPress:()=> { clear(); } } ]);
      return;
    }
    if(method==="Mobile Money"){
      if(mmPhone.replace(/\D/g,"").length<8){
        Alert.alert("Numéro invalide","Renseignez un numéro Mobile Money valide.");
        return;
      }
      Alert.alert("Confirmation Mobile Money",`Un push sera envoyé sur ${mmOperator} au ${mmPhone}`,[
        {text:"OK", onPress:()=>{ clear(); }}
      ]);
      return;
    }
    if(method==="PayPal"){
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ppEmail)){
        Alert.alert("Email PayPal invalide","Saisissez un email valide.");
        return;
      }
      Linking.openURL("https://example.com/paypal-checkout?soulbangsapp").catch(()=>Alert.alert("Erreur","Impossible d'ouvrir la page PayPal"));
      clear();
      return;
    }
  }

  return (
    <View style={{flex:1,backgroundColor:colors.dark}}>
      <FlatList data={items} keyExtractor={i=>i.id} contentContainerStyle={{padding:12,paddingBottom:220,gap:12}}
        ListEmptyComponent={<Text style={{color:"#9CA3AF",textAlign:"center",marginTop:40}}>Votre panier est vide.</Text>}
        renderItem={({item})=>(
          <View style={styles.row}>
            {item.image ? <Image source={{uri:item.image}} style={{width:64,height:64,borderRadius:8}}/> : null}
            <View style={{flex:1,marginLeft:10}}>
              <Text style={{color:"#fff",fontFamily:fonts.family}} numberOfLines={1}>{item.name}</Text>
              <Text style={{color:"#9CA3AF",fontFamily:fonts.family,fontSize:12}}>
                {item.size ? `Taille ${item.size} • ` : ""}{item.color ?? "Couleur standard"}
              </Text>
              <Text style={{color:colors.primary,fontFamily:fonts.family}}>{fmt(item.price)}</Text>
            </View>
            <View style={{alignItems:"center"}}>
              <View style={{flexDirection:"row",alignItems:"center",gap:8}}>
                <TouchableOpacity onPress={()=>setQty(item.id,Math.max(1,item.qty-1))} style={styles.qtyBtn}><Text style={styles.qtyTxt}>-</Text></TouchableOpacity>
                <Text style={{color:"#fff"}}>{item.qty}</Text>
                <TouchableOpacity onPress={()=>setQty(item.id,item.qty+1)} style={styles.qtyBtn}><Text style={styles.qtyTxt}>+</Text></TouchableOpacity>
              </View>
              <TouchableOpacity onPress={()=>remove(item.id)} style={{marginTop:6}}><Text style={{color:"#EF4444"}}>Retirer</Text></TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Récap total */}
      <View style={styles.footer}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={styles.totalLabel}>Sous-total</Text><Text style={styles.totalVal}>{fmt(total)}</Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:4}}>
          <Text style={styles.totalLabel}>Livraison</Text><Text style={styles.totalVal}>{shipping===0?"Offerte":fmt(shipping)}</Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:6}}>
          <Text style={[styles.totalLabel,{fontWeight:"900",color:"#fff"}]}>Total</Text><Text style={[styles.totalVal,{fontWeight:"900",color:"#fff"}]}>{fmt(grand)}</Text>
        </View>

        {/* Méthodes */}
        <Text style={{color:"#9CA3AF",marginTop:12,marginBottom:6}}>Mode de paiement</Text>
        <View style={{flexDirection:"row",flexWrap:"wrap",gap:8}}>
          {METHODS.map(m=>(
            <TouchableOpacity key={m} onPress={()=>setMethod(m)}
              style={{borderWidth:1,borderColor:method===m?colors.primary:"#374151",paddingVertical:8,paddingHorizontal:12,borderRadius:999,backgroundColor:method===m?"#1f1235":"#0B0F19"}}>
              <Text style={{color:"#fff"}}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Formulaires conditionnels */}
        {method==="Carte bancaire" && (
          <View style={{marginTop:10,gap:8}}>
            <TextInput value={name} onChangeText={setName} placeholder="Nom sur la carte" placeholderTextColor="#6B7280" style={styles.input}/>
            <TextInput value={card} onChangeText={setCard} placeholder="Numéro de carte" keyboardType="number-pad" placeholderTextColor="#6B7280" style={styles.input}/>
            <View style={{flexDirection:"row",gap:8}}>
              <TextInput value={exp} onChangeText={setExp} placeholder="MM/AA" keyboardType="number-pad" placeholderTextColor="#6B7280" style={[styles.input,{flex:1}]}/>
              <TextInput value={cvc} onChangeText={setCvc} placeholder="CVC" keyboardType="number-pad" placeholderTextColor="#6B7280" style={[styles.input,{flex:1}]}/>
            </View>
          </View>
        )}
        {method==="Mobile Money" && (
          <View style={{marginTop:10,gap:8}}>
            <TextInput value={mmOperator} onChangeText={setMmOperator} placeholder="Opérateur (Orange Money, MTN…)" placeholderTextColor="#6B7280" style={styles.input}/>
            <TextInput value={mmPhone} onChangeText={setMmPhone} placeholder="Numéro Mobile Money" keyboardType="phone-pad" placeholderTextColor="#6B7280" style={styles.input}/>
          </View>
        )}
        {method==="PayPal" && (
          <View style={{marginTop:10,gap:8}}>
            <TextInput value={ppEmail} onChangeText={setPpEmail} placeholder="Email PayPal" keyboardType="email-address" placeholderTextColor="#6B7280" style={styles.input}/>
          </View>
        )}

        <TouchableOpacity onPress={validateAndPay} style={[styles.payBtn,{marginTop:12}]}>
          <Text style={styles.payTxt}>Confirmer le paiement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles=StyleSheet.create({
  row:{backgroundColor:"#0F1422",borderWidth:1,borderColor:"#1F2937",borderRadius:12,padding:10,flexDirection:"row",alignItems:"center"},
  qtyBtn:{width:28,height:28,borderRadius:6,backgroundColor:"#1F2937",alignItems:"center",justifyContent:"center"},
  qtyTxt:{color:"#fff",fontWeight:"800"},
  footer:{position:"absolute",left:12,right:12,bottom:12,backgroundColor:"#111827",borderWidth:1,borderColor:"#1F2937",borderRadius:12,padding:12},
  input:{backgroundColor:"#0F1422",borderWidth:1,borderColor:"#1F2937",borderRadius:10,paddingHorizontal:12,color:"#fff",height:44},
  payBtn:{backgroundColor:"#8B5CF6",paddingVertical:12,borderRadius:10,alignItems:"center"},
  payTxt:{color:"#fff",fontWeight:"800"},
  totalLabel:{color:"#9CA3AF",fontFamily:fonts.family},
  totalVal:{color:"#D1D5DB",fontFamily:fonts.family}
});