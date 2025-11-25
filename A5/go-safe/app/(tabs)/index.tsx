import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import SearchBar from "../../src/components/SearchBar";
import FloatingReportButton from "../../src/components/FloatingReportButton";
import ReportModal from "../../src/components/ReportModal";

interface Report {
  id: number;
  latitude: number;
  longitude: number;
  type: string;
  note: string;
}

const TYPE_ICONS: Record<string, any> = {
  danger: "alert-octagon",
  darkness: "lightbulb-off",
  desolate: "road-variant",
  stray: "dog-side",
  suspicious: "account-alert",
  weather: "weather-lightning-rainy",
};

const TYPE_COLORS: Record<string, string> = {
  danger: "#e74c3c",
  darkness: "#34495e",
  desolate: "#e67e22",
  stray: "#6c5ce7",
  suspicious: "#8d6e63",
  weather: "#3498db",
};

const TYPE_LABELS: Record<string, string> = {
  danger: "Pericolo",
  darkness: "Buio",
  desolate: "Strada desolata",
  stray: "Animali randagi",
  suspicious: "Individuo Sospetto",
  weather: "Allerta meteo",
};

export default function MapScreen() {
  const [selectedPoint, setSelectedPoint] = useState<{ latitude: number; longitude: number } | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMapPress = (e: MapPressEvent) => {
    if (modalVisible) return;
    setSelectedPoint(e.nativeEvent.coordinate);
  };

  const handleFloatingButtonPress = () => {
    if (!selectedPoint) {
      Alert.alert("Attenzione", "Tocca prima un punto sulla mappa!");
      return;
    }
    setModalVisible(true);
  };

  const handleCreateReport = (type: string, note: string) => {
    if (!selectedPoint) return;

    const newReport: Report = {
      id: Date.now(),
      latitude: selectedPoint.latitude,
      longitude: selectedPoint.longitude,
      type: type,
      note: note,
    };

    setReports([...reports, newReport]);
    setSelectedPoint(null);
    setModalVisible(false);
  };

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
        onPress={handleMapPress}
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{ latitude: report.latitude, longitude: report.longitude }}
            title={TYPE_LABELS[report.type] || "Segnalazione"} 
            description={report.note || "Nessuna nota"}
          >
            <View style={[styles.markerBg, { backgroundColor: TYPE_COLORS[report.type] || "black" }]}>
               <MaterialCommunityIcons 
                  // @ts-ignore
                  name={TYPE_ICONS[report.type] || "alert"} 
                  size={20} 
                  color="white" 
               />
            </View>
          </Marker>
        ))}

        {selectedPoint && (
          <Marker
            coordinate={selectedPoint}
            title="Punto Selezionato"
            pinColor="blue"
            opacity={0.7}
          />
        )}
      </MapView>

      <SearchBar />
      
      <FloatingReportButton onPress={handleFloatingButtonPress} />

      <ReportModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateReport}
      />
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
  markerBg: {
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});