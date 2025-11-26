import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import GroupCard from "../../src/components/GroupCard";
import GroupsHeader from "../../src/components/GroupsHeader";
import CreateGroupModal from "../../src/components/CreateGroupModal";

interface GroupItem {
  id: string;
  name: string;
  startZone: string;
  startTime: string;
  initial: string;
  color?: string;
}

// Dati iniziali
const INITIAL_GROUPS: GroupItem[] = [
  { id: "1", name: "Destinazione 1", startZone: "Milano Centrale", startTime: "20:30", initial: "A", color: "#E1BEE7" },
];

export default function GroupsScreen() {
  const [groups, setGroups] = useState<GroupItem[]>(INITIAL_GROUPS);
  const [isModalVisible, setModalVisible] = useState(false);

  // Funzione chiamata dal Modal quando si preme "Crea"
  const handleCreateGroup = (newGroupData: any) => {
    const newGroup: GroupItem = {
      id: Date.now().toString(), // Genera ID unico
      name: newGroupData.name,
      startZone: newGroupData.startZone,
      startTime: newGroupData.startTime,
      initial: newGroupData.initial,
      color: "#E1BEE7",
    };

    // Aggiungi alla lista
    setGroups(currentGroups => [...currentGroups, newGroup]);
    
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <GroupsHeader />

        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GroupCard
              name={item.name}
              startZone={item.startZone}
              startTime={item.startTime}
              initial={item.initial}
              color={item.color}
              onPressEye={() => Alert.alert("Dettagli", `Vedi gruppo ${item.name}`)}
            />
          )}
        />

        {/* Floating Button apre il modal */}
        <TouchableOpacity 
            style={styles.fab} 
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="plus" size={32} color="#333" />
        </TouchableOpacity>

        {/* Il Modal */}
        <CreateGroupModal 
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleCreateGroup}
        />
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 100,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});