import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState<string>("");

  const addTodo = (): void => {
    if (todoText.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTodoText("");
    }
  };

  const removeTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My To-do List</Text>
      <TextInput
        value={todoText}
        onChangeText={setTodoText}
        placeholder="Enter a new to-do"
        style={styles.input}
      />
      <Button title="Add To-do" onPress={addTodo} />
      <Text style={styles.subheader}>Tasks:</Text>
      <ScrollView
        style={{ maxHeight: 400, display: "flex", gap: 8, maxWidth: "80%", marginTop: 16 }}
        contentContainerStyle={{ display: "flex", gap: 16 }}
      >
        {todos.length < 0 ? (
          <Text style={styles.noTodos}>No to-dos yet. Add one above!</Text>
        ) : (
          todos.map((todo) => (
            <View key={todo.id} style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }}>
              <View style={styles.todoListItem}>
                <Text onPress={() => toggleTodo(todo.id)}>
                  {todo.text} {todo.completed ? <Ionicons name='checkmark-done' color='green' size={16} /> : <Ionicons name='radio-button-off' color='gray' size={16} />}
                </Text>
              </View>
              <TouchableOpacity onPress={() => removeTodo(todo.id)}>
                <Ionicons name="trash-bin-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      <View>
        <Text>Total: {todos.length}</Text>
        <Text>Completed: {todos.filter((todo) => todo.completed).length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee111",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 18,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#3c749a",
    marginBottom: 16,
    marginTop: 16,
    padding: 16,
    width: "80%",
    borderRadius: 8,
  },
  noTodos: {
    fontStyle: "italic",
    color: "#666",
  },
  todoListItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    paddingInline: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
