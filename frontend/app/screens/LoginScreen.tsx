import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext"; // Certifique-se de ajustar o caminho do contexto

export default function LoginScreen() {
  const { login } = useAuth(); // Pegando a função de login do contexto
  const [token, setToken] = useState<string>(""); // Estado para armazenar o token

  const handleLogin = () => {
    if (!token) {
      Alert.alert("Erro", "Por favor, insira um token válido.");
      return;
    }

    // Chama a função login do contexto com o token inserido
    login(token);

    // Após o login, você pode redirecionar para outra tela (caso esteja usando navegação)
    // Exemplo usando a navegação: navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu token"
        value={token}
        onChangeText={setToken}
        keyboardType="default"
      />
      <Button title="Entrar" onPress={handleLogin} />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
  },
});
