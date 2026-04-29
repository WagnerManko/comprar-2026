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
import { useState } from "react";
import { ItemProps } from "@/types/Item";

const LISTA: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [itemDescription, setItemDescription] = useState("");
  const [items, setItems] = useState<ItemProps[]>([]);

  function handleAdd() {
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

    setItems((prevState) => [...prevState, newItem]);
    setItemDescription("");
  }

  function clearList() {
    setItems([]);
  }

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

          <TouchableOpacity style={styles.clearButton} onPress={clearList}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => undefined}
              onRemove={() => undefined}
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
