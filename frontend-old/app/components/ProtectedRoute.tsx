import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // ✅ Import correto
import { RootStackParamList } from "../types"; // ✅ Ajuste o caminho conforme a estrutura do seu projeto

import { useAuth } from "../contexts/AuthContext";
import { View, Text, ActivityIndicator } from "react-native";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

// Tipando a navegação para garantir que 'navigate("Login")' seja válido
type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, isAuthenticated } = useAuth();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigation.navigate("Login");
    }
  }, [isAuthenticated, token, navigation]);

  if (!isAuthenticated || !token) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return <>{children}</>;
}
