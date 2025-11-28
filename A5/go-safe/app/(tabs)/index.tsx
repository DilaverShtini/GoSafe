import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import MapView, { Marker, MapPressEvent, Polyline, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

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
  danger: "alert-octagon", darkness: "lightbulb-off", desolate: "road-variant",
  stray: "dog-side", suspicious: "account-alert", weather: "weather-lightning-rainy",
};

const TYPE_COLORS: Record<string, string> = {
  danger: "#e74c3c", darkness: "#34495e", desolate: "#e67e22",
  stray: "#6c5ce7", suspicious: "#8d6e63", weather: "#3498db",
};

const TYPE_LABELS: Record<string, string> = {
  danger: "Pericolo", darkness: "Buio", desolate: "Strada desolata",
  stray: "Animali randagi", suspicious: "Individuo Sospetto", weather: "Allerta meteo",
};

const DEFAULT_REGION = {
  latitude: 44.1396, 
  longitude: 12.2432,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const [isRouting, setIsRouting] = useState(false);

  const [selectedPoint, setSelectedPoint] = useState<{ latitude: number; longitude: number } | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);

        mapRef.current?.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000); 

      } catch (error) {
        console.log("Errore posizione", error);
      }
    })();
  }, []);

  const handleCenterOnUser = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
    mapRef.current?.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const fetchRoute = async (start: { latitude: number, longitude: number }, end: { latitude: number, longitude: number }) => {
    setIsRouting(true);
    try {
      const response = await fetch(
        `http://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`
      );
      const json = await response.json();
      if (json.routes && json.routes.length > 0) {
        const coordinates = json.routes[0].geometry.coordinates.map((coord: number[]) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
        setRouteCoordinates(coordinates);
        mapRef.current?.fitToCoordinates(coordinates, {
            edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
            animated: true,
        });
      } else {
        Alert.alert("Errore", "Impossibile trovare un percorso.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Errore", "Errore connessione.");
    } finally {
      setIsRouting(false);
    }
  };

  const handleDestinationSearch = (coords: { latitude: number; longitude: number }) => {
    setDestination(coords);
    setSelectedPoint(null);
    if (userLocation) {
        fetchRoute(userLocation, coords);
    } else {
        mapRef.current?.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        });
    }
  };

  const handleMapPress = (e: MapPressEvent) => {
    if (modalVisible) return;
    setRouteCoordinates([]); 
    setDestination(null);
    setSelectedPoint(e.nativeEvent.coordinate);
  };

  const handleFloatingButtonPress = () => {
    if (!selectedPoint) {
      Alert.alert("Attenzione", "Seleziona un punto sulla mappa per creare una segnalazione.");
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

  const clearNavigation = () => {
      setDestination(null);
      setRouteCoordinates([]);
      if (userLocation) {
        mapRef.current?.animateToRegion({
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        });
      }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        showsUserLocation={true}
        showsMyLocationButton={false}
        initialRegion={DEFAULT_REGION} 
        onPress={handleMapPress}
      >
        {routeCoordinates.length > 0 && (
            <Polyline coordinates={routeCoordinates} strokeColor="#6c5ce7" strokeWidth={5} />
        )}
        {destination && <Marker coordinate={destination} title="Arrivo" pinColor="red" />}
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{ latitude: report.latitude, longitude: report.longitude }}
            title={TYPE_LABELS[report.type]} description={report.note}
          >
            <View style={[styles.markerBg, { backgroundColor: TYPE_COLORS[report.type] }]}>
               <MaterialCommunityIcons name={TYPE_ICONS[report.type]} size={20} color="white" />
            </View>
          </Marker>
        ))}
        {selectedPoint && <Marker coordinate={selectedPoint} title="Punto Selezionato" pinColor="blue" opacity={0.7} />}
      </MapView>

      <SearchBar onSearchLocation={handleDestinationSearch} />
      
      {isRouting && (
        <View style={styles.loaderContainer}><ActivityIndicator size="large" color="#6c5ce7" /></View>
      )}
      
      {destination && (
          <TouchableOpacity style={styles.clearNavButton} onPress={clearNavigation}>
              <Ionicons name="close" size={24} color="white" />
              <Text style={styles.clearNavText}>Esci</Text>
          </TouchableOpacity>
      )}

      {/* Pulsante Posizione */}
      <TouchableOpacity 
        style={[styles.myLocationButton, !destination ? { bottom: 110 } : { bottom: 30 }]} 
        onPress={handleCenterOnUser}
      >
        <MaterialCommunityIcons name="crosshairs-gps" size={28} color="#333" />
      </TouchableOpacity>

      {!destination && <FloatingReportButton onPress={handleFloatingButtonPress} />}

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
    flex: 1
  },
  map: {
    width: "100%",
    height: "100%"
  },
  markerBg: {
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    position: "absolute",
    top: 120,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  clearNavButton: {
      position: 'absolute', bottom: 30, alignSelf: 'center', backgroundColor: '#e74c3c',
      flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20,
      borderRadius: 25, elevation: 5, gap: 5,
  },
  clearNavText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  myLocationButton: {
    position: "absolute",
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  }
});