import useBetterTheme from "@/hooks/useBetterTheme";
import { Text, View, TouchableOpacity } from "react-native";


export default function Index() {
  const {toggleDarkMode} = useBetterTheme();
  return (
    <View
    style={{justifyContent: "center", alignItems: "center", flex: 1}}
    >
    <Text >Text shows up in the middle here. In a Column flex by default.</Text>
  <TouchableOpacity onPress={toggleDarkMode}>
    <Text>toggle the dark mode</Text>
  </TouchableOpacity>
    </View>
  );  
}




 