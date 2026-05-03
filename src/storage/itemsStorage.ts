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

async function save(items: ItemProps[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("SAVE_ITEMS: " + error);
  }
}

async function add(newItem: ItemProps): Promise<ItemProps[]> {
  const items = await get();
  const updatedItems = [...items, newItem];
  await save(updatedItems);
  return updatedItems;
}

async function remove(id: string) {
  const items = await get();
  const updatedItems = items.filter((item) => item.id !== id);
  await save(updatedItems);
}

async function clear() {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
  } catch (error) {
    throw new Error("CLEAR_ITEMS: " + error);
  }
}

async function toggleStatus(id: string) {
  const items = await get();

  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          status:
            item.status === FilterStatus.PENDING
              ? FilterStatus.DONE
              : FilterStatus.PENDING,
        }
      : item,
  );

  await save(updatedItems);
}
export const itemsStorage = {
  get,
  getByStatus,
  add,
  remove,
  clear,
  toggleStatus,
};
