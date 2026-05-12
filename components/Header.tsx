import { createHomeStyles } from "@/assets/images/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useBetterTheme from "@/hooks/useBetterTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  const { betterColors } = useBetterTheme();
  const homeStyles = createHomeStyles(betterColors);

  const todos = useQuery(api.todos.getTodos);
  // this filters out the compelted count of completed todos, if none, the count is 0.
  const completedCount = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const totalCount = todos ? todos.length : 0;
  // shows us the percentage completed, if there are no todos, the percentage is 0.
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient
          colors={betterColors.gradients.primary}
          style={homeStyles.iconContainer}
        >
          <Ionicons name="flash-outline" size={28} color="#ffffff" />
        </LinearGradient>
        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}> Today&apos;s Tasks 😬 </Text>
          <Text style={homeStyles.subtitle}>
            {" "}
            {completedCount} of {totalCount} tasks completed{" "}
          </Text>
          <Text style={homeStyles.subtitle}>
            {progressPercentage.toFixed(0)}% complete{" "}
          </Text>
        </View>
      </View>

      {totalCount > 0 && ( //swap totalCount > 0 to truw to see it
        <View style={homeStyles.progressContainer}>
          <View style={homeStyles.progressBarContainer}>
            <View style={homeStyles.progressBar}>
              <LinearGradient
                colors={betterColors.gradients.success}
                style={[
                  homeStyles.progressFill,
                  { width: `${progressPercentage}%` },
                ]}
              />
            </View>
            <Text style={homeStyles.progressText}>
              {Math.round(progressPercentage)}%
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
