import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function GroupsHeader() {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      {/* Search Input */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Ricerca Gruppo"
          placeholderTextColor="#888"
        />
        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
      </View>

      {/* Profile Button */}
      <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => router.push("/profile")}
      >
        <Ionicons name="person-circle-outline" size={36} color="#7E57C2" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    gap: 10,
  },
  iconButton: {
    padding: 4,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F3E5F5",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchIcon: {
    marginLeft: 8,
  },
});