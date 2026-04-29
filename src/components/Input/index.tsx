import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

export const Input = ({ ...rest }: TextInputProps) => {
  return (
    <TextInput
      {...rest}
      style={styles.container}
      placeholderTextColor="#74798b"
    />
  );
};
