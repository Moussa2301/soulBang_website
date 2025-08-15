import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation";
import { CartProvider } from "./src/state/cart";
import { ToastProvider } from "./src/state/toast";

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}