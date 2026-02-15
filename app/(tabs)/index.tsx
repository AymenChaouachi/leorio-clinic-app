import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [patients, setPatients] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [appointment, setAppointment] = useState("");
  const [treatment, setTreatment] = useState("");

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
      appointment,
      treatment,
    };

    const updated = [...patients, newPatient];
    setPatients(updated);
    savePatients(updated);

    setName("");
    setAppointment("");
    setTreatment("");
  };

  const deletePatient = (id: string) => {
    const updated = patients.filter((p) => p.id !== id);
    setPatients(updated);
    savePatients(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leorio Clinic Manager</Text>

      <TextInput
        placeholder="Patient Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Appointment Date"
        style={styles.input}
        value={appointment}
        onChangeText={setAppointment}
      />

      <TextInput
        placeholder="Treatment"
        style={styles.input}
        value={treatment}
        onChangeText={setTreatment}
      />

      <Button title="Add Patient" onPress={addPatient} />

      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Appointment: {item.appointment}</Text>
            <Text>Treatment: {item.treatment}</Text>

            <TouchableOpacity
              onPress={() => deletePatient(item.id)}
              style={styles.delete}
            >
              <Text style={{ color: "white" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0f172a",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  delete: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
});
