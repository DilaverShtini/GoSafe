import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FloatingSosButton() {
  return (
    <TouchableOpacity style={styles.sosButton}>
      <Ionicons name="warning" size={40} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#b2f200",
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});