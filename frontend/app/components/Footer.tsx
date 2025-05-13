import { View, Text } from "react-native";

export function Footer() {
  return (
    <View className="bg-white p-4 shadow-md mt-auto items-center">
      <Text className="text-gray-600 text-center text-sm">
        © {new Date().getFullYear()} Escola Desafio. Todos os direitos
        reservados.
      </Text>
    </View>
  );
}
