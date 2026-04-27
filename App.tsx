import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hey there buddy!</Text>
      <Button title="Click me!" onPress={() => alert("You clicked the button!")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 16,
    flex: 1,
    backgroundColor: "#eee111",
    alignItems: "center",
    justifyContent: "center",
  },
});
