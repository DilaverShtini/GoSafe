import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface GroupCardProps {
  name: string;
  startZone: string;
  startTime: string;
  initial: string;
  color?: string;
  onPressEye?: () => void;
}

export default function GroupCard({ 
  name, 
  startZone, 
  startTime, 
  initial, 
  color = "#E1BEE7",
  onPressEye 
}: GroupCardProps) {
  return (
    <View style={styles.card}>
      {/* Avatar */}
      <View style={[styles.avatarContainer, { backgroundColor: color }]}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>

      {/* Info Testuali */}
      <View style={styles.infoContainer}>
        <Text style={styles.groupName}>{name}</Text>
        <Text style={styles.groupDetail}>{startZone}</Text>
        <Text style={styles.groupDetail}>{startTime}</Text>
      </View>

      {/* Tasto Occhio */}
      <TouchableOpacity onPress={onPressEye} style={styles.iconContainer}>
        <MaterialCommunityIcons name="eye-outline" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5E35B1",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  groupDetail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  iconContainer: {
    padding: 8,
  },
});