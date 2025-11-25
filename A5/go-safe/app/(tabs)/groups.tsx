import { View, Text, StyleSheet } from "react-native";

export default function GroupsScreen() {
  return (
    <View style={styles.center}>
      <Text>Pagina Gruppi</Text>
    </View>
  );
}
const styles = StyleSheet.create({ center: { flex: 1, justifyContent: "center", alignItems: "center" } });