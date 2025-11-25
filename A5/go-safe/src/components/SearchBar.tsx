import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#666" />
      <TextInput style={styles.input} placeholder="Ricerca luogo" />
      <TouchableOpacity>
        <Ionicons name="person-circle-outline" size={30} color="#6c5ce7" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 1000,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});