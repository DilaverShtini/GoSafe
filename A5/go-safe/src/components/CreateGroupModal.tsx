import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

interface CreateGroupModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (groupData: any) => void;
}

export default function CreateGroupModal({ visible, onClose, onSubmit }: CreateGroupModalProps) {
  // Stati per il form
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [dateText, setDateText] = useState("");
  
  // Stati per l'orario
  const [hour, setHour] = useState("20");
  const [minute, setMinute] = useState("00");
  const [isAm, setIsAm] = useState(false); // false = PM

  const handleCreate = () => {
    // Validazione base
    if (!startLocation || !endLocation) {
      alert("Inserisci luogo di partenza e arrivo");
      return;
    }

    const newGroup = {
      name: endLocation, // Usiamo la destinazione come nome principale
      startZone: startLocation,
      startTime: `${hour}:${minute} ${isAm ? 'AM' : 'PM'}`,
      date: dateText || "Oggi",
      initial: endLocation.charAt(0).toUpperCase(),
    };

    onSubmit(newGroup);
    
    //Reset form
    setStartLocation("");
    setEndLocation("");
    onClose();
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Feather name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Crea il gruppo</Text>
            <View style={{ width: 24 }} /> 
          </View>

          {/* Inputs Luoghi */}
          <View style={styles.inputGroup}>
            {/* Partenza */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Luogo di partenza</Text>
              <View style={styles.inputRow}>
                <TextInput 
                  style={styles.textInput} 
                  placeholder="Input" 
                  value={startLocation}
                  onChangeText={setStartLocation}
                />
                {startLocation.length > 0 && (
                  <TouchableOpacity onPress={() => setStartLocation("")}>
                    <Feather name="x-circle" size={20} color="#666" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={{ height: 10 }} />

            {/* Arrivo */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Luogo di arrivo</Text>
              <View style={styles.inputRow}>
                <TextInput 
                  style={styles.textInput} 
                  placeholder="Input" 
                  value={endLocation}
                  onChangeText={setEndLocation}
                />
                {endLocation.length > 0 && (
                  <TouchableOpacity onPress={() => setEndLocation("")}>
                    <Feather name="x-circle" size={20} color="#666" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          {/* Sezione Data */}
          <View style={styles.cardSection}>
            <Text style={styles.sectionTitle}>Seleziona la data della partenza</Text>
            
            <View style={styles.dateDisplayRow}>
              <Text style={styles.bigDateText}>
                {dateText ? dateText : "Seleziona la data"}
              </Text>
              <Feather name="calendar" size={24} color="#333" />
            </View>

            {/* Input Data Mock */}
            <View style={styles.dateInputBox}>
              <Text style={styles.smallLabel}>Date</Text>
              <TextInput 
                style={styles.dateInput}
                placeholder="mm/dd/yyyy"
                value={dateText}
                onChangeText={setDateText}
              />
            </View>
            <TouchableOpacity>
                <Text style={styles.actionLink}>Inserisci data</Text>
            </TouchableOpacity>
          </View>

          {/* Sezione Orario */}
          <View style={styles.cardSection}>
            <Text style={styles.sectionTitle}>Scegli l'orario della partenza</Text>
            
            <View style={styles.timeContainer}>
              {/* Ore */}
              <View>
                <View style={[styles.timeBox, styles.activeTimeBox]}>
                  <TextInput 
                    style={styles.timeText} 
                    value={hour} 
                    onChangeText={setHour} 
                    keyboardType="numeric" 
                    maxLength={2}
                  />
                  {/* Cursore */}
                  <View style={styles.cursor} />
                </View>
                <Text style={styles.timeLabel}>Hour</Text>
              </View>

              <Text style={styles.colon}>:</Text>

              {/* Minuti */}
              <View>
                <View style={styles.timeBox}>
                  <TextInput 
                    style={styles.timeText} 
                    value={minute} 
                    onChangeText={setMinute} 
                    keyboardType="numeric" 
                    maxLength={2}
                  />
                </View>
                <Text style={styles.timeLabel}>Minute</Text>
              </View>

              {/* AM/PM Switch */}
              <View style={styles.amPmContainer}>
                <TouchableOpacity 
                  style={[styles.amPmButton, isAm && styles.amPmActive]}
                  onPress={() => setIsAm(true)}
                >
                  <Text style={styles.amPmText}>AM</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity 
                  style={[styles.amPmButton, !isAm && styles.amPmActive]}
                  onPress={() => setIsAm(false)}
                >
                  <Text style={styles.amPmText}>PM</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.clockFooter}>
                <MaterialCommunityIcons name="clock-time-four-outline" size={24} color="#555" />
                <TouchableOpacity>
                    <Text style={styles.actionLink}>Inserisci orario</Text>
                </TouchableOpacity>
            </View>
          </View>

          {/* Bottone Finale Conferma */}
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Crea Gruppo</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "white",
    minHeight: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: "#F3E5F5",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  label: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  // Card Sections (Date/Time)
  cardSection: {
    backgroundColor: "#F3E5F5",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
    fontWeight: "600",
  },
  // Date Styles
  dateDisplayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  bigDateText: {
    fontSize: 24,
    color: "#222",
  },
  dateInputBox: {
    borderWidth: 2,
    borderColor: "#6C5CE7",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#EEE",
  },
  smallLabel: {
    fontSize: 10,
    color: "#6C5CE7",
    marginBottom: 2,
    fontWeight: "bold",
  },
  dateInput: {
    fontSize: 16,
    color: "#333",
  },
  actionLink: {
    color: "#6C5CE7",
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 10,
  },
  // Time Styles
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  timeBox: {
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    width: 80,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
  },
  activeTimeBox: {
    backgroundColor: "#EADDFF",
    borderWidth: 1,
    borderColor: "#6C5CE7",
  },
  timeText: {
    fontSize: 32,
    color: "#333",
  },
  cursor: {
    width: 2,
    height: 30,
    backgroundColor: "#6C5CE7",
    marginLeft: 2,
  },
  timeLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  colon: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  amPmContainer: {
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#AAA",
    overflow: "hidden",
  },
  amPmButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
  },
  amPmActive: {
    backgroundColor: "#FFCDD2",
  },
  amPmText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#AAA",
  },
  clockFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  // Main Action Button
  createButton: {
    backgroundColor: "#6C5CE7",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  }
});