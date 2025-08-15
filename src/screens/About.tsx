import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { colors, fonts } from "../theme";

export default function About() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/splash.png")}
          style={styles.avatar}
          resizeMode="cover"
        />
        <Text style={[styles.title, { fontFamily: fonts.family }]}>SOUL BANG'S</Text>
        <Text style={[styles.tagline, { fontFamily: fonts.family }]}>Artiste • Créateur • Visionnaire</Text>

        <Text style={[styles.sectionTitle, { fontFamily: fonts.family }]}>Biographie</Text>
        <Text style={[styles.paragraph, { fontFamily: fonts.family }]}>
          Soul Bang's (Samuel Bangura) est un artiste pluridisciplinaire. Son univers mêle hip-hop,
          soul et influences africaines, avec une énergie scénique reconnue et des textes engagés.
        </Text>
        <Text style={[styles.paragraph, { fontFamily: fonts.family }]}>
          En 2020, il lance sa marque « Bang's Attitude », prolongeant sa vision artistique vers la mode
          streetwear. Son esthétique mêle raffinement noir & or et motifs identitaires.
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { fontFamily: fonts.family }]}>Albums</Text>
            <Text style={[styles.metaValue, { fontFamily: fonts.family }]}>Évolution, Dualité…</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { fontFamily: fonts.family }]}>Origines</Text>
            <Text style={[styles.metaValue, { fontFamily: fonts.family }]}>Guinée • Sierra Leone</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.dark },
  content: { padding: 16 },
  card: {
    backgroundColor: "#0F1422",
    borderColor: "#1F2937",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  avatar: { width: 160, height: 160, borderRadius: 80, borderWidth: 3, borderColor: colors.primary, marginBottom: 12 },
  title: { fontSize: 26, color: colors.light, fontWeight: "800" as const },
  tagline: { fontSize: 14, color: "#9CA3AF", marginBottom: 16 },
  sectionTitle: { fontSize: 16, color: colors.primary, marginTop: 8, marginBottom: 6 },
  paragraph: { fontSize: 14, color: "#D1D5DB", lineHeight: 20, marginBottom: 8 },
  metaRow: { flexDirection: "row", gap: 12, marginTop: 12 },
  metaItem: { flex: 1, backgroundColor: "#0B0F19", padding: 12, borderRadius: 12, borderWidth: 1, borderColor: "#1F2937" },
  metaLabel: { color: "#9CA3AF", fontSize: 12, marginBottom: 4 },
  metaValue: { color: colors.light, fontSize: 14 },
});