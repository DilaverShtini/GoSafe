import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Il mio Profilo</Text>
      </View>

      <View style={styles.content}>
        <Ionicons name="person-circle" size={100} color="#ccc" />
        <Text style={styles.name}>Nome Utente</Text>
        <Text style={styles.email}>utente@email.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60, // Spazio per la status bar
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
});