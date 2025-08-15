import React, { createContext, useContext, useState, useCallback } from "react";
import { Animated, Easing } from "react-native";

type ToastState = { show:(msg:string, opts?:{actionText?:string,onAction?:()=>void})=>void; hide:()=>void };
const Ctx = createContext<ToastState | null>(null);

export function ToastProvider({children}:{children:React.ReactNode}){
  const [msg,setMsg] = useState<string>("");
  const [actionText,setActionText] = useState<string | undefined>(undefined);
  const [onAction,setOnAction] = useState<(()=>void) | undefined>(undefined);
  const [visible,setVisible] = useState(false);
  const y = useState(new Animated.Value(100))[0];

  const show = useCallback((m:string, opts?:{actionText?:string,onAction?:()=>void})=>{
    setMsg(m); setActionText(opts?.actionText); setOnAction(()=>opts?.onAction); setVisible(true);
    Animated.timing(y,{toValue:0,duration:220,useNativeDriver:true,easing:Easing.out(Easing.quad)}).start();
    setTimeout(()=> {
      Animated.timing(y,{toValue:100,duration:220,useNativeDriver:true,easing:Easing.in(Easing.quad)}).start(({finished})=>{
        if(finished) setVisible(false);
      });
    }, 2200);
  },[y]);

  const hide = useCallback(()=>{
    Animated.timing(y,{toValue:100,duration:180,useNativeDriver:true}).start(()=>setVisible(false));
  },[y]);

  return (
    <Ctx.Provider value={{show,hide}}>
      {children}
      {visible && (
        <Animated.View style={{
          position:"absolute", left:12, right:12, bottom:12,
          transform:[{translateY:y}],
          backgroundColor:"#111827", borderWidth:1, borderColor:"#1F2937",
          borderRadius:12, paddingHorizontal:14, paddingVertical:12, flexDirection:"row", alignItems:"center", justifyContent:"space-between"
        }}>
          <Animated.Text style={{color:"#fff"}} numberOfLines={2}>{msg}</Animated.Text>
          {actionText ? (
            <Animated.Text onPress={onAction} style={{color:"#60A5FA", marginLeft:12, fontWeight:"800"}}>{actionText}</Animated.Text>
          ) : null}
        </Animated.View>
      )}
    </Ctx.Provider>
  );
}
export const useToast = ()=>{ const v = useContext(Ctx); if(!v) throw new Error("useToast must be used within ToastProvider"); return v; }