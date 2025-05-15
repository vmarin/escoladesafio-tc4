import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Import correto
import { RootStackParamList } from "../types"; // Importando os tipos

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>; // Usando NativeStackNavigationProp

export default function HomeScreen() {
  const { isAuthenticated, logout } = useAuth();
  const navigation = useNavigation<HomeScreenNavigationProp>(); // Tipando o hook de navegação

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("Login"); // Agora o TypeScript sabe que "Login" é uma tela válida
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <>
          <Text style={styles.welcomeText}>Bem-vindo à Tela Inicial!</Text>
          <Button title="Sair" onPress={logout} />
        </>
      ) : (
        <Text style={styles.text}>Você não está autenticado.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "gray",
  },
});
