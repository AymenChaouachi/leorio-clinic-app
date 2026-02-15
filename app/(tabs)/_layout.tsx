import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="patients" options={{ title: "Patients" }} />
      <Tabs.Screen name="appointments" options={{ title: "Appointments" }} />
    </Tabs>
  );
}
