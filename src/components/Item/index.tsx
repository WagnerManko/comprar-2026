import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";
import { Trash2 } from "lucide-react-native";

interface ItemDataProps {
  id: string;
  status: FilterStatus;
  description: string;
}

interface ItemProps {
  data: ItemDataProps;
  onStatus: () => void;
  onRemove: () => void;
}

export const Item = ({ data, onStatus, onRemove }: ItemProps) => {
  return (
    <View key={data.id} style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  );
};
