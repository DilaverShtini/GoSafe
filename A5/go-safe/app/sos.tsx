import { View, Text, StyleSheet } from "react-native";

export default function SosScreen() {
  return (
    <View style={styles.center}>
      <Text>Pagina Sos</Text>
    </View>
  );
}
const styles = StyleSheet.create({ center: { flex: 1, justifyContent: "center", alignItems: "center" } });