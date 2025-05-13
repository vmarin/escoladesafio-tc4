import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ArrowLeft, Plus, LogIn } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";

type HeaderProps = {
  title?: string;
  showBackButton?: boolean;
  backScreen?: string;
  showNewPostButton?: boolean;
  showAuthButton?: boolean;
};

export function Header({
  title,
  showBackButton = false,
  backScreen = "Home",
  showNewPostButton = false,
  showAuthButton = false,
}: HeaderProps) {
  const { token, logout } = useAuth();
  const navigation = useNavigation<any>();
  const route = useRoute();

  const headerTitle =
    title || (token ? "Escola Desafio - Professor" : "Escola Desafio");
  const shouldShowAuthButton = showAuthButton || route.name === "Home";

  return (
    <View className="bg-white shadow-md p-4 flex-row justify-between items-center">
      <Text className="text-xl font-bold text-gray-800">{headerTitle}</Text>

      <View className="flex-row items-center space-x-3">
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.navigate(backScreen)}
            className="flex-row items-center px-3 py-2 bg-gray-500 rounded-lg shadow-sm"
          >
            <ArrowLeft size={20} color="white" />
            <Text className="ml-2 text-white">Voltar</Text>
          </TouchableOpacity>
        )}

        {showNewPostButton && token && (
          <TouchableOpacity
            onPress={() => navigation.navigate("NewPost")}
            className="flex-row items-center px-3 py-2 bg-violet-500 rounded-lg shadow-sm"
          >
            <Plus size={20} color="white" />
            <Text className="ml-2 text-white">Nova Publicação</Text>
          </TouchableOpacity>
        )}

        {shouldShowAuthButton && (
          <TouchableOpacity
            onPress={() => {
              if (token) {
                logout();
                navigation.navigate("Home");
              } else {
                navigation.navigate("Login");
              }
            }}
            className={`flex-row items-center px-3 py-2 rounded-lg shadow-sm ${
              token ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <LogIn size={20} color="white" />
            <Text className="ml-2 text-white">{token ? "Sair" : "Login"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
