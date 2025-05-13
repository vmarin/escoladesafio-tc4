import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { View, Text } from "react-native";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, isAuthenticated } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("Login"); // Redireciona para a tela de login
    }
  }, [isAuthenticated, navigation]);

  if (!isAuthenticated) {
    return (
      <View>
        <Text>Carregando...</Text> {/* Ou algum outro indicador de loading */}
      </View>
    );
  }

  return <>{children}</>;
}
