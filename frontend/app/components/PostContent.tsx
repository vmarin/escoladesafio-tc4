import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Edit, Trash } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

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
  editHref?: string;
};

export function PostContent({
  post,
  isAuthenticated = false,
  onDelete,
  editHref,
}: PostContentProps) {
  const navigation = useNavigation();

  return (
    <View className="max-w-4xl mx-auto p-4 md:p-6 font-sans text-gray-800 space-y-6">
      {/* Título com borda inferior */}
      <View className="pb-4 border-b border-gray-200">
        <Text className="text-2xl md:text-3xl font-bold">{post.title}</Text>
      </View>

      {/* Container principal responsivo */}
      <View className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Conteúdo do post (2/3 em desktop, full em mobile) */}
        <View className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full lg:w-2/3">
          <View className="prose max-w-none">
            <Text className="whitespace-pre-line leading-relaxed">
              {post.description}
            </Text>
          </View>
        </View>

        {/* Metadados (1/3 em desktop, full em mobile) */}
        <View className="flex flex-col gap-4 w-full lg:w-1/3">
          {/* Autor */}
          <View className="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-3">
            <Text className="text-lg font-semibold">Criado por</Text>
            <View className="mt-1 bg-gray-50 p-3 rounded">
              <Text className="text-gray-700">
                {post.author || "Autor desconhecido"}
              </Text>
            </View>
          </View>

          {/* Datas */}
          <View className="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-3">
            <View className="space-y-3">
              <Text className="text-lg font-semibold">Data de criação</Text>
              <View className="mt-1 bg-gray-50 p-3 rounded">
                <Text className="text-gray-700">
                  {new Date(post.created_at).toLocaleDateString("pt-BR")}
                </Text>
              </View>
            </View>

            {post.updated_at && (
              <View className="space-y-3">
                <Text className="text-lg font-semibold">
                  Data de modificação
                </Text>
                <View className="mt-1 bg-gray-50 p-3 rounded">
                  <Text className="text-gray-700">
                    {new Date(post.updated_at).toLocaleDateString("pt-BR")}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Ações (se autenticado) */}
      {isAuthenticated && (
        <View className="flex flex-wrap gap-3">
          {editHref && (
            <TouchableOpacity
              onPress={() => navigation.navigate(editHref)}
              className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition-colors duration-300 text-sm md:text-base shadow-sm"
            >
              <Edit className="w-4 h-4 mr-2" />
              <Text>Editar</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              onPress={onDelete}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300 text-sm md:text-base cursor-pointer shadow-sm"
            >
              <Trash className="w-4 h-4 mr-2" />
              <Text>Excluir</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
