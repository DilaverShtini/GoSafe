import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      {/* MAPPA */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 43.8806,
          longitude: 12.9956,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Esempio marker */}
        <Marker
          coordinate={{ latitude: 43.8806, longitude: 12.9956 }}
          title="Pericolo"
          description="Segnalazione"
        >
          <Ionicons name="warning-outline" size={28} color="black" />
        </Marker>
      </MapView>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput style={styles.input} placeholder="Ricerca luogo" />
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={30} color="#6c5ce7" />
        </TouchableOpacity>
      </View>

      {/* SOS BUTTON */}
      <TouchableOpacity style={styles.sosButton}>
        <Ionicons name="warning" size={40} color="black" />
      </TouchableOpacity>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <NavItem icon="map-outline" text="Mappa" active={true} />
        <NavItem icon="people-outline" text="Gruppi" active={false} />
        <NavItem icon="chatbubble-ellipses-outline" text="Chat" active={false} />
        <NavItem icon="alert-circle-outline" text="SOS" active={false} />
      </View>
    </View>
  );
}

interface NavItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  active: boolean;
}

function NavItem({ icon, text, active }: NavItemProps) {
  return (
    <TouchableOpacity style={styles.navItem}>
      <Ionicons
        name={icon}
        size={22}
        color={active ? "#6c5ce7" : "#999"}
      />
      <Text style={{ color: active ? "#6c5ce7" : "#999", fontSize: 12 }}>
        {text}
      </Text>
    </TouchableOpacity>
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
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  sosButton: {
    position: "absolute",
    bottom: 90,
    right: 20,
    backgroundColor: "#b2f200",
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});
