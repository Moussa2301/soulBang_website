import React from "react";
import { Text, TextProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

type Props = TextProps & { children: React.ReactNode };

export default function GradientText({ children, style, ...rest }: Props) {
  return (
    <MaskedView maskElement={<Text {...rest} style={[{ fontWeight: "900" }, style]}>{children}</Text>}>
      <LinearGradient
        colors={["#8B5CF6", "#EC4899"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {/* texte transparent juste pour donner la taille */}
        <Text {...rest} style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}