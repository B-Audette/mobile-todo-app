import { createHomeStyles } from "@/assets/images/styles/home.styles";
import useBetterTheme from "@/hooks/useBetterTheme";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, View } from "react-native";

const LoadingSpinner = () => {
  const { betterColors } = useBetterTheme();

  const homeStyles = createHomeStyles(betterColors);

  return (
    <LinearGradient
      colors={betterColors.gradients.background}
      style={homeStyles.container}
    >
      <View style={homeStyles.loadingContainer}>
        <ActivityIndicator size="large" color={betterColors.primary} />
        <Text style={homeStyles.loadingText}>Loading your list...</Text>
      </View>
    </LinearGradient>
  );
};

export default LoadingSpinner;
