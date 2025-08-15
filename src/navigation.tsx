import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer, DefaultTheme, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./theme";

import Home from "./screens/Home";
import Media from "./screens/Media";
import Shop from "./screens/Shop";
import ProductDetail from "./screens/ProductDetail";
import Checkout from "./screens/Checkout";
import News from "./screens/News";
import Bio from "./screens/Bio";
import Tournee from "./screens/Tournee";
import { useCart } from "./state/cart";

const Tab = createBottomTabNavigator();
const ShopStackNav = createNativeStackNavigator();

function CartHeaderButton() {
  const nav = useNavigation<any>();
  const { items } = useCart();
  const count = items.reduce((s,i)=>s+i.qty,0);
  return (
    <View style={{ marginRight: 12 }}>
      <View>
        <Ionicons name="cart" size={22} color="#fff" onPress={()=> nav.navigate("Checkout")} />
        {count>0 && (
          <View style={{ position:"absolute", top:-6, right:-8, backgroundColor:"#EF4444", borderRadius:999, paddingHorizontal:5, minWidth:16, height:16, alignItems:"center", justifyContent:"center" }}>
            <Text style={{ color:"#fff", fontSize:10, fontWeight:"800" }}>{count}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function ShopStack() {
  return (
    <ShopStackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0B0F19" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#0B0F19" }
      }}
    >
      <ShopStackNav.Screen
        name="BoutiqueHome"
        component={Shop}
        options={{ title: "Boutique", headerRight: () => <CartHeaderButton/> }}
      />
      <ShopStackNav.Screen name="Produit" component={ProductDetail} options={{ title: "Produit" }} />
      <ShopStackNav.Screen name="Checkout" component={Checkout} options={{ title: "Paiement" }} />
    </ShopStackNav.Navigator>
  );
}

function TabIcon({ routeName, color, size }: { routeName:string; color:string; size:number }) {
  const { items } = useCart();
  const count = items.reduce((s,i)=>s+i.qty,0);
  const map: Record<string,string> = {
    "Accueil":"home",
    "Médias":"play-circle",
    "Boutique":"bag",
    "Tournée":"calendar",
    "Actualités":"newspaper",
    "Bio":"person"
  };
  const name = (map[routeName] ?? "ellipse") as any;
  return (
    <View>
      <Ionicons name={name} size={size} color={color}/>
      {routeName==="Boutique" && count>0 && (
        <View style={{ position:"absolute", top:-4, right:-10, backgroundColor:"#EF4444", borderRadius:999, paddingHorizontal:5, minWidth:16, height:16, alignItems:"center", justifyContent:"center" }}>
          <Text style={{ color:"#fff", fontSize:10, fontWeight:"800" }}>{count}</Text>
        </View>
      )}
    </View>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background:"#0B0F19", card:"#0B0F19", text:"#FFFFFF", border:"#1F2937" }
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor:"#0B0F19", borderTopColor:"#1F2937" },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarIcon: ({ color, size }) => <TabIcon routeName={route.name} color={color} size={size} />
        })}
      >
        <Tab.Screen name="Accueil" component={Home} />
        <Tab.Screen name="Médias" component={Media} />
        <Tab.Screen name="Boutique" component={ShopStack} />
        <Tab.Screen name="Tournée" component={Tournee} />
        <Tab.Screen name="Actualités" component={News} />
        <Tab.Screen name="Bio" component={Bio} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}