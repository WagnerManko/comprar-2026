import { FilterStatus } from "@/types/FilterStatus";
import { ItemProps } from "@/types/Item";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ITEMS_STORAGE_KEY = "@comprar:items";

async function get(): Promise<ItemProps[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error("GET_ITEMS: " + error);
  }
}

async function getByStatus(status: FilterStatus): Promise<ItemProps[]> {
  const items = await get();

  return items.filter((item) => item.status === status);
}

export const itemsStorage = { get, getByStatus };
