import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export type CartItem = { id: string; name: string; price: number; image?: string; qty: number; size?: string; color?: string };
type CartState = { items: CartItem[]; add:(i:CartItem)=>void; remove:(id:string)=>void; clear:()=>void; setQty:(id:string,qty:number)=>void; total:number; };
const CartCtx = createContext<CartState | null>(null);
const KEY = "CART_V1";
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(()=>{(async()=>{ try{ const raw=await AsyncStorage.getItem(KEY); if(raw) setItems(JSON.parse(raw)); }catch{} })()},[]);
  useEffect(()=>{ AsyncStorage.setItem(KEY, JSON.stringify(items)).catch(()=>{}); },[items]);
  const add=(i:CartItem)=> setItems(p=>{ const k=p.findIndex(x=>x.id===i.id && x.size===i.size && x.color===i.color); if(k>=0){ const cp=[...p]; cp[k]={...cp[k],qty:cp[k].qty+i.qty}; return cp;} return [...p,i];});
  const remove=(id:string)=> setItems(p=>p.filter(x=>x.id!==id));
  const setQty=(id:string,qty:number)=> setItems(p=>p.map(x=>x.id===id?{...x,qty}:x));
  const clear=()=> setItems([]);
  const total = useMemo(()=> items.reduce((s,p)=> s+p.price*p.qty,0),[items]);
  return <CartCtx.Provider value={{items,add,remove,clear,setQty,total}}>{children}</CartCtx.Provider>;
}
export const useCart=()=>{const c=useContext(CartCtx); if(!c) throw new Error("useCart must be used within CartProvider"); return c;}