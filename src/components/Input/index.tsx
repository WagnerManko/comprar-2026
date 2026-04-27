import { TextInput, TextInputProps, View } from "react-native"
import { styles } from "./styles"

export const Input = ({...rest}: TextInputProps) => {
    return (
        <TextInput {...rest} style={styles.container} />
    )
}