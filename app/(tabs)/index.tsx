import { View, Text, StyleSheet } from "react-native";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leorio Clinic Dashboard</Text>
      <Text>Use tabs below to manage patients and appointments.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 }
});
