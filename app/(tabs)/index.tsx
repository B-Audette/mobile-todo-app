import { createHomeStyles } from "@/assets/images/styles/home.styles";

import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import useBetterTheme from "@/hooks/useBetterTheme";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;

export default function Index() {
  const { betterColors } = useBetterTheme();

  const homeStyles = createHomeStyles(betterColors);

  const todos = useQuery(api.todos.getTodos); //gets all todos
  //we are using a flatlist for these because it renders better with larger lists,
  //  but for a small list like 15, we could also just do todos.map(todo => <Text>{todo.text}</Text>)
  const isLoading = todos === undefined; //convex returns undefined while loading, then returns the data once it's ready.
  if (isLoading) return <LoadingSpinner />;

  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={betterColors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => {}}
          ></TouchableOpacity>
          <LinearGradient
            colors={
              item.isCompleted
                ? betterColors.gradients.success
                : betterColors.gradients.muted
            }
          ></LinearGradient>
        </LinearGradient>
      </View>
    );
  };
  return (
    <LinearGradient
      colors={betterColors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={betterColors.statusBarStyle} />
      <SafeAreaView style={homeStyles.container}>
        <Header />
        <TodoInput />

        <FlatList
          data={todos}
          renderItem={({ item }) => <Text>{item.text}</Text>}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
