import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  SafeAreaView
} from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

interface GroupItem {
  id: string;
  name: string;
  startZone: string;
  startTime: string;
}

interface GroupDetailModalProps {
  visible: boolean;
  group: GroupItem | null;
  onClose: () => void;
}

export default function GroupDetailModal({ visible, group, onClose }: GroupDetailModalProps) {
  if (!group) return null;

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Feather name="arrow-left" size={26} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{group.name}</Text>
            <View style={{ width: 26 }} /> 
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/* Sezione Partecipanti */}
            <Text style={styles.sectionLabel}>Partecipanti</Text>
            
            {/* Mock Partecipanti - In futuro questi dati verranno dal DB */}
            <View style={styles.card}>
              <Image 
                source={{ uri: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg" }} 
                style={styles.avatar} 
              />
              <Text style={styles.participantName}>Persona 1</Text>
              <MaterialCommunityIcons name="eye-outline" size={28} color="black" style={styles.eyeIcon} />
            </View>

            <View style={styles.card}>
              <Image 
                source={{ uri: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" }} 
                style={styles.avatar} 
              />
              <Text style={styles.participantName}>Persona 2</Text>
              <MaterialCommunityIcons name="eye-outline" size={28} color="black" style={styles.eyeIcon} />
            </View>

            <View style={styles.card}>
              <Image 
                source={{ uri: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg" }} 
                style={styles.avatar} 
              />
              <Text style={styles.participantName}>Persona 3</Text>
              <MaterialCommunityIcons name="eye-outline" size={28} color="black" style={styles.eyeIcon} />
            </View>


            {/* Sezione Partenza */}
            <Text style={styles.sectionLabel}>Partenza</Text>

            {/* Luogo */}
            <View style={styles.infoCard}>
              <View style={styles.iconCircle}>
                <Ionicons name="location-sharp" size={20} color="#5E35B1" />
              </View>
              <Text style={styles.infoText}>{group.startZone}</Text>
            </View>

            {/* Orario */}
            <View style={styles.infoCard}>
              <View style={styles.iconCircle}>
                <Feather name="clock" size={20} color="#5E35B1" />
              </View>
              <Text style={styles.infoText}>{group.startTime}</Text>
            </View>

            {/* Pulsante Richiedi Partecipazione */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={() => alert("Richiesta inviata!")}>
                <Text style={styles.actionButtonText}>Richiedi di partecipare</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionLabel: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "500",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#EEE",
  },
  participantName: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  eyeIcon: {
    padding: 5,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D1C4E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#F3E5F5",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
});