import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Patients() {
  const [patients, setPatients] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    const data = await AsyncStorage.getItem("patients");
    if (data) setPatients(JSON.parse(data));
  };

  const savePatients = async (data: any[]) => {
    await AsyncStorage.setItem("patients", JSON.stringify(data));
  };

  const addPatient = () => {
    if (!name) return;

    const newPatient = {
      id: Date.now().toString(),
      name,
    };

    const updated = [...patients, newPatient];
    setPatients(updated);
    savePatients(updated);
    setName("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patients</Text>

      <TextInput
        placeholder="Patient Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Button title="Add Patient" onPress={addPatient} />

      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  card: { padding: 10, backgroundColor: "#eee", marginTop: 5 },
  name: { fontWeight: "bold" }
});
