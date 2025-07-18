import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

// type Props = {
//   pokemon: Pokemon;
//   onRemove: (id: number) => void;
// };

const PokemonTypeIcon = ({ typeName }: { typeName: string }) => {
  const [svgData, setSvgData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `https://raw.githubusercontent.com/partywhale/pokemon-type-icons/refs/heads/main/icons/${typeName}.svg`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const svgText = await response.text();
        setSvgData(svgText);
      } catch (err) {
        console.error(`Error loading SVG for type ${typeName}:`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSvg();
  }, [typeName]);

  if (loading) {
    return (
      <View style={styles.typeIconContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  if (error || !svgData) {
    return (
      <View style={styles.typeIconFallback}>
        <Text style={styles.typeText}>{typeName}</Text>
      </View>
    );
  }

  return (
    <View style={styles.typeIconContainer}>
      <SvgXml xml={svgData} width={64} height={28} />
    </View>
  );
};
const styles = StyleSheet.create({
  pokemonContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    gap: 12,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
  },
  nameItem: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  image: {
    width: 200,
    height: 200,
  },
  typeContainer: {
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  typeIconsRow: {
    flexDirection: "row",
    gap: 8,
  },
  typeIconContainer: {
    width: 64,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  typeIcon: {
    width: 64,
    height: 28,
  },
  typeIconFallback: {
    width: 64,
    height: 28,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  typeText: {
    fontSize: 12,
    color: "#666",
    textTransform: "capitalize",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  abilitiesText: {
    fontSize: 14,
    textAlign: "center",
  },
  removeBtn: {
    fontSize: 10,
    color: "red",
    textAlign: "right",
    margin: 10,
  },
});
export default PokemonTypeIcon;
