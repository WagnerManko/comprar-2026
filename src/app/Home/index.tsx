import {
  Image,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Alert,
} from "react-native";

import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useEffect, useState } from "react";
import { ItemProps } from "@/types/Item";
import { itemsStorage } from "@/storage/itemsStorage";

const LISTA: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [itemDescription, setItemDescription] = useState("");
  const [items, setItems] = useState<ItemProps[]>([]);

  async function handleAdd() {
    if (!itemDescription.trim()) {
      return Alert.alert(
        "Atenção",
        "Informe a descrição do item para adicionar à lista.",
      );
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      status: FilterStatus.PENDING,
      description: itemDescription,
    };

    await itemsStorage.add(newItem);
    await getItemsByStatus();

    Alert.alert("Sucesso", `Item adicionado à lista: ${itemDescription}`);
    setFilter(FilterStatus.PENDING);
    setItemDescription("");
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id);
      await getItemsByStatus();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o item.");
      console.warn("Error removing item:", error);
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos os itens da lista?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => onClear(),
      },
    ]);
  }

  async function onClear() {
    try {
      await itemsStorage.clear();
      setItems([]);
      Alert.alert("Sucesso", "Todos os itens foram removidos da lista.");
    } catch (error) {
      console.warn("Error clearing items:", error);
      Alert.alert("Erro", "Não foi possível limpar a lista.");
    }
  }

  async function getItemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os itens.");
      console.warn("Error loading items:", error);
    }
  }

  async function handleToggleStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id);
      await getItemsByStatus();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status do item.");
      console.warn("Error toggling item status:", error);
    }
  }

  useEffect(() => {
    getItemsByStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setItemDescription}
          value={itemDescription}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {LISTA.map((status, _index) => (
            <Filter
              key={_index}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => handleToggleStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />
      </View>
    </View>
  );
}
