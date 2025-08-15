import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../theme";
import GradientText from "./GradientText";

export default function Header() {
  return (
    <View style={styles.container}>
      <GradientText style={styles.title}>SOUL BANG'S</GradientText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dark600,
    borderBottomColor: "#1F2937",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  title: {
    fontSize: 20,
    letterSpacing: 0.5,
  },
});