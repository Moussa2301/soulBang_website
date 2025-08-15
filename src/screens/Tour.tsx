import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from "react-native";
import { colors, fonts } from "../theme";
import tourData from "../data/tour.json";

type Show = { city: string; venue: string; date: string; ticketsUrl: string };

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", { weekday:"short", day:"2-digit", month:"long", year:"numeric" });
  } catch { return iso; }
}

export default function Tour() {
  return (
    <View style={styles.screen}>
      <FlatList
        data={tourData as Show[]}
        keyExtractor={(item, idx) => `${item.city}-${idx}`}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.city, { fontFamily: fonts.family }]}>{item.city}</Text>
              <Text style={[styles.venue, { fontFamily: fonts.family }]}>{item.venue}</Text>
              <Text style={[styles.date, { fontFamily: fonts.family }]}>{formatDate(item.date)}</Text>
            </View>
            <TouchableOpacity style={styles.cta} onPress={() => Linking.openURL(item.ticketsUrl)}>
              <Text style={[styles.ctaText, { fontFamily: fonts.family }]}>Billetterie</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.dark },
  card: {
    backgroundColor: "#0F1422",
    borderWidth: 1,
    borderColor: "#1F2937",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  city: { color: colors.light, fontSize: 18, fontWeight: "800" as const },
  venue: { color: "#D1D5DB", fontSize: 14, marginTop: 2 },
  date: { color: colors.primary, fontSize: 13, marginTop: 6 },
  cta: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  ctaText: { color: "white", fontSize: 13, fontWeight: "700" as const },
});