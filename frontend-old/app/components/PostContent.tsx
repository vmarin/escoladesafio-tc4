import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Edit, Trash } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type PostContentProps = {
  post: {
    _id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at?: string;
    author?: string;
  };
  isAuthenticated?: boolean;
  onDelete?: () => void;
};

export function PostContent({
  post,
  isAuthenticated = false,
  onDelete,
}: PostContentProps) {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleEdit = () => {
    navigation.navigate("EditPost", { postId: post._id }); // navegação segura com params
  };

  return (
    <View className="p-4 space-y-6">
      <View className="pb-4 border-b border-gray-200">
        <Text className="text-2xl font-bold">{post.title}</Text>
      </View>

      <View className="bg-white p-4 rounded-lg shadow-md">
        <Text className="leading-relaxed">{post.description}</Text>
      </View>

      <View className="space-y-2">
        <Text>Criado por: {post.author || "Autor desconhecido"}</Text>
        <Text>
          Criado em: {new Date(post.created_at).toLocaleDateString("pt-BR")}
        </Text>
        {post.updated_at && (
          <Text>
            Atualizado em:{" "}
            {new Date(post.updated_at).toLocaleDateString("pt-BR")}
          </Text>
        )}
      </View>

      {isAuthenticated && (
        <View className="flex-row gap-4 mt-4">
          <TouchableOpacity
            onPress={handleEdit}
            className="flex-row items-center bg-indigo-500 px-4 py-2 rounded"
          >
            <Edit color="#fff" size={16} />
            <Text className="text-white ml-2">Editar</Text>
          </TouchableOpacity>

          {onDelete && (
            <TouchableOpacity
              onPress={onDelete}
              className="flex-row items-center bg-red-500 px-4 py-2 rounded"
            >
              <Trash color="#fff" size={16} />
              <Text className="text-white ml-2">Excluir</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
