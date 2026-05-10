import useBetterTheme from "@/hooks/useBetterTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  const { betterColors } = useBetterTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: betterColors.primary,
        tabBarInactiveTintColor: betterColors.textMuted,
        tabBarStyle: {
          backgroundColor: betterColors.surface,
          borderTopWidth: 1,
          borderTopColor: betterColors.border,
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;