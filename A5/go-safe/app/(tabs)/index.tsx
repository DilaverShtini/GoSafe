import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

import SearchBar from "../../src/components/SearchBar";
import FloatingSosButton from "../../src/components/FloatingReportButton";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.8806,
          longitude: 12.9956,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 43.8806, longitude: 12.9956 }}
          title="Pericolo"
          description="Segnalazione"
        >
          <Ionicons name="warning-outline" size={28} color="black" />
        </Marker>
      </MapView>

      {}
      <SearchBar />
      <FloatingSosButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});