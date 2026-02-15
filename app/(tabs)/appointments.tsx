import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Appointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const data = await AsyncStorage.getItem("appointments");
    if (data) setAppointments(JSON.parse(data));
  };

  const saveAppointments = async (data: any[]) => {
    await AsyncStorage.setItem("appointments", JSON.stringify(data));
  };

  const addAppointment = () => {
    if (!patientName || !date) return;

    const newAppointment = {
      id: Date.now().toString(),
      patientName,
      date,
      status: "Scheduled",
    };

    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    saveAppointments(updated);

    setPatientName("");
    setDate("");
  };

  const markCompleted = (id: string) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: "Completed" } : a
    );

    setAppointments(updated);
    saveAppointments(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>

      <TextInput
        placeholder="Patient Name"
        style={styles.input}
        value={patientName}
        onChangeText={setPatientName}
      />

      <TextInput
        placeholder="Appointment Date"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <Button title="Schedule Appointment" onPress={addAppointment} />

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.patientName}</Text>
            <Text>{item.date}</Text>
            <Text>Status: {item.status}</Text>

            {item.status === "Scheduled" && (
              <Button
                title="Mark Completed"
                onPress={() => markCompleted(item.id)}
              />
            )}
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
  card: { padding: 10, backgroundColor: "#eee", marginTop: 5 }
});
